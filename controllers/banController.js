'use strict';
const {validationResult} = require('express-validator');
const banModel = require('../models/banModel');
const modModel = require('../models/moderatorModel');
const {errorJson} = require('../utils/json_messages');

const ban_user = async (req, res) => {
  console.log('banController ban_user body', req.body)
  console.log('banController ban_user user', req.user)

  // Check errors from body
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Check if user is moderator
  const mod = await modModel.get_mod(req.user.user_id);
  console.log('banController ban_user mod', mod)
  if (mod['error']) {
    return res.status(400).json(errorJson('User does not have rights to ban'));
  }

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