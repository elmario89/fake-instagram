import config from '../config/auth.config';
import db from '../models';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {Request, Response} from "express";

const User = db.user;

export const signIn = (req: Request, res: Response) => {
    console.log(req.body);
    debugger;
    User.findOne({
        userName: req.body.userName
    })
        .populate('posts')
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            const token = Jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            const result = {
                id: user._id,
                userName: user.userName,
                email: user.email,
                posts: user.posts,
                accessToken: token
            };
            console.log(result);
            return result;
        })
}