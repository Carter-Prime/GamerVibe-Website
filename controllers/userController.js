'use strict';
const userModel = require('../models/usermodel');
const {errorJson} = require('../utils/json_messages');

const getUser = async (req, res) => {
  const user = req.user;
  console.log('userController getUser req.user', user);

  const wantedUser = await userModel.getUser(req.params.id);
  if (wantedUser['error']) {
    return res.status(400).json(errorJson('No users found'));
  }

  delete wantedUser.passwd;
  // TODO: delete other unnecessary information
  // console.log('userController getUser user', user);
  res.json(wantedUser);
};

module.exports = {
  getUser,
};