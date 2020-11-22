'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/authController');

router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/register').post([
      body('username', 'Minimum of 3 characters').isLength({min: 3}).escape(),
      body('email', 'Email is not valid').isEmail(),
      body('password',
          `Password must match following requirements: 1 uppercase letter, minimum of 8 characters`).
          matches('(?=.*[A-Z]).{8,}'),
    ],
    authController.register,
    authController.login,
);

module.exports = router;