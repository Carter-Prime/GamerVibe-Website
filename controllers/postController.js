'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const userModel = require('../models/usermodel');

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
  if(user['error']){
    return res.json(errorJson('Something went wrong'))
  }

  const query = await postModel.add_new_post(req.body.userid, req.body.caption,
      req.file.filename);

  res.json(query['insertId']);
};

module.exports = {
  new_post,
};