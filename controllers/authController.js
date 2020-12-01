'use strict';
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const {errorJson, messageJson} = require('../utils/json_messages');


// For registering new user
const register = async (req, res, next) => {
  // console.log('authController signup', req.body);

  const valRes = validationResult(req);
  // If there is errors in login parameters, then return errors
  // else continue
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Hashes password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const params = [req.body.username, req.body.email, hash, 'default.png'];

  // console.log('authController params', params);

  const query = await userModel.addUser(params);

  // If query return no errors then continue
  // else send error message
  if (query['error']) {
    // console.error('authController register error', query['error']);
    return res.status(400).json(query['error']);
  }
  next();
};

// Log in using existing user
const login = (req, res) => {
  // console.log('authController login', req.body);
  passport.authenticate('local', {session: false}, (err, user) => {
    // console.log('authController info', info);
    // console.log('authController user', user);

    // Error in authentication or no user found
    if (err || !user) {
      // console.error('authController error', err);
      return res.status(400).
          json(messageJson('User was not found! Please try again.'));
    }

    // Try logging in
    req.login(user, {session: false}, (err) => {
      if (err) {
        // console.error('authController req.login error', err);
        return res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({user, token});
    });
  })(req, res);
};

// Log user out
const logout = (req, res) => {
  req.logout();
  res.json(messageJson('Logged out successfully'));
};

module.exports = {
  login,
  register,
  logout,
};
