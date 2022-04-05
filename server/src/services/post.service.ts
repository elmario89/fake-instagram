const users = require('../models/user.model');
const postsDb = require('../models/post.model');
const mongoose = require('mongoose');

import { iPost } from "../models/post.model";
import { Application } from 'express';
import { iApp } from "../interfaces/core.interface";
const ObjectId = mongoose.Types.ObjectId

interface iUserParams {
    userName: string;
    postId: string;
}

interface iUserQuery {
    page: string;
    count: string;
}

class PostService {
     add = async (post: iPost, file: Express.Multer.File) => {
        if (file === undefined) {
            return new Error('You must select a file.');
        }

        const { userId, userName, title, description } = post;

        const user = await users.findOne({$and:[{ userName }, { _id: userId }] })
        if (!user) {
            return new Error('User does not exist.');
        }

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

            return {
                post: newPost,
                userName: updatedUser.userName
            };
        } catch (err) {
            return new Error(err as string);
        }
    };

     update = async (params: iUserParams, post: iPost) => {
        const { userName, postId } = params;
        const { title, description } = post;

        const user = await users.findOne({ userName });
        if (!user) {
            return new Error('User does not exist.');
        }

        if (user.posts.indexOf(postId) < 0) {
            return new Error('User does not exist.');
        }

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
            return new Error('User does not exist.');
        }
    }

     get = async (params: iUserParams) => {
        const { userName, postId } = params;

        const user = await users.findOne({ userName });
        if (!user) {
            return new Error('User does not exist.');
        }

        if (user.posts.indexOf(postId) < 0) {
            return new Error('Post does not exist.');
        }

        try {
            const post = await postsDb.findById(postId);

            return {
                userName: user.userName,
                post
            };
        } catch (err) {
            return new Error(err as string);
        }
    };

     getAll = async (params: iUserParams, query: iUserQuery) => {
        const { userName } = params;
        const { count, page } = query;

        const user = await users.findOne({ userName });
        if (!user) {
            return new Error('User does not exist.');
        }

        try {
            const posts = await postsDb.find()
                .where('_id')
                .skip(Number(count) * Number(page))
                .limit(count)
                .in(user.posts)
                .exec();

            return posts;
        } catch (err) {
            return new Error(err as string);
        }
    };

     delete = async (params: iUserParams, app: Application) => {
        const { userName, postId } = params;

        const user = await users.findOne({ userName });
        if (!user) {
            return new Error('User does not exist.');
        }

        if (user.posts.indexOf(postId) < 0) {
            return new Error('Post does not exist.');
        }

        try {
            //delete file from bucket
            const post = await postsDb.findById(postId);
            await (app as iApp).gfs.files.deleteOne({ _id: new ObjectId(post.imageId) });

            //delete posts
            await postsDb.findByIdAndDelete(postId);

            //delete post id from user
            const { posts } = user;
            const updatedUser = await users.findOneAndUpdate(
                { userName },
                {
                    posts: posts.filter((id: string) => id !== postId)
                },
                { new: true }
            );

            return updatedUser;
        } catch(err) {
            return new Error(err as string);
        }
    };
}

module.exports = new PostService();