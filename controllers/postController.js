'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const userModel = require('../models/usermodel');
const commentModel = require('../models/commentModel');
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
    // User query returns error
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
  // console.log('postController new_post thumb', thumb);

  // If thumbnail return error
  if (thumb['error']) {
    // Delete record from database if errors while making thumbnail
    await postModel.delete_post(query['insertId']);
    return res.status(400).json(thumb);
  }

  // Everything went fine
  res.json(await postModel.get_post(query['insertId']));
};

const fetch_post = async (req, res) => {
  const post = {}
  const content = await postModel.get_post(req.params.id);
  // console.log('postController fetch_post post', post);

  if (post['error']) {
    return res.status(400).json(post);
  }

  post.content = content;
  post.comments = await commentModel.get_post_comments(req.params.id);

  res.json(post);
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
  fetch_post
};