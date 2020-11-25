'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

const add_new_post = async (uid, caption, imgFilename) => {
  // console.log('uid', uid)
  // console.log('caption', caption)
  // console.log('imgFilename', imgFilename)
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

const get_posts = async (n, uid, beginTime) => {
  try {
    console.log('n', n, 'beginTime', beginTime, 'uid', uid)
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, p.caption, p.created_at, p.imgfilename ' +
        'FROM Post AS p, User AS u ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id != ? ' +
        'AND u.user_id = p.user_id ' +
        'AND u.private_acc != 1 ' +
        'AND TIMESTAMPDIFF(SECOND, p.created_at, ?) > 0 ' +
        'ORDER BY p.created_at DESC ' +
        'LIMIT ?', [uid, beginTime, n],
    );
    // console.log('postModel get_posts rows', rows);
    return rows;
  } catch (e) {
    // console.log('postModel get_posts error', e.message);
    return errorJson(e.message);
  }
};

const get_post = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, p.caption, p.created_at, p.imgfilename FROM Post AS p ' +
        'WHERE post_id = ? ' +
        'AND deleted_at IS NULL ' +
        'AND banned_at IS NULL', [id],
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
  get_posts,
  delete_temp_post,
  delete_post,
};