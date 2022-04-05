const mongoose = require('mongoose');

import { Application } from 'express';
import { iApp } from '../interfaces/core.interface';

const ObjectId = mongoose.Types.ObjectId

class FileService {
    constructor(private readonly app: Application) { }

    uploadFile = async (file: Express.Multer.File) => {
        try {
            if (file === undefined) {
                throw new Error('You must select a file.');
            }

            const imgUrl = `http://localhost:3001/api/image/${file.filename}`;
            return imgUrl;
        }
        catch (err) {
            console.log(err);
            throw new Error(err as string);
        }
    }

    getFile = async (fileName: string) => {
        try {
            const file = await (this.app as iApp).gfs.files.findOne({ filename: fileName });
            if (!file) {
                throw new Error('File not found');
            }

            const stream = await (this.app as iApp).gridfsBucket.openDownloadStream(file._id);
            return stream;
        } catch (err) {
            console.log(err);
            throw new Error(err as string);
        }
    }

    deleteFile = async (id: string) => {
        try {
            const fileExists = await (this.app as iApp).gfs.files.findOne({ _id: ObjectId(id)});
            if (!fileExists) {
                throw new Error('File doesn\'t exist');
            }

            await (this.app as iApp).gfs.files.deleteOne({ _id: ObjectId(id) });
            return id;
        } catch (err) {
            console.log(err);
            throw new Error(err as string);
        }
    }
}

module.exports = FileService;