'use strict';
const banModel = require('../models/banModel');
const followModel = require('../models/followModel');
const checks = require('../utils/checks');
const {messageJson, errorJson} = require('../utils/json_messages');

// For banning user
const ban_user = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  // Check errors from body
  if (checks.hasBodyErrors(req, res)) return;

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

  if(query['error']) {
    return res.status(400).json(query);
  }

  // Every user who is following this user will be unfollow
  // and this users every follow will be canceled
  const followers = await followModel.get_followers(req.body.bannedId);
  const followings = await followModel.get_following(req.body.bannedId);
  for(const follower of followers) {
    await followModel.unfollow_user(follower.user_id, req.body.bannedId);
  }
  for(const following of followings) {
    await followModel.unfollow_user(req.body.bannedId, following.user_id);
  }

  res.json(messageJson(`User ${req.body.bannedId} banned for ${req.body.reason}`));
};

// For unbanning user
const unban_user = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  // Check errors from body
  if (checks.hasBodyErrors(req, res)) return;

  // Check if user is moderator
  if (await checks.hasModError(req, res)) return;

  const query = await banModel.unbanUser(
      req.body.bannedId,
  );
  return query['error'] ?
      res.status(400).json(query) :
      res.json(messageJson(`User ${req.body.bannedId} is unbanned`));
};

const isBanned = async (req, res) => {
  return await checks.isUserBanned(req, res)
}

module.exports = {
  ban_user,
  unban_user,
  isBanned
};