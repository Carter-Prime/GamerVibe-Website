'use strict';
const userModel = require('../models/userModel');
const followModel = require('../models/followModel');
const moderatorModel = require('../models/moderatorModel');
const {errorJson} = require('../utils/jsonMessages');
const {delete_file, make_thumbnail} = require('../utils/fileHandling');

// Get single user
const getUser = async (req, res) => {
  const user = req.user;

  // Get user
  const wantedUser = await userModel.getUser(req.params.id);
  // If errors in getting user, then send it to res
  if (wantedUser['error']) {
    return res.status(400).json(errorJson('No users found'));
  }

  // Wanted user is not same as current user
  if (user.user_id !== wantedUser.user_id) {
    //User is not following this user or is not moderator
    const follow = await followModel.isFollowing(
        user.user_id,
        wantedUser.user_id,
    );
    const mod = await moderatorModel.getModerator(user.user_id);

    // User is not following current user or user is not moderator
    if (wantedUser.private_acc === 1 && follow['error'] && mod['error']) {
      return res.status(400).json(errorJson('No rights to view this user'));
    }
  }

  res.json(wantedUser);
};

// Update users information
const updateUser = async (req, res) => {
  const profilePicPath = './profilePics';
  const profileThumbPath = './profileThumbs';

  if (req.file) {
    // Makes thumbnail if file exists
    const thumb = await make_thumbnail(req.file, profileThumbPath);

    // If thumbnail return error
    if (thumb['error']) {
      delete_file(req.file);
      return res.status(400).json(thumb);
    }
  }

  const user = req.user;

  const body = req.body;
  // All good so far
  const params = [
    // fname
    body.fname !== undefined
        ? body.fname.length === 0
        ? null
        : body.fname
        : user.fname,
    // lname
    body.lname !== undefined
        ? body.lname.length === 0
        ? null
        : body.lname
        : user.lname,
    // imagename
    req.file !== undefined ? req.file.filename : user.imagename,
    // discord
    body.discord !== undefined
        ? body.discord.length === 0
        ? null
        : body.discord
        : user.discord,
    // youtube
    body.youtube !== undefined
        ? body.youtube.length === 0
        ? null
        : body.youtube
        : user.youtube,
    // twitch
    body.twitch !== undefined
        ? body.twitch.length === 0
        ? null
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
      delete_file(`${profilePicPath}/${req.file.filename}`);
      delete_file(`${profileThumbPath}/${req.file.filename}`);
    }
    return res.status(400).json(query);
  }

  res.send(await userModel.getUser(req.user.user_id));
};

// Get users list by name
const updateUserByName = async (req, res) => {
  const name = req.params.name;
  const users = await userModel.getupdateUserByName(`%${name}%`);
  res.json(users);
};

module.exports = {
  getUser,
  updateUser,
  updateUserByName,
};
