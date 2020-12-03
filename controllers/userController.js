'use strict';
const userModel = require('../models/userModel');
const followModel = require('../models/followModel');
const moderatorModel = require('../models/moderatorModel');
const {errorJson} = require('../utils/json_messages');
const {validationResult} = require('express-validator');
const {delete_file, make_thumbnail} = require('../utils/my_random_stuff');

// Get single user
const getUser = async (req, res) => {
  const user = req.user;
  // console.log('userController getUser req.user', user);
  // console.log('userController getUser params', req.params.id)

  // Get user
  const wantedUser = await userModel.getUser(req.params.id);
  // If errors in getting user, then send it to res
  if (wantedUser['error']) {
    return res.status(400).json(errorJson('No users found'));
  }

  //User is not following this user or is not moderator
  const follow = await followModel.is_following(user.user_id, wantedUser.user_id)
  const mod = await moderatorModel.get_mod(user.user_id)

  // User is not following current user or user is not moderator
  if(follow['error'] && mod['error']) {
    return res.status(400).json(errorJson('No rights to view this user'))
  }

  // console.log('userController getUser user', user);
  res.json(wantedUser);
};

// Update users information
const updateUser = async (req, res) => {
  // console.log('userController updateUser body', req.body);
  // console.log('userController updateUser file', req.file);
  const profilePicPath = './profilePics';
  const profileThumbPath = './profileThumbs';
  const profilePicFile = req.file ?
      `${profilePicPath}/${req.file.filename}` :
      undefined;

  // Check if user still exists
  const user = await userModel.getUser(req.user.user_id);
  // console.log('userController updateUser user', user);
  if (user['error']) {
    // No user found
    if (req.file) {
      delete_file(profilePicFile);
    }
    return res.status(400).json(user);
  }

  // Check if there is errors in body
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    // Errors in body
    if (req.file) {
      delete_file(profilePicFile);
    }
    return res.status(400).json(errorJson(valRes['errors']));
  }

  if (req.file) {
    // Makes thumbnail if file exists
    const thumb = await make_thumbnail(req.file, profileThumbPath);
    // console.log('userController updateUser thumb', thumb);

    // If thumbnail return error
    if (thumb['error']) {
      delete_file(profilePicFile);
      return res.status(400).json(thumb);
    }
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
      delete_file(profilePicFile);
      delete_file(`${profileThumbPath}/${req.file.filename}`);
    }
    return res.status(400).json(query);
  }

  res.send(await userModel.getUser(req.user.user_id));
};

module.exports = {
  getUser,
  updateUser,
};
