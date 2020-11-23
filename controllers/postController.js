'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const userModel = require('../models/usermodel');
const resize = require('../utils/resize');
const fs = require('fs')

const new_post = async (req, res) => {
  // console.log('postController new_post body', req.body);
  // console.log('postController new_post file', req.file);

  // Checks if image is missing
  if (!req.file) {
    return res.json(errorJson('Image must be JPEG or PNG'));
  }

  // Checks for validation errors
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.json(errorJson(valRes['errors']));
  }

  const user = await userModel.getUser(req.body.userid);
  // console.log('user', user);
  if (user['error']) {
    return res.status(400).json(errorJson('Something went wrong'));
  }

  const query = await postModel.add_new_post(req.body.userid, req.body.caption,
      req.file.filename);

  if (query['error']) {
    return res.status(400).json(query['error']);
  }

  const thumb = await make_thumbnail(req);
  if (thumb['error']) {
    return res.status(400).json(thumb);
  }
  res.json(query['insertId']);
};

const make_thumbnail = async (req) => {
  try {
    // https://stackoverflow.com/a/26815894
    const dir = './thumbnails';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    return await resize.makeThumbnail(req.file.path, 300,
        `./thumbnails/${req.file.filename}`);
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  new_post,
};