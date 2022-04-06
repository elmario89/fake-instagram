const users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import UserViewModel from '../interfaces/add-user.interface';
import getUserViewModel from "../interfaces/get-user.interface";

class AuthService {
    registration = async (user: UserViewModel) => {
        const { userName, email, password, posts } = user;

        const userExists = await users.findOne({$or:[{email}, {userName}] });
        if (userExists) {
            throw new Error('User Already Exist. Please Login');
        }

        try {
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
                { _id: user._id, email, password: encryptedPassword },
                process.env.JWT_KEY,
                {
                    expiresIn: '24h',
                }
            );

            return user;
        } catch (err) {
            throw new Error(err as string);
        }
    };

    login = async (getUser: getUserViewModel) => {
        const { email, password } = getUser;

        const user = await users.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        try {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (user && isPasswordCorrect) {
                user.token = jwt.sign(
                    { _id: user._id, email, password: user.password },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h',
                    }
                );

                const { userName, _id, creationDate, token } = user;

                return {
                    _id: _id,
                    userName: userName,
                    creationDate,
                    token
                };
            } else {
                throw new Error('Invalid Credentials');
            }
        } catch (err) {
            throw new Error(err as string);
        }
    };
}

module.exports = new AuthService();