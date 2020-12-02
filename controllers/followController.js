'use strict';
const followingModel = require('../models/followModel');
const {validationResult} = require('express-validator');
const {errorJson, messageJson} = require('../utils/json_messages');

// Get users who current user is following
const getFollowing = async (req, res) => {
  // console.log('followController getFollowing user', req.user)

  const query = await followingModel.get_following(req.user.user_id);
  // console.log('followController getFollowing query', query);

  // If there is error in query, send it to res
  if (query['error']) {
    return res.status(400).json(query);
  }

  res.json(query);
};

// Get list of users that are following current user
const getFollowers = async (req, res) => {
  // console.log('followController getFollowers user', req.user)

  const query = await followingModel.get_followers(req.user.user_id);
  // console.log('followController getFollowers query', query);

  // If there is error in query, send it to res
  if (query['error']) {
    return res.status(400).json(query);
  }

  res.json(query);
};

const followUser = async (req, res) => {
  // Check body for errors
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Check if user is already following other user
  const isFollowing = await followingModel.is_following(req.user.user_id, req.body.user)
  if(isFollowing['error']) {
    // Error happened
    return res.status(400).json(isFollowing)
  } else if (isFollowing.length !== 0) {
    // User is already following other
    return res.json(messageJson(`User ${req.user.user_id} is already following user ${req.body.user}`))
  }

  // Add following user
  const follow = await followingModel.follow_user(req.user.user_id, req.body.user)
  if(follow['error']) {
    return res.status(400).json(follow)
  }

  res.json(messageJson(`User ${req.user.user_id} followed user ${req.body.user}`))
};

module.exports = {
  getFollowing,
  getFollowers,
  followUser,
};