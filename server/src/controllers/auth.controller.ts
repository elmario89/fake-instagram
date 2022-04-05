const AuthService = require('../services/auth.service');

import { Response } from 'express';
import { iUserRequest } from '../interfaces/user-request.interface';

class AuthController {
    register = async (req: iUserRequest, res: Response) => {
        try {
            const user = await AuthService.registration(req.body);
            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send((err as Error).message);
        }
    }

    login = async (req: iUserRequest, res: Response) => {
        try {
            const user = await AuthService.login(req.body);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).send((err as Error).message);
        }
    }
}

module.exports = AuthController;