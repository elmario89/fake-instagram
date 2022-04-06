const jwt = require("jsonwebtoken");
const users = require('../models/user.model');
const bcrypt = require('bcryptjs');

import { Response } from 'express';
import { iUserRequest } from '../interfaces/user-request.interface';

module.exports = async (req: iUserRequest, res: Response, next: () => void) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    const { userId } = req.body;

    if (!userId) {
        return res.status(403).send("An userId is required for using this method");
    }

    try {
        const user = await users.findById(userId);
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY);
        const { password, _id } = decodedToken;

        if (_id !== userId || user.password !== password) {
            return res.status(403).send('You are not allowed to use this method');
        }

        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};