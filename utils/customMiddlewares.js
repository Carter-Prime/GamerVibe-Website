'use strict';
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('./jsonMessages');
const { delete_file } = require("./fileHandling");

// Checks if user is banned or deleted
const userActive = async (req, res, next) => {
  const user = await userModel.getUser(req.user.user_id);
  if (user['error']) {
    return res.status(400).json(user);
  }
  next();
};

// Check errors from body
const checkBody = (req, res, next) => {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    if (req.file) {
      delete_file(req.file);
    }
    return res.status(400).json(errorJson(valRes['errors']));
  }
  next();
};

// Checks if posts exists
const isPost = async (req, res, next) => {
  const checkPost = await postModel.getPost(req.body.postId);
  if (checkPost['error']) {
    return res.status(400).json(checkPost);
  }
  next();
};

module.exports = {
  userActive,
  checkBody,
  isPost
}