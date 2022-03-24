import jwt from 'jsonwebtoken';
import config from '../config/auth.config';
import db from '../models';
import {NextFunction, Request, Response} from "express";

const User = db.user;

interface iVerifyRequest extends Request{
    userId: string;
}

const verifyToken  = (req: iVerifyRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, payload) => {
        if (err) next()
        else if (payload) {
            console.log(payload);
            console.log(User);
            // req.userId = payload;
            next();
        }
    })
};

export default verifyToken;