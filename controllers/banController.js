'use strict';
const banModel = require('../models/banModel');
const followModel = require('../models/followModel');
const userModel = require('../models/userModel');
const checks = require('../utils/checks');
const {messageJson, errorJson} = require('../utils/jsonMessages');

// For banning user
const ban_user = async (req, res) => {
  // Check if user is moderator
  if (await checks.hasModError(req, res)) return;

  if (req.user.user_id.toString() === req.body.bannedId.toString()) {
    return res.status(400).json(errorJson('You can\'t ban yourself'));
  }

  const query = await banModel.banUser(
      req.user.user_id,
      req.body.bannedId,
      req.body.reason,
  );

  if (query['error']) {
    return res.status(400).json(query);
  }

  // Every user who is following this user will be unfollow
  // and this users every follow will be canceled
  const followers = await followModel.getFollowers(req.body.bannedId);
  const followings = await followModel.getFollowing(req.body.bannedId);
  for (const follower of followers) {
    await followModel.unfollowUser(follower.user_id, req.body.bannedId);
  }
  for (const following of followings) {
    await followModel.unfollowUser(req.body.bannedId, following.user_id);
  }

  res.json(
      messageJson(`User ${req.body.bannedId} banned for ${req.body.reason}`));
};

// For unbanning user
const unban_user = async (req, res) => {
  // Check if user is moderator
  if (await checks.hasModError(req, res)) return;

  const query = await banModel.unbanUser(
      req.body.bannedId,
  );
  return query['error'] ?
      res.status(400).json(query) :
      res.json(messageJson(`User ${req.body.bannedId} is unbanned`));
};

const is_banned = async (req, res) => {
  const user = await userModel.getUser(req.user.user_id);
  if (user['error']) {
    // User query returns error
    req.logout();
    return res.status(400).json(true);
  }
  return res.json(false);
};

module.exports = {
  ban_user,
  unban_user,
  is_banned,
};