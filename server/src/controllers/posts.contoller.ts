const jwt = require('../middlewares/jwt.middleware');
const users = require('../models/user.model');
const post = require('../middlewares/post.middleware');

import { Application, Response, Request } from 'express';
import iAddPost from "../interfaces/add-post.interface";
import { iPostRequest } from '../interfaces/post-request.interface';
import { iUserRequest } from '../interfaces/user-request.interface';
import { iPost } from '../models/post.model';
import { iUser } from '../models/user.model';

module.exports = function(app: Application) {
    app.post('/api/posts/add', [jwt, post.add], async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.body);
        } catch (err) {
            console.log(err);
        }
    });

    app.get('/api/posts/:userName/:postId', [jwt, post.get], async (req: iPostRequest, res: Response) => {
        try {
            return res.status(200).json(req.post);
        } catch (err) {
            console.log(err);
        }
    });

    app.delete('/api/posts/:userName/:postId', [jwt, post.delete], async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.user);
        } catch (err) {
            console.log(err);
        }
    });
}