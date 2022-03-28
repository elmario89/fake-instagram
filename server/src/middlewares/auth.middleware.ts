import getUser from "../interfaces/get-user.interface";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');

import { Request, Response } from 'express';
import iGetUserViewModel from "../interfaces/get-user-view-model.interface";
import UserViewModel from '../interfaces/add-user.interface';

interface iUserRequest extends Request {
    user: iGetUserViewModel
}

module.exports.login = async (req: iUserRequest, res: Response, next: () => void) => {
    // Get user input
    const { email, password } = req.body as getUser;

    // Validate user input
    if (!(email && password)) {
        res.status(400).send('All input is required');
    }

    // Validate if user exist in our database
    const user = await users.findOne({ email });

    if (!user) {
        return res.status(400).send('User not found');
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
                const { userName, _id, creationDate, token } = user;
                req.user = {
                    _id: _id,
                    userName: userName,
                    creationDate,
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

module.exports.registration = async (req: iUserRequest, res: Response, next: () => void) => {
    const { userName, email, password, posts } = req.body as UserViewModel;

    // Validate user input
    if (!(password && email && userName)) {
        res.status(400).send('All input is required');
    }

    // check if user already exist
    // Validate if user exist in our database
    const userExists = await users.findOne({$or:[{email}, {userName}] });
    if (userExists) {
        return res.status(409).send('User Already Exist. Please Login');
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await users.create({
        userName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        creationDate: new Date(),
    });

    // Create token
    user.token = jwt.sign(
        { _id: user._id, email },
        process.env.JWT_KEY,
        {
            expiresIn: '24h',
        }
    );

    req.user = user;

    return next();
};