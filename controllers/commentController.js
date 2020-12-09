'use strict';
const commentModel = require('../models/commentModel');

// For adding new comment to post
const add_comment = async (req, res) => {
  // Make new comment
  const addQuery = await commentModel.addComment(
      req.user.user_id,
      req.body.postId,
      req.body.content,
  );
  return addQuery['error'] ?
      res.status(400).json(addQuery) :
      res.json(await commentModel.get_comment(addQuery['insertId']));
};

module.exports = {
  add_comment,
};