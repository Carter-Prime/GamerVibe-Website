'use strict';
const commentModel = require('../models/commentModel');
const {clearWhitespaces} = require('../utils/checks');
const {errorJson} = require('../utils/jsonMessages');

// For adding new comment to post
const add_comment = async (req, res) => {
  const content = clearWhitespaces(req.body.content)
  if(content.length === 0) {
    return res.status(400).json(errorJson('You can\'t add empty comment'))
  }

  // Make new comment
  const addQuery = await commentModel.addComment(
      req.user.user_id,
      req.body.postId,
      content,
  );
  return addQuery['error'] ?
      res.status(400).json(addQuery) :
      res.json(await commentModel.getComment(addQuery['insertId']));
};

module.exports = {
  add_comment,
};