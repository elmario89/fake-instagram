const users = require('../models/user.model');
const postsDb = require('../models/post.model');
const mongoose = require('mongoose');

import { iPost } from "../models/post.model";
import { Application } from 'express';
import { iApp } from "../interfaces/core.interface";
const ObjectId = mongoose.Types.ObjectId

interface iUserParams {
    userId: string;
    postId: string;
    userName?: string;
}

interface iUserQuery {
    page: string;
    count: string;
}

class PostService {
    private checkIfUserExists = async (userId?: string, postId?: string, userName?: string) => {
        let user;

        if (userName) {
            user = await users.findOne({ userName })
            if (!user) {
                throw new Error('User does not exist.');
            }
        }

        if (userId) {
            user = await users.findById(userId);
            if (!user) {
                throw new Error('User does not exist.');
            }
        }

        if (postId && user.posts.indexOf(postId) < 0) {
            throw new Error('Post does not exist.');
        }

        return user;
    }

     add = async (post: iPost, file: Express.Multer.File) => {
        if (file === undefined) {
            throw new Error('You must select a file.');
        }

        const { userId, title, description } = post;

        const user = await this.checkIfUserExists(userId);

        try {
            const imageUrl = `http://localhost:3001/api/image/${file.filename}`;

            const newPost = await postsDb.create({
                title,
                description,
                creationDate: new Date(),
                imageUrl,
                imageId: file.id
            });

            const { posts } = user;
            const updatedUser = await users.findOneAndUpdate(
                { _id: userId },
                {
                    posts: [
                        ...posts,
                        newPost.id,
                    ]
                },
                { new: true }
            );

            return newPost;
        } catch (err) {
            throw new Error(err as string);
        }
    };

     update = async (params: iUserParams, post: iPost) => {
        const { userId, postId, userName } = params;
        const { title, description } = post;

        const user = await this.checkIfUserExists(userId, postId, userName);

        try {
            const updatedPost = await postsDb.findByIdAndUpdate(
                postId,
                {
                    title,
                    description
                },
                { new: true }
            )

            return {
                userName: user.userName,
                post: updatedPost
            };
        } catch(err) {
            throw new Error('User does not exist.');
        }
    }

     get = async (params: iUserParams) => {
        const { postId, userName } = params;

        const user = await this.checkIfUserExists(undefined, postId, userName);

        try {
            const post = await postsDb.findById(postId);

            return {
                userName: user.userName,
                post
            };
        } catch (err) {
            throw new Error(err as string);
        }
    };

     getAll = async (params: iUserParams, query: iUserQuery) => {
        const { userName } = params;
        const { count, page } = query;

        const user = await this.checkIfUserExists(undefined, undefined, userName);

        try {
            const posts = await postsDb.find()
                .where('_id')
                .skip(Number(count) * Number(page))
                .limit(count)
                .in(user.posts)
                .exec();

            return posts;
        } catch (err) {
            throw new Error(err as string);
        }
    };

     delete = async (params: iUserParams, app: Application) => {
        const { userId, postId, userName } = params;

        const user = await this.checkIfUserExists(userId, postId, userName);
        console.log(userId);

        // try {
        //     //delete file from bucket
        //     const post = await postsDb.findById(postId);
        //     await (app as iApp).gfs.files.deleteOne({ _id: new ObjectId(post.imageId) });
        //
        //     //delete posts
        //     await postsDb.findByIdAndDelete(postId);
        //
        //     //delete post id from user
        //     const { posts } = user;
        //     const updatedUser = await users.findOneAndUpdate(
        //         { _id: userId },
        //         {
        //             posts: posts.filter((id: string) => id !== postId)
        //         },
        //         { new: true }
        //     );
        //
        //     console.log(updatedUser);
        //     debugger;
        //     return updatedUser;
        // } catch(err) {
        //     throw new Error(err as string);
        // }
    };
}

module.exports = new PostService();