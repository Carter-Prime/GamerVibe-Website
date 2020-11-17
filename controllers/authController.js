'use strict';
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
  //console.log('authController signup', req.body);

  const errors = validationResult(req);
  // If there is errors in login parameters, then return errors
  // else continue
  if (!errors.isEmpty()) {
    return res.send(errors.array());
  }

  // Hashes password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const params = [
    req.body.username,
    req.body.email,
    hash,
  ];

  //console.log('authController params', params);

  // TODO: SQL query
  //const query = await userModel.addUser(params);

  // If query return no errors then continue
  // else send error message
  if (/* query */ true) {
    next();
  } else {
    res.status(400).json({error: 'Add some useful error message here please'});
  }
};

const login = (req, res) => {
  console.log('authController login', req.body);
  // TODO: login using passport authenticator

};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'Logged out successfully'});
};

module.exports = {
  login,
  signup,
  logout,
};