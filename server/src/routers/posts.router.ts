const express = require('express');
const jwt = require('../middlewares/jwt.middleware');
const jwtAccess = require('../middlewares/jwt-access.middleware');
const upload = require('../middlewares/image-upload.middleware');
const PostController = require('../controllers/posts.contoller');

import { Application } from 'express';

module.exports = (app: Application) => {
    const router = express.Router();
    const controller = new PostController(app);

    router.post('/posts/add', [jwt, upload.single('file')], controller.addPost);
    router.put('/posts/:userName/:postId', [jwt, jwtAccess], controller.updatePost);
    router.get('/posts/:userName/:postId', jwt, controller.getPost);
    router.get('/posts/:userName/', jwt, controller.getPosts);
    router.delete('/posts/:userName/:postId', jwt, controller.deletePost);

    return router;
};