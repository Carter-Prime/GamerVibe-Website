'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/jsonMessages');

// Get all upvotes for given post
const getUpvotes = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT u.user_id, u.post_id, u.liked_at ' +
        'FROM Upvote AS u ' +
        'WHERE post_id = ? ' +
        'AND unliked_at IS NULL', [postId],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Add new upvote
const addUpvote = async (uid, pid) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Upvote(user_id, post_id) ' +
        'VALUES(?,?)', [uid, pid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Checks if user is following given post
const getUpvote = async (uid, pid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Upvote ' +
        'WHERE user_id = ? ' +
        'AND post_id = ? ' +
        'AND unliked_at IS NULL', [uid, pid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getUpvotes,
  addUpvote,
  getUpvote
};