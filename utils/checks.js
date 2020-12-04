'use strict';
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const modModel = require('../models/moderatorModel');
const postModel = require('../models/postModel');

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

module.exports = {
  hasBodyErrors,
  hasModError,
  isPost,
};