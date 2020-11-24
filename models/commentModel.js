'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

const get_post_comments = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Comments WHERE post_id = ?', [postId],
    );
    console.log('commentModel get_post_comments rows', rows);
    return rows;
  } catch (e) {
    console.error('commentModel get_post_comments error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  get_post_comments,
};