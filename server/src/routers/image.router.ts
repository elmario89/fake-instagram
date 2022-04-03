const express = require('express');
const jwt = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/image-upload.middleware');
const FileController = require('../controllers/file.controller');

import { Application, Response, Request } from 'express';
import { iApp } from '../interfaces/core.interface';
import { iUserRequest } from '../interfaces/user-request.interface';

module.exports = (app: Application) => {
    const router = express.Router();
    const fileController = new FileController(app);

    router.post('/image/upload', [jwt, upload.single('file')], fileController.uploadFile);
    router.get('/image/:filename', jwt, fileController.getFile);
    router.delete('/image/:filename', jwt, fileController.deleteFile);

    return router;
};