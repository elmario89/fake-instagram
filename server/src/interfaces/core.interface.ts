const Grid = require('gridfs-stream');

import { Express } from 'express';

export interface iOpenDownloadStream {
    openDownloadStream: (id: string) => NodeJS.ReadableStream;
}

export interface iApp extends Express {
    gfs: typeof Grid;
    gridfsBucket: iOpenDownloadStream;
}

