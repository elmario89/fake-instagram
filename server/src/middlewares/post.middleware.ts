import getUser from "../interfaces/get-user.interface";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');

import { Request, Response } from 'express';
import iGetUserViewModel from "../interfaces/get-user-view-model.interface";
import iAddPost from "../interfaces/add-post.interface";
import { iUserRequest } from "../interfaces/user-request.interface";

module.exports.add = async (req: iUserRequest, res: Response, next: () => void) => {
    const { userId, post } = req.body as iAddPost;

    const { posts } = await users.findOne({ _id: userId });
    const user = await users.findOneAndUpdate(
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

    req.user = user;

    next();
};

module.exports.get = async (req: iUserRequest, res: Response, next: () => void) => {
    console.log('get');
    console.log(req.params.userId);
    console.log(req.params.postId);
    next();
};