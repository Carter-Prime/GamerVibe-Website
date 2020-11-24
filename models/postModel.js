'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

const add_new_post = async (uid, caption, imgFilename) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Post(user_id, caption, imgfilename) VALUES(?,?,?)',
        [uid, caption, imgFilename]);
    return rows;
  } catch (e) {
    // console.error('postModel add_new_post error', e.message);
    return errorJson(e.message);
  }
};

const get_post = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Post WHERE post_id = ? AND deleted_at IS NULL', [id],
    );
    return rows[0] ? rows[0] : errorJson('No posts found');
  } catch (e) {
    // console.error('postModel get_post error', e.message);
    return errorJson(e.message);
  }
};

const delete_post = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE Post SET deleted_at = NOW() WHERE post_id = ? AND deleted_at IS NULL',
        [id],
    );
    // console.log('postModel delete_post rows', rows)
    return rows['affectedRows'] === 0 ?
        errorJson('No posts deleted') :
        messageJson('Post deleted successfully');
  } catch (e) {
    // console.error('postModel delete_post error', e.message);
    return errorJson(e.message);
  }
};

// Only used when error happens when making thumbnail
const delete_temp_post = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM Post WHERE post_id = ?', [id],
    );
    // console.log('postModel delete_post rows', rows);
    return rows;
  } catch (e) {
    // console.error('postModel delete_post error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  add_new_post,
  get_post,
  delete_temp_post,
  delete_post,
};