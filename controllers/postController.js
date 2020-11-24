'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const userModel = require('../models/usermodel');
const resize = require('../utils/resize');
const fs = require('fs');

const new_post = async (req, res) => {
  // console.log('postController new_post body', req.body);
  // console.log('postController new_post file', req.file);

  // Checks if image is missing
  if (!req.file) {
    return res.status(400).json(errorJson('Image must be JPEG or PNG'));
  }

  // Checks for validation errors
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Check if user exists
  const user = await userModel.getUser(req.body.userid);
  // console.log('user', user);
  if (user['error']) {
    // User not exists
    return res.status(400).json(errorJson('Something went wrong'));
  }

  // Add new post to database
  const query = await postModel.add_new_post(req.body.userid, req.body.caption,
      req.file.filename);

  // If query return error
  if (query['error']) {
    return res.status(400).json(query['error']);
  }

  // Makes thumbnail
  const thumb = await make_thumbnail(req);
  // If thumbnail return error
  if (thumb['error']) {
    return res.status(400).json(thumb);
  }

  // Everything went fine
  res.json(query['insertId']);
};

const make_thumbnail = async (req) => {
  try {
    // Creates thumbnails directory if it not exists
    // https://stackoverflow.com/a/26815894
    const dir = './thumbnails';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return await resize.makeThumbnail(req.file.path, 300,
        `./thumbnails/${req.file.filename}`);
  } catch (e) {
    // console.error('postController make_thumbnail error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  new_post,
};