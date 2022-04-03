const auth = require('../middlewares/auth.middleware');
const jwt = require('../middlewares/jwt.middleware');
import { Application, Response } from 'express';
import { iUserRequest } from '../interfaces/user-request.interface';

class AuthController {
    register = async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.user);
        }
        catch (err) {
            console.log(err);
        }
    }

    login = async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.user);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthController();