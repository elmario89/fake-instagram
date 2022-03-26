const bcrypt = require('bcryptjs');
const jwt = require('jwt');
const auth = require('../config/auth.config');
import { Request, Response } from 'express';

import UserViewModel from '../interfaces/user-register';
const User = require('./model/user');

// Register
app.post('api/auth/register', async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body as UserViewModel;

        // Validate user input
        if (!(password && email && userName)) {
            res.status(400).send('All input is required');
        }

        // check if user already exist
        // Validate if user exist in our database
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            userName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        user.token = jwt.sign(
            { user_id: user._id, email },
            auth.secret,
            {
                expiresIn: '24h',
            }
        );

        // return new user
        await res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
});

app.post('api/auth/login', async (req: Request, res: Response) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body as UserViewModel;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send('All input is required');
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (bcrypt.compare(password, user.password))) {
            // Create token
            user.token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
            );

            // user
            res.status(200).json(user);
        }
        res.status(400).send('Invalid Credentials');
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});
