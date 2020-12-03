'use strict';
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');

const addComment = async (req, res) => {
  // Check body for errors
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Checks if posts exists
  const checkPost = await postModel.get_post(req.body.postId);
  if (checkPost['error']) {
    return res.status(400).json(checkPost);
  }

  // Make new comment
  const addQuery = await commentModel.add_comment(
      req.user.user_id,
      req.body.postId,
      req.body.content,
  );
  if (addQuery['error']) {
    return res.status(400).json(addQuery);
  }

  res.json(await commentModel.get_comment(addQuery['insertId']))
};

module.exports = {
  addComment,
};