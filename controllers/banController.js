'use strict';
const banModel = require('../models/banModel');
const checks = require('../utils/checks');

const ban_user = async (req, res) => {
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

  res.json(`User ${req.body.bannedId} banned for ${req.body.reason}`);
};

module.exports = {
  ban_user,
};