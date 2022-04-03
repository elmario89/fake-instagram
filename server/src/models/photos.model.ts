const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

import { iApp, iOpenDownloadStream } from "../interfaces/core.interface";
import { Express } from 'express';

let gfs: typeof Grid;
let gridfsBucket: iOpenDownloadStream;

module.exports = (app: Express) => {
    const conn = mongoose.connection;
    conn.once('open', () => {
        //Init Stream
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'photos'
        })
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('photos');
        (app as iApp).gfs = gfs;
        (app as iApp).gridfsBucket = gridfsBucket;
    })
}