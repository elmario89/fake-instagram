const express = require('express');
const jwt = require('../middlewares/jwt.middleware');
const post = require('../middlewares/post.middleware');
const upload = require('../middlewares/image-upload.middleware');
const PostController = require('../controllers/posts.contoller');

import { Application } from 'express';

module.exports = (app: Application) => {
    const router = express.Router();

    router.post('/posts/add', [jwt, upload.single('file'), post.add], PostController.addPost);
    router.get('/posts/:userName/:postId', [jwt, post.get], PostController.getPost);
    router.get('/posts/:userName/', [jwt, post.getAll], PostController.getPosts);
    router.delete('/posts/:userName/:postId', [jwt, post.delete(app)], PostController.deletePost);

    return router;
};