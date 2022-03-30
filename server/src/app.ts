const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

import express, { Express } from 'express';

require('./config/db.config').connect();

const corsOptions = {
    origin: "*"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface iOpenDownloadStream {
    openDownloadStream: (id: string) => NodeJS.ReadableStream;
}

export interface iApp extends Express {
    gfs: typeof Grid;
    gridfsBucket: iOpenDownloadStream;
}

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
    (app as iApp).gfs = gfs;
    (app as iApp).gridfsBucket = gridfsBucket;
})

//routes
require('./controllers/auth.controller')(app);
require('./controllers/posts.contoller')(app);
require('./controllers/image.controller')(app);

module.exports = app;