'use strict';
const followingModel = require('../models/followModel');

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

module.exports = {
  getFollowing,
  getFollowers,
};