'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

const get_following = async (userid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Following WHERE follower_id = ?', [userid],
    );
    console.log('followingModel get_following rows', rows);
    return rows;
  } catch (e) {
    console.error('followingModel get_following error', e.message)
    return errorJson(e.message);
  }
};

module.exports = {
  get_following,
};