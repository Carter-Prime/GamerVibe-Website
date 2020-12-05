'use strict';
const blockingModel = require('../models/blockingModel');
const checks = require('../utils/checks');
const {errorJson} = require('../utils/json_messages')

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

const block_user = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  // Check body for errors
  if (checks.hasBodyErrors(req, res)) return;

  const check = await blockingModel.checkBlocked(req.user.user_id,
      req.body.blockedId);
  if (check['error']) {
    return res.status(400).json(check);
  } else if (check.length !== 0) {
    return res.status(400).json(errorJson('User already blocked'))
  }

  const query = await blockingModel.blockUser(req.user.user_id,
      req.body.blockedId);

  return query['error'] ?
      res.status(400).json(query) :
      res.json(query);
};

module.exports = {
  get_blocked_users_by_user,
  block_user,
};