'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const {messageJson} = require('../utils/jsonMessages');

// For registering new user
const register = async (req, res, next) => {
  // Hashes password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const params = [req.body.username, req.body.email, hash, 'default.png'];
  const query = await userModel.addUser(params);

  // If query return no errors then continue
  // else send error message
  if (query['error']) {
    return res.status(400).json(query['error']);
  }
  next();
};

// Log in using existing user
const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user) => {
    // Error in authentication or no user found
    if (err || !user) {
      return res.status(400).
          json(messageJson('User was not found! Please try again.'));
    }

    // Try logging in
    req.login(user, {session: false}, (err) => {
      if (err) {
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
