'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

// Make new post
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

// Get multiple posts that are not given users posts
// and are older than beginTime
const get_discover_posts = async (n, uid, beginId) => {
  try {
    // console.log('n', n, 'beginId', beginId, 'uid', uid)
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, u.username, p.caption, p.created_at, p.imgfilename ' +
        'FROM Post AS p ' +
        'LEFT JOIN User AS u ' +
        'ON u.user_id = p.user_id ' +
        'LEFT JOIN Blocking AS b ' +
        'ON b.blocker_id = ? ' +
        'AND b.blocking_id = p.user_id ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id != ? ' +
        'AND u.private_acc != 1 ' +
        'AND u.banned_at IS NULL ' +
        'AND b.blocked_at IS NULL ' +
        'AND p.post_id < ?' +
        'ORDER BY created_at DESC ' +
        'LIMIT ?', [uid, uid, beginId, n],
    );
    // console.log('postModel get_posts rows', rows);
    return rows;
  } catch (e) {
    // console.log('postModel get_posts error', e.message);
    return errorJson(e.message);
  }
};

const get_home_posts = async (uid, pid, amount) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, u.username, p.caption, p.created_at, p.imgfilename ' +
        'FROM Post AS p ' +
        'LEFT JOIN User AS u ' +
        'ON u.user_id = p.user_id ' +
        'LEFT JOIN Following AS f ' +
        'ON f.follower_id = ? ' +
        'AND f.following_id = p.user_id ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id != ? ' +
        'AND u.banned_at IS NULL ' +
        'AND f.approved = 1 ' +
        'AND p.post_id < ? ' +
        'ORDER BY created_at DESC ' +
        'LIMIT ?', [uid, uid, pid, amount],
    );
    return rows;
  } catch (e) {
    // console.error('postModel get_home_posts error', e.message);
    return errorJson(e.message);
  }
};

// Get single post with given id
const get_post = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, u.username, p.caption, p.created_at, p.imgfilename ' +
        'FROM Post AS p, User AS u ' +
        'WHERE p.post_id = ? ' +
        'AND p.user_id = u.user_id ' +
        'AND p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL', [id],
    );
    return rows[0] ? rows[0] : errorJson('No posts found');
  } catch (e) {
    // console.error('postModel get_post error', e.message);
    return errorJson(e.message);
  }
};

// Set posts deleted_at property
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

// Get all posts by user
const get_posts_by_user = async (uid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.caption, p.created_at, p.imgfilename ' +
        'FROM Post AS p ' +
        'WHERE user_id = ? ' +
        'AND deleted_at IS NULL ' +
        'AND banned_at IS NULL', [uid],
    );
    // console.log('postModel get_posts_by_user rows', rows)
    return rows;
  } catch (e) {
    // console.error('postModel get_posts_by_user error', e.message);
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

// Search tags with given tagname
const getTagsByName = async (tagname) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT t.post_id, t.tag, t.tagged_at, t.untagged_at " +
        "FROM PostTag AS t " +
        "WHERE (tag LIKE ?)" +
        "AND untagged_at IS NULL ",
      [tagname]
    );
    return rows ? [...rows] : errorJson(`No users found with name: ${tagname}`);
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  add_new_post,
  get_post,
  get_discover_posts,
  delete_temp_post,
  delete_post,
  get_posts_by_user,
  get_home_posts,
  getTagsByName,
};