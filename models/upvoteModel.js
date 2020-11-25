'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

const get_upvotes = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT u.user_id, u.post_id, u.liked_at ' +
        'FROM Upvote AS u ' +
        'WHERE post_id = ? ' +
        'AND unliked_at IS NULL', [postId],
    );
    // console.log('upvoteModel get_upvotes rows', rows);
    return rows;
  } catch (e) {
    // console.error('upvoteModel get_upvotes error', e.message)
    return errorJson(e.message);
  }
};

module.exports = {
  get_upvotes,
};