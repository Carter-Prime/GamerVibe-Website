'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentModel');
const tagModel = require('../models/postTagModel');
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
  const user = await userModel.getUser(req.user.userid);
  // console.log('user', user);
  if (user['error']) {
    // User query returns error
    return res.status(400).json(errorJson('Something went wrong'));
  }

  // Makes thumbnail
  const thumb = await make_thumbnail(req);
  // console.log('postController new_post thumb', thumb);

  // If thumbnail return error
  if (thumb['error']) {
    // Delete uploaded file from system
    try {
      fs.unlinkSync(`./uploads/${req.file.filename}`);
    } catch (e) {
      // console.error('postController new_post fs.unlink', e.message);
    }
    return res.status(400).json(thumb);
  }

  // Add new post to database
  const query = await postModel.add_new_post(req.user.userid, req.body.caption,
      req.file.filename);

  // If query return error
  if (query['error']) {
    return res.status(400).json(query['error']);
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

  // TODO: user can only get post if moderator or user is allowed to see that
  const user = req.user;

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
  // console.log('postController delete_post post', post);

  let allowed = true;

  if (post['error']) {
    // Post not exists
    return res.status(400).json(post);
  }

  if (post.user_id !== user.user_id) {
    // User is not posts original poster
    allowed = false;

    const mod = await moderatorModel.get_mod(user.user_id);
    // console.log('postController delete_post mod', mod)

    if (!mod['error']) {
      // User is moderator
      allowed = true;
    }
  }

  if (!allowed) {
    // User is not allowed to delete post
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