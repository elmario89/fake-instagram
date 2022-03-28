import getUser from '../interfaces/get-user.interface';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');

import { Request, Response } from 'express';
import iGetUserViewModel from '../interfaces/get-user-view-model.interface';
import iAddPost from '../interfaces/add-post.interface';
import { iUserRequest } from '../interfaces/user-request.interface';
import { iPost } from '../models/post.model';
import { iPostRequest } from '../interfaces/post-request.interface';
import { iPostsRequest } from '../interfaces/posts-requests.interface';

module.exports.add = async (req: iUserRequest, res: Response, next: () => void) => {
    const { userName, userId, post } = req.body as iAddPost;

    const user = await users.findOne({$and:[{userName}, {_id: userId}] })
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    const { posts } = user;
    const updatedUser = await users.findOneAndUpdate(
        { _id: userId },
        {
            posts: [
                ...posts,
                {
                    ...post,
                    creationDate: new Date()
                }
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

    const post = await user.posts.id(postId);
    if (!post) {
        return res.status(404).send('Post does not exist.');
    }

    req.post = post;
    next();
};

module.exports.getAll = async (req: iPostsRequest, res: Response, next: () => void) => {
    const { userName } = req.params;

    const user = await users.findOne({ userName });
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    req.posts = user.posts;
    next();
};

module.exports.delete = async (req: iUserRequest, res: Response, next: () => void) => {
    const { userName, postId} = req.params;

    const user = await users.findOne({ userName });
    if (!user) {
        return res.status(404).send('User does not exist.');
    }

    const post = await user.posts.id(postId);
    if (!post) {
        return res.status(404).send('Post does not exist.');
    }

    try {
        await users.updateOne({ userName }, { $pull: { posts: { _id: postId }}});

        const updatesUser = await users.findOne({ userName });
        req.user = updatesUser;

        next();
    } catch(err) {
        console.log(err);
        return res.status(500).send('Something went wrong');
    }
};