'use strict';
const {errorJson} = require('./jsonMessages');
const modModel = require('../models/moderatorModel');

// Checks if current user is moderator
const hasModError = async (req, res) => {
  const mod = await modModel.getModerator(req.user.user_id);
  if (mod['error']) {
    res.status(400).json(errorJson('User does not have rights to ban'));
    return true;
  }
  return false;
};

module.exports = {
  hasModError,
};