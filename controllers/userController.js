'use strict';
const userModel = require('../models/usermodel');
const {errorJson} = require('../utils/json_messages');

const getUser = async (req, res) => {
  const user = await userModel.getUser(req.params.id);
  if (user['error']) {
    return res.status(400).json(errorJson('No users found'));
  }

  delete user.passwd;
  // TODO: delete other unnecessary information
  // console.log('userController getUser user', user);
  res.json(user);
};

module.exports = {
  getUser,
};