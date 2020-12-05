'use strict';
const {errorJson, messageJson} = require('../utils/json_messages');
const upvoteModel = require('../models/upvoteModel');
const checks = require('../utils/checks');

const addUpvote = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  // Check body for errors
  if (checks.hasBodyErrors(req, res)) return;

  // Checks if posts exists
  if (!await checks.isPost(req, res)) return;

  // Check if already upvoted
  const checkUpvote = await upvoteModel.get_upvote(
      req.user.user_id,
      req.body.postId,
  );
  if (checkUpvote['error']) {
    // Error happened
    return res.status(400).json(checkUpvote);
  } else if (checkUpvote.length !== 0) {
    // Already upvoted
    return res.status(400).json(errorJson('Already upvoted'));
  }

  // Add upvote
  const addQuery = await upvoteModel.add_upvote(
      req.user.user_id,
      req.body.postId,
  );
  if (addQuery['error']) {
    return res.status(400).json(addQuery);
  }

  res.json(messageJson('Upvoted successfully'));
};

const checkUpvote = async (req, res) => {
  // Check that is user banned or deleted
  if (await checks.isUserBanned(req, res)) return;

  const query = await upvoteModel.get_upvote(req.user.user_id, req.params.id)

  return query['error'] ?
      res.json(false) : res.json(query.length !== 0)
}

module.exports = {
  addUpvote,
  checkUpvote
};