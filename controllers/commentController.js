'use strict';
const commentModel = require('../models/commentModel');
const checks = require('../utils/checks');

// For adding new comment to post
const addComment = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  // Check body for errors
  if (checks.hasBodyErrors(req, res)) return;

  // Checks if posts exists
  if(!await checks.isPost(req, res)) return;

  // Make new comment
  const addQuery = await commentModel.add_comment(
      req.user.user_id,
      req.body.postId,
      req.body.content,
  );
  return addQuery['error'] ?
      res.status(400).json(addQuery) :
      res.json(await commentModel.get_comment(addQuery['insertId']));
};

module.exports = {
  addComment,
};