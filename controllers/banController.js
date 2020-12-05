'use strict';
const banModel = require('../models/banModel');
const checks = require('../utils/checks');
const {errorJson, messageJson} = require('../utils/json_messages')

const ban_user = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  // Check errors from body
  if (checks.hasBodyErrors(req, res)) return;

  // Check if user is moderator
  if(await checks.hasModError(req, res)) return;

  const query = await banModel.banUser(
      req.user.user_id,
      req.body.bannedId,
      req.body.reason,
  );
  if (query['error']) {
    return res.status(400).json(query);
  }

  res.json(messageJson(`User ${req.body.bannedId} banned for ${req.body.reason}`));
};

const unban_user = async (req, res) => {

}

module.exports = {
  ban_user,
  unban_user
};