const jwt = require('../middlewares/jwt.middleware');
const users = require('../models/user.model');

import { Application, Response, Request } from 'express';
import iAddPost from "../interfaces/add-post.interface";

module.exports = function(app: Application) {
    app.post('/api/posts/add', jwt, async (req: Request, res: Response) => {
        try {
            const { userId, post } = req.body as iAddPost;
            const user = await users.findOne({ _id: userId });
            debugger;
            await res.status(200).json(req);
        } catch (err) {
            console.log(err);
        }
    });
}