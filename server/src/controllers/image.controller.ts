const auth = require('../middlewares/auth.middleware');
const jwt = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/image-upload.middleware');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

import { Application, Response } from 'express';
import { iApp } from '../app';
import { iUserRequest } from '../interfaces/user-request.interface';

interface iOpenDownloadStream {
    openDownloadStream: (id: string) => NodeJS.ReadableStream;
}

module.exports = function(app: Application) {
    // let gfs: typeof Grid;
    // let gridfsBucket: iOpenDownloadStream;
    //
    // const conn = mongoose.connection;
    //
    // conn.once('open', () => {
    //     //Init Stream
    //     console.log('init gfs again')
    //     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    //         bucketName: 'photos'
    //     })
    //     gfs = Grid(conn.db, mongoose.mongo);
    //     gfs.collection('photos');
    // })

    app.get('/api/image/:filename', jwt, async (req, res) => {
        try {
            const file = await (app as iApp).gfs.files.findOne({ filename: req.params.filename });
            const readStream = (app as iApp).gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        } catch (error) {
            console.log(error);
            res.send('not found');
        }
    });

    app.delete('/api/image/:filename', jwt, async (req, res) => {
        try {
            await (app as iApp).gfs.files.deleteOne({ filename: req.params.filename });
            res.send('success');
        } catch (error) {
            console.log(error);
            res.send('An error occured.');
        }
    });
}