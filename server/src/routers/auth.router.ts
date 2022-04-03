const express = require('express');
const auth = require('../middlewares/auth.middleware');
const AuthController = require('../controllers/auth.controller');

module.exports = () => {
    const router = express.Router();

    router.post('/auth/register', auth.registration, AuthController.register);
    router.post('/auth/login', auth.login, AuthController.login);

    return router;
};