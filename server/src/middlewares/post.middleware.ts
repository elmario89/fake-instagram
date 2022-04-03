const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');
const postsDb = require('../models/post.model');
const mongoose = require('mongoose');

import { Request, Response } from 'express';
import iGetUserViewModel from '../interfaces/get-user-view-model.interface';
import { iUserRequest } from '../interfaces/user-request.interface';
import { iPost } from '../models/post.model';
import { iPostRequest } from '../interfaces/post-request.interface';
import { iPostsRequest } from '../interfaces/posts-requests.interface';
import { iUser } from '../models/user.model';
import { iApp } from '../interfaces/core.interface';
import { Express } from 'express';
import getUser from '../interfaces/get-user.interface';
const ObjectId = mongoose.Types.ObjectId

module.exports.add = async (req: iUserRequest, res: Response, next: () => void) => {
    const { userId, userName, title, description } = req.body;

    if (req.file === undefined) {
        return res.send('You must select a file.');
    }

    const user = await users.findOne({$and:[{userName}, {_id: userId}] })
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    const imageUrl = `http://localhost:3001/api/image/${req.file.filename}`;

    const newPost = await postsDb.create({
        title: 'test',
        description: 'hello from planet earth',
        creationDate: new Date(),
        imageUrl,
        imageId: req.file.id
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

    req.user = updatedUser;

    next();
};

module.exports.get = async (req: iPostRequest, res: Response, next: () => void) => {
    const { userName, postId} = req.params;

    const user = await users.findOne({ userName });
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    if (user.posts.indexOf(postId) < 0) {
        return res.status(404).send('Post does not exist.');
    }

    const post = await postsDb.findById(postId);

    req.response = {
        userName: user.userName,
        post
    };
    next();
};

module.exports.getAll = async (req: iPostsRequest, res: Response, next: () => void) => {
    const { userName } = req.params;
    const { count, page } = req.query;

    const user = await users.findOne({ userName });
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    const posts = await postsDb.find()
        .where('_id')
        .skip(Number(count) * Number(page))
        .limit(count)
        .in(user.posts)
        .exec();

    req.posts = posts;

    next();
};

module.exports.delete = (app: Express) => async (req: iUserRequest, res: Response, next: () => void) => {
    const { userName, postId } = req.params;

    const user = await users.findOne({ userName });
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    if (user.posts.indexOf(postId) < 0) {
        return res.status(404).send('Post does not exist.');
    }

    //delete file from bucket
    const post = await postsDb.findById(postId);
    await (app as iApp).gfs.files.deleteOne({ _id: new ObjectId(post.imageId) });

    //delete posts
    const updatedPosts = await postsDb.deleteOne({_id: postId});

    //delete post id from user
    const { posts } = user;
    const updatedUser = await users.findOneAndUpdate(
        { userName },
        {
            posts: posts.filter((id: string) => id !== postId)
        },
        { new: true }
    );

    req.user = updatedUser;
    next();
};