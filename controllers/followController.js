'use strict';
const followingModel = require('../models/followingModel');

const getFollowing = async (req, res) => {
  const following = await followingModel.get_following(req.user.user_id);
  console.log('followController getFollowing following', following);

  if (following['error']) {
    return res.status(400).json(following);
  }

  res.json(following);
};

module.exports = {
  getFollowing,
};