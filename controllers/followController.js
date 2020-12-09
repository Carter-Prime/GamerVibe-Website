'use strict';
const followingModel = require('../models/followModel');
const {messageJson, errorJson} = require('../utils/jsonMessages');

// Get users who current user is following
const get_following = async (req, res) => {
  const query = await followingModel.getFollowing(req.user.user_id);

  // If there is error in query, send it to res
  return query['error'] ?
      res.status(400).json(query) :
      res.json(query);
};

// Get list of users that are following current user
const getFollowers = async (req, res) => {
  const query = await followingModel.get_followers(req.user.user_id);

  // If there is error in query, send it to res
  return query['error'] ?
      res.status(400).json(query) :
      res.json(query);
};

// Return true if user is following given id
const isFollowingUserId = async (req, res) => {
  const isFollowing = await followingModel.is_following(req.user.user_id,
      req.params.id);

  return isFollowing['error'] ?
      res.json(false) :
      res.json(isFollowing.length !== 0);
};

// For following user
const followUser = async (req, res) => {
  if (req.user.user_id.toString() === req.body.user.toString()) {
    return res.status(400).json(errorJson('You can\'t follow yourself'));
  }

  // Check if user is already following other user
  const isFollowing = await followingModel.is_following(req.user.user_id,
      req.body.user);
  if (isFollowing['error']) {
    // Error happened
    return res.status(400).json(isFollowing);
  } else if (isFollowing.length !== 0) {
    // User is already following other
    return res.json(messageJson(
        `User ${req.user.user_id} is already following user ${req.body.user}`));
  }

  // Add following user
  const follow = await followingModel.follow_user(req.user.user_id,
      req.body.user);
  return follow['error'] ?
      res.status(400).json(follow) :
      res.json(messageJson(
          `User ${req.user.user_id} followed user ${req.body.user}`));
};

// For unfollowing user
const unfollowUser = async (req, res) => {
  // Check if user is already following other user
  const isFollowing = await followingModel.is_following(req.user.user_id,
      req.body.user);
  if (isFollowing['error']) {
    // Error happened
    return res.status(400).json(isFollowing);
  } else if (isFollowing.length === 0) {
    // User is not following given user
    return res.json(messageJson(
        `User ${req.user.user_id} is not following user ${req.body.user}`));
  }

  // Unfollowing user
  const unfollow = await followingModel.unfollow_user(req.user.user_id,
      req.body.user);
  return unfollow['error'] ?
      res.status(400).json(unfollow) :
      res.json(messageJson(
          `User ${req.user.user_id} unfollowed user ${req.body.user}`));
};

module.exports = {
  get_following,
  getFollowers,
  followUser,
  isFollowingUserId,
  unfollowUser,
};