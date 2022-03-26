const registration = require('../middlewares/registration.middleware');
const login = require('../middlewares/login.middleware');
const jwt = require('../middlewares/jwt.middleware');
import { Application, Response } from 'express';
import {iUserRequest} from "../middlewares/registration.middleware";

module.exports = function(app: Application) {
    // Register
    app.post('/api/auth/register', registration, async (req: iUserRequest, res: Response) => {
        try {
            // return new user
            await res.status(200).json(req.user);
        }
        catch (err) {
            console.log(err);
        }
    });

    app.get('/welcome', jwt, async (req: iUserRequest, res: Response) => {
        try {
            // return new user
            await res.status(200).json(req.user);
        }
        catch (err) {
            console.log(err);
        }
    });

    app.post('/api/auth/login', login, async (req: iUserRequest, res: Response) => {
        try {
            await res.status(200).json(req.user);
        } catch (err) {
            console.log(err);
        }
    });
}