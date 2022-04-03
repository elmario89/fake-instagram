const auth = require('../middlewares/auth.middleware');
const jwt = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/image-upload.middleware');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

import { Application, Response } from 'express';
import { iApp } from '../interfaces/core.interface';
import { iUserRequest } from '../interfaces/user-request.interface';

interface iOpenDownloadStream {
    openDownloadStream: (id: string) => NodeJS.ReadableStream;
}

class AuthController {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    uploadFile = async (req: iUserRequest, res: Response) => {
        try {
            if (req.file === undefined) {
                return res.send('You must select a file.');
            }

            const imgUrl = `http://localhost:3001/api/image/${req.file.filename}`;
            return res.send(imgUrl);
        }
        catch (err) {
            console.log(err);
        }
    }

    getFile = async (req: iUserRequest, res: Response) => {
        try {
            const file = await (this.app as iApp).gfs.files.findOne({ filename: req.params.filename });
            if (!file) {
                return res.status(400).send('File not found');
            }
            const readStream = (this.app as iApp).gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        } catch (error) {
            console.log(error);
            res.status(500).send('Oops somethign went wrong');
        }
    }

    deleteFile = async (req: iUserRequest, res: Response) => {
        try {
            await (this.app as iApp).gfs.files.deleteOne({ filename: req.params.filename });
            res.send('success');
        } catch (error) {
            console.log(error);
            res.send('An error occured.');
        }
    }
}

module.exports = AuthController;