'use strict';
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const modModel = require('../models/moderatorModel');
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

const hasBodyErrors = (req, res) => {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    res.status(400).json(errorJson(valRes['errors']));
    return true;
  }
  return false;
};

const hasModError = async (req, res) => {
  const mod = await modModel.get_mod(req.user.user_id);
  if (mod['error']) {
    res.status(400).json(errorJson('User does not have rights to ban'));
    return true;
  }
  return false;
};

const isPost = async (req, res) => {
  const checkPost = await postModel.get_post(req.body.postId);
  if (checkPost['error']) {
    res.status(400).json(checkPost);
    return false;
  }
  return true;
};

const isUserBanned = async (req, res) => {
  const user = await userModel.getUser(req.user.user_id);
  if (user['error']) {
    // User query returns error
    req.logout();
    res.status(400).json(errorJson('User account has some problems'));
    return true
  }
  return false
};

module.exports = {
  hasBodyErrors,
  hasModError,
  isPost,
  isUserBanned,
};