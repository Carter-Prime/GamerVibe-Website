"use strict";
const userModel = require("../models/userModel");
const { errorJson } = require("../utils/json_messages");

const getUser = async (req, res) => {
  // TODO: check if user follows wantedUser or user is moderator
  const user = req.user;
  // console.log('userController getUser req.user', user);
  // console.log('userController getUser params', req.params.id)

  const wantedUser = await userModel.getUser(req.params.id);
  if (wantedUser["error"]) {
    return res.status(400).json(errorJson("No users found"));
  }

  delete wantedUser.passwd;
  // TODO: delete other unnecessary information
  // console.log('userController getUser user', user);
  res.json(wantedUser);
};

module.exports = {
  getUser,
};
