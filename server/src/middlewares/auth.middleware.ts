const jwt = require("jsonwebtoken");
import { Request, Response } from 'express';

const verifyToken = (req: Request, res: Response, next: () => void) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // req.user = decoded;
        debugger;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;