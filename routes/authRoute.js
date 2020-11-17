'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup',
    [
      body('username', 'Minimum of 3 characters').isLength({min: 3}).escape(),
      body('email', 'Email is not valid').isEmail(),
      body('password',
          `Password must match following requirements: 1 uppercase letter, minimum of 8 characters`).
          matches('(?=.*[A-Z]).{8,}'),
    ],
    authController.signup,
    authController.login,
);

module.exports = router;