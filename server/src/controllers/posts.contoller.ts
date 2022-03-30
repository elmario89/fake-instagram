const jwt = require('../middlewares/jwt.middleware');
const users = require('../models/user.model');
const post = require('../middlewares/post.middleware');
const upload = require('../middlewares/image-upload.middleware');

import { Application, Response, Request } from 'express';
import { iPostRequest } from '../interfaces/post-request.interface';
import { iPostsRequest } from '../interfaces/posts-requests.interface';
import { iUserRequest } from '../interfaces/user-request.interface';
import { iPost } from '../models/post.model';
import { iUser } from '../models/user.model';

module.exports = function(app: Application) {
    app.post('/api/posts/add', [jwt, upload.single('file'), post.add], async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.user);
        }
        catch (err) {
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

    app.get('/api/posts/:userName/', [jwt, post.getAll], async (req: iPostsRequest, res: Response) => {
        try {
            return res.status(200).json(req.posts);
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