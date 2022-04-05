const FileService = require('../services/file.service');

import { Application, Response, Request } from 'express';
import { iApp } from '../interfaces/core.interface';

interface iOpenDownloadStream {
    openDownloadStream: (id: string) => NodeJS.ReadableStream;
}

class FileController {
    private fileService: typeof FileService;

    constructor(private readonly app: Application) {
        this.fileService = new FileService(this.app);
    }

    uploadFile = async (req: Request, res: Response) => {
        try {
            const imgUrl = await this.fileService.uploadFile(req.file)
            return res.status(200).send(imgUrl);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send((err as Error).message);
        }
    }

    getFile = async (req: Request, res: Response) => {
        try {
            const readStream = await this.fileService.getFile(req.params.filename);
            readStream.pipe(res);
        } catch (err) {
            console.log(err);
            return res.status(500).send((err as Error).message);
        }
    }

    deleteFile = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.fileService.deleteFile(id);
            res.status(200).send(id);
        } catch (err) {
            console.log(err);
            return res.status(500).send((err as Error).message);
        }
    }
}

module.exports = FileController;