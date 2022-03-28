const auth = require('../middlewares/auth.middleware');
const jwt = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/image-upload.middleware');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

import { Application, Response } from 'express';
import { iUserRequest } from '../interfaces/user-request.interface';

interface iOpenDownloadStream {
    openDownloadStream: (id: string) => NodeJS.ReadableStream;
}

module.exports = function(app: Application) {
    let gfs: typeof Grid;
    let gridfsBucket: iOpenDownloadStream;

    const conn = mongoose.connection;

    conn.once('open', () => {
        //Init Stream
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'photos'
        })
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('photos');
    })

    app.post('/api/image/upload', [jwt, upload.single('file')], async (req: iUserRequest, res: Response) => {
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
    });

    app.get('/api/image/:filename', jwt, async (req, res) => {
        try {
            const file = await gfs.files.findOne({ filename: req.params.filename });

            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        } catch (error) {
            console.log(error);
            res.send('not found');
        }
    });

    app.delete('/api/image/:filename', jwt, async (req, res) => {
        try {
            await gfs.files.deleteOne({ filename: req.params.filename });
            res.send('success');
        } catch (error) {
            console.log(error);
            res.send('An error occured.');
        }
    });
}