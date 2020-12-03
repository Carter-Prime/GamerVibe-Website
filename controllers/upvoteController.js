'use strict';
const {validationResult} = require('express-validator');
const {errorJson, messageJson} = require('../utils/json_messages');
const upvoteModel = require('../models/upvoteModel');
const postModel = require('../models/postModel');

const addUpvote = async (req, res) => {
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

  // Check if already upvoted
  const checkUpvote = await upvoteModel.get_upvote(
      req.user.user_id,
      req.body.postId
  );
  console.log('upvoteController addUpvote checkUpvote', checkUpvote)
  if (checkUpvote['error']) {
    // Error happened
    return res.status(400).json(checkUpvote);
  } else if(checkUpvote.length !== 0) {
    // Already upvoted
    return res.status(400).json(errorJson('Already upvoted'))
  }

  // Add upvote
  const addQuery = await upvoteModel.add_upvote(
      req.user.user_id,
      req.body.postId,
  );
  console.log('upvoteController addUpvote addQuery', addQuery)
  if (addQuery['error']) {
    return res.status(400).json(addQuery);
  }

  res.json(messageJson('Upvoted successfully'));
};

module.exports = {
  addUpvote,
};