'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson, messageJson} = require('../utils/json_messages');
const userModel = require('../models/usermodel');
const commentModel = require('../models/commentModel');
const tagModel = require('../models/tagModel');
const upvoteModel = require('../models/upvoteModel');
const moderatorModel = require('../models/moderatorModel');
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
    await postModel.delete_temp_post(query['insertId']);

    // Delete uploaded file from system
    try {
      fs.unlinkSync(`./uploads/${req.file.filename}`);
    } catch (e) {
      // console.error('postController new_post fs.unlink', e.message);
    }
    return res.status(400).json(thumb);
  }

  // Everything went fine
  res.json(await postModel.get_post(query['insertId']));
};

const fetch_post = async (req, res) => {
  const post = {};
  const postId = req.params.id;

  const content = await postModel.get_post(postId);
  // console.log('postController fetch_post content', content);

  if (content['error']) {
    return res.status(400).json(content);
  }

  post.content = content;
  post.comments = await commentModel.get_post_comments(postId);
  post.tags = await tagModel.get_tags(postId);
  post.upvotes = await upvoteModel.get_upvotes(postId);

  res.json(post);
};

const delete_post = async (req, res) => {
  const user = req.user;
  // console.log('postController delete_post user', user)

  const post = await postModel.get_post(req.params.id);
  console.log('postController delete_post post', post);

  if (post['error']) {
    // Post not exists
    return res.status(400).json(post);
  } else if (post.user_id !== user.user_id) {
    // This is not current users posted post
    const mod = await moderatorModel.get_mod(user.user_id);
    // console.log('postController delete_post mod', mod)

    if (mod['error']) {
      // User is not moderator
      return res.status(400).
          json(errorJson('User don\'t have permission to delete this post'));
    }

    return res.status(400).
        json(errorJson('User don\'t have permission to delete this post'));
  }

  // User can delete post
  const query = await postModel.delete_post(req.params.id);
  return query['error'] ?
      res.status(400).json(query) :
      res.json(query);
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
  fetch_post,
  delete_post,
};