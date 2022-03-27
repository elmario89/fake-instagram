import getUser from "../interfaces/get-user.interface";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');

import { Request, Response } from 'express';
import iGetUserViewModel from "../interfaces/get-user-view-model.interface";

interface iUserRequest extends Request {
    user: iGetUserViewModel
}

module.exports = async (req: iUserRequest, res: Response, next: () => void) => {
    // Get user input
    const { email, password } = req.body as getUser;

    // Validate user input
    if (!(email && password)) {
        res.status(400).send('All input is required');
    }

    // Validate if user exist in our database
    const user = await users.findOne({ email });

    if (!user) {
        res.status(400).send('User not found');
    }

    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    bcrypt.compare(password, user.password)
        .then((isCorrect: boolean) => {
            if (user && isCorrect) {
                // Create token
                user.token = jwt.sign(
                    { _id: user._id, email },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h',
                    }
                );

                // user
                const { userName, posts, _id, creationDate, token } = user;
                req.user = {
                    _id: _id,
                    userName: userName,
                    creationDate,
                    posts,
                    token,
                };
                return next();
            }
            res.status(400).send('Invalid Credentials');
        })
        .catch((err: Error) => {
            res.status(500).send('Password decryption went wrong');
        })
};