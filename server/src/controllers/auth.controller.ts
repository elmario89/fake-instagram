const auth = require('../middlewares/auth.middleware');
const jwt = require('../middlewares/jwt.middleware');
import { Application, Response } from 'express';
import { iUserRequest } from '../interfaces/user-request.interface';

module.exports = function(app: Application) {
    // Register
    app.post('/api/auth/register', auth.registration, async (req: iUserRequest, res: Response) => {
        try {
            // return new user
            await res.status(200).json(req.user);
        }
        catch (err) {
            console.log(err);
        }
    });

    app.post('/api/auth/login', auth.login, async (req: iUserRequest, res: Response) => {
        try {
            await res.status(200).json(req.user);
        } catch (err) {
            console.log(err);
        }
    });
}