import {iUserRequest} from "../middlewares/verifyRegister.middleware";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyRegister = require('../middlewares/verifyRegister.middleware');
import { Application, Request, Response } from 'express';
import UserViewModel from '../interfaces/user-register.interface';

module.exports = function(app: Application) {
    // Register
    app.post('/api/auth/register', verifyRegister, async (req: iUserRequest, res: Response) => {
        try {
            // return new user
            await res.status(201).json(req.user);
        }
        catch (err) {
            console.log(err);
        }
    });

    app.post('/api/auth/login', async (req: Request, res: Response) => {
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
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h',
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
}