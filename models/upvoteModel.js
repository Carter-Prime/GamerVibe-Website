'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

// Get all upvotes for given post
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

const add_upvote = async (uid, pid) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Upvote(user_id, post_id) ' +
        'VALUES(?,?)', [uid, pid],
    );
    // console.log('upvoteModel add_upvote rows', rows);
    return rows;
  } catch (e) {
    // console.error('upvoteModel add_upvote error', e.message);
    return errorJson(e.message);
  }
};

const get_upvote = async (uid, pid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Upvote ' +
        'WHERE user_id = ? ' +
        'AND post_id = ? ' +
        'AND unliked_at IS NULL', [uid, pid],
    );
    // console.log('upvoteModel add_upvote rows', rows);
    return rows;
  } catch (e) {
    // console.error('upvoteModel add_upvote error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  get_upvotes,
  add_upvote,
  get_upvote
};