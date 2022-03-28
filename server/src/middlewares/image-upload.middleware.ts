const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
import { MONGO_URI } from '../config/db.config';

interface iFile {
    mimetype: string;
    originalname: string;
}

const storage = new GridFsStorage({
    url: MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req: Request, file: iFile) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg'];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });