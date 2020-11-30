'use strict';
const followingModel = require('../models/followModel');
const userModel = require('../models/userModel');

const getFollowing = async (req, res) => {
  console.log('followController getFollowing user', req.user)
  const query = await followingModel.get_following(req.user.user_id);
  // console.log('followController getFollowing query', query);

  if (query['error']) {
    return res.status(400).json(query);
  }

  const following = []
  for(const f of query) {
    // console.log('f', f)
    following.push(await userModel.getUser(f['following_id']))
  }

  res.json(following);
};

const getFollowers = async (req, res) => {
  console.log('followController getFollowers user', req.user)
  const query = await followingModel.get_followers(req.user.user_id);
  console.log('followController getFollowers query', query);

  if (query['error']) {
    return res.status(400).json(query);
  }

  const followers = []
  for(const f of query) {
    // console.log('f', f)
    followers.push(await userModel.getUser(f['follower_id']))
  }

  res.json(followers);
}

module.exports = {
  getFollowing,
  getFollowers
};