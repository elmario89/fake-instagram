const express = require('express');
const AuthController = require('../controllers/auth.controller');

module.exports = () => {
    const router = express.Router();
    const controller = new AuthController();

    router.post('/auth/register', controller.register);
    router.post('/auth/login', controller.login);

    return router;
};