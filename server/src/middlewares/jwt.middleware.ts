const jwt = require("jsonwebtoken");

import { Response } from 'express';
import { iUserRequest } from '../interfaces/user-request.interface';

module.exports = (req: iUserRequest, res: Response, next: () => void) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_KEY)
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};