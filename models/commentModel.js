'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/jsonMessages');

// Get comments for given post
const get_post_comments = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT c.comment_id, c.user_id, u.username, c.post_id, c.content, c.commented_at, c.edited_at ' +
        'FROM Comments AS c, User AS u ' +
        'WHERE c.post_id = ? ' +
        'AND c.user_id = u.user_id ' +
        'AND c.deleted_at IS NULL', [postId],
    );
    // console.log('commentModel get_post_comments rows', rows);
    return rows;
  } catch (e) {
    // console.error('commentModel get_post_comments error', e.message);
    return errorJson(e.message);
  }
};

// Add new comment
const add_comment = async (uid, pid, content) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Comments(user_id, post_id, content) ' +
        'VALUES(?,?,?)', [uid, pid, content],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get comment by id
const get_comment = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Comments ' +
        'WHERE comment_id = ? ' +
        'AND deleted_at IS NULL', [id],
    );
    return rows[0] ? rows[0] : errorJson('No comments found');
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  get_post_comments,
  add_comment,
  get_comment,
};