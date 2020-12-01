'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

// Get comments for given post
const get_post_comments = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT c.comment_id, c.user_id, c.post_id, c.content, c.commented_at, c.edited_at ' +
        'FROM Comments AS c ' +
        'WHERE post_id = ? ' +
        'AND deleted_at IS NULL', [postId],
    );
    // console.log('commentModel get_post_comments rows', rows);
    return rows;
  } catch (e) {
    // console.error('commentModel get_post_comments error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  get_post_comments,
};