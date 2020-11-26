'use strict';
const userModel = require('../models/userModel');
const {errorJson} = require('../utils/json_messages');
const {validationResult} = require('express-validator');
const {delete_file} = require('../utils/delete_file');

const getUser = async (req, res) => {
  // TODO: check if user follows wantedUser or user is moderator
  const user = req.user;
  // console.log('userController getUser req.user', user);
  // console.log('userController getUser params', req.params.id)

  const wantedUser = await userModel.getUser(req.params.id);
  if (wantedUser['error']) {
    return res.status(400).json(errorJson('No users found'));
  }

  delete wantedUser.passwd;
  // TODO: delete other unnecessary information
  // console.log('userController getUser user', user);
  res.json(wantedUser);
};

const updateUser = async (req, res) => {
  console.log('userController updateUser body', req.body);
  // console.log('userController updateUser file', req.file);
  const profilePicPath = `./profilePics/${req.file.filename}`;

  // Check if user still exists
  const user = await userModel.getUser(req.user.user_id);
  // console.log('userController updateUser user', user);
  if (user['error']) {
    // No user found
    if (req.file) {
      delete_file(profilePicPath);
    }
    return res.status(400).json(user);
  }

  // Check if there is errors in body
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    // Errors in body
    if (req.file) {
      delete_file(profilePicPath);
    }
    return res.status(400).json(errorJson(valRes['errors']));
  }

  const body = req.body;
  // All good so far
  const params = [
    // fname
    body.fname !== undefined ?
        body.fname.length === 0 ? null
            : body.fname
        : user.fname,
    // lname
    body.lname !== undefined ?
        body.lname.length === 0 ? null
            : body.lname
        : user.lname,
    // imagename
    req.file !== undefined ? req.file.filename
        : user.imagename,
    // discord
    body.discord !== undefined ?
        body.discord.length === 0 ? null
            : body.discord
        : user.discord,
    // youtube
    body.youtube !== undefined ?
        body.youtube.length === 0 ? null
            : body.youtube
        : user.youtube,
    // twitch
    body.twitch !== undefined ?
        body.twitch.length === 0 ? null
            : body.twitch
        : user.twitch,
    // private
    body.private !== undefined ? body.private : user.private_acc,
    // uid
    user.user_id,
  ];

  const query = await userModel.updateUser(params);
  if (query['error']) {
    if (req.file) {
      delete_file(profilePicPath);
    }
    return res.status(400).json(query);
  }

  res.send(await userModel.getUser(req.user.user_id));
};

module.exports = {
  getUser,
  updateUser,
};
