'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

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
        'SELECT * FROM Post WHERE post_id = ?', [id],
    );
    return rows[0] ? {...rows[0]} : errorJson('No posts found');
  } catch (e) {
    // console.error('postModel get_post error', e.message);
    return errorJson(e.message);
  }
};

const delete_post = async (id) => {
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
  delete_post,
};