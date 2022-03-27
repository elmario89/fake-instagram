import {iUserRequest} from '../interfaces/user-request.interface';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');

import UserViewModel from '../interfaces/add-user.interface';
import {  Response } from 'express';

module.exports = async (req: iUserRequest, res: Response, next: () => void) => {
    const { userName, email, password, posts } = req.body as UserViewModel;

    // Validate user input
    if (!(password && email && userName)) {
        res.status(400).send('All input is required');
    }

    // check if user already exist
    // Validate if user exist in our database
    const userExists = await users.findOne({ email });
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
        posts,
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