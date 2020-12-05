'use strict';
const blockingModel = require('../models/blockingModel');
const checks = require('../utils/checks');

const get_blocked_users_by_user = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  const query = await blockingModel.get_users_banned_by_user(
      req.user.user_id,
  );

  return query['error'] ?
      res.status(400).json(query) :
      res.json(query);
};

module.exports = {
  get_blocked_users_by_user,
};