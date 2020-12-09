'use strict';
const {errorJson, messageJson} = require('../utils/jsonMessages');
const upvoteModel = require('../models/upvoteModel');

// Add upvote for post
const add_upvote = async (req, res) => {
  // Check if already upvoted
  const check_upvote = await upvoteModel.getUpvote(
      req.user.user_id,
      req.body.postId,
  );
  if (check_upvote['error']) {
    // Error happened
    return res.status(400).json(check_upvote);
  } else if (check_upvote.length !== 0) {
    // Already upvoted
    return res.status(400).json(errorJson('Already upvoted'));
  }

  // Add upvote
  const addQuery = await upvoteModel.addUpvote(
      req.user.user_id,
      req.body.postId,
  );
  return addQuery['error'] ?
      res.status(400).json(addQuery) :
      res.json(messageJson('Upvoted successfully'));
};

// Checks if user is already upvoted given post
const check_upvote = async (req, res) => {
  const query = await upvoteModel.getUpvote(req.user.user_id, req.params.id);

  return query['error'] ?
      res.json(false) :
      res.json(query.length !== 0);
};

module.exports = {
  add_upvote,
  check_upvote,
};