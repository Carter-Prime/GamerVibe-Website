'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/jsonMessages');

// Get list of users that given user is following
const getFollowing = async (userid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.imagename, ' +
        'u.discord, u.youtube, u.twitch ' +
        'FROM User AS u ' +
        'INNER JOIN Following AS f ' +
        'ON u.user_id = f.following_id ' +
        'AND f.follower_id = ? ' +
        'AND canceled_at IS NULL', [userid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get list of users that are following given user
const get_followers = async (userid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.imagename, ' +
        'u.discord, u.youtube, u.twitch ' +
        'FROM User AS u ' +
        'INNER JOIN Following AS f ' +
        'ON u.user_id = f.follower_id ' +
        'AND f.following_id = ? ' +
        'AND f.canceled_at IS NULL', [userid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// For following user
const follow_user = async (uid, fid) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Following(follower_id, following_id) ' +
        'VALUES(?,?)', [uid, fid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// For unfollowing user
const unfollow_user = async (uid, fid) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE Following ' +
        'SET canceled_at = NOW() ' +
        'WHERE follower_id = ? ' +
        'AND following_id = ? ' +
        'AND canceled_at IS NULL', [uid, fid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Checks if user is following given user
const is_following = async (uid, fid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Following ' +
        'WHERE follower_id = ? ' +
        'AND following_id = ? ' +
        'AND canceled_at IS NULL', [uid, fid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getFollowing,
  get_followers,
  follow_user,
  is_following,
  unfollow_user,
};