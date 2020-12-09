'use strict';
const {errorJson, messageJson} = require('../utils/jsonMessages');
const upvoteModel = require('../models/upvoteModel');

// Add upvote for post
const addUpvote = async (req, res) => {
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
  return addQuery['error'] ?
      res.status(400).json(addQuery) :
      res.json(messageJson('Upvoted successfully'));
};

// Checks if user is already upvoted given post
const checkUpvote = async (req, res) => {
  const query = await upvoteModel.get_upvote(req.user.user_id, req.params.id);

  return query['error'] ?
      res.json(false) :
      res.json(query.length !== 0);
};

module.exports = {
  addUpvote,
  checkUpvote,
};