'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

// Get list of users that given user is following
const get_following = async (userid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.imagename, ' +
        'u.discord, u.youtube, u.twitch ' +
        'FROM User AS u ' +
        'INNER JOIN Following AS f ' +
        'ON u.user_id = f.following_id ' +
        'AND f.follower_id = ?', [userid],
    );
    // console.log('followingModel get_following rows', rows);
    return rows;
  } catch (e) {
    // console.error('followingModel get_following error', e.message)
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
        'AND f.following_id = ?', [userid],
    );
    // console.log('followingModel get_followers rows', rows);
    return rows;
  } catch (e) {
    // console.error('followingModel get_following error', e.message)
    return errorJson(e.message);
  }
};

module.exports = {
  get_following,
  get_followers,
};