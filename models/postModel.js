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
        'SELECT DISTINCT p.post_id, p.user_id, p.caption, u.username, p.created_at, p.imgfilename, p.deleted_at, p.banned_at, ' +
        '( ' +
        'SELECT count(post_id) ' +
        'FROM Upvote l ' +
        'WHERE p.post_id = l.post_id ' +
        'AND l.unliked_at IS NULL ' +
        ') Upvotes, ' +
        '( ' +
        'SELECT count(approved) ' +
        'FROM Following f ' +
        'WHERE f.following_id = u.user_id ' +
        'AND f.approved = 1 ' +
        ') PosterFollowers, ' +
        '( ' +
        'SELECT count(blocked_at) ' +
        'FROM Blocking AS b ' +
        'WHERE b.blocking_id = u.user_id ' +
        ') HiddenFrom ' +
        'FROM Post AS p, User AS u, Following AS f, Blocking AS b ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id != ? ' +
        'AND u.user_id = p.user_id ' +
        'AND ' +
        '( ' +
        'u.private_acc = 0 ' +
        ') ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND NOT ' +
        '( ' +
        'b.blocker_id = ? ' +
        'AND b.blocking_id = u.user_id ' +
        'AND b.unblocked_at IS NULL ' +
        ') ' +
        'AND p.post_id < ? ' +
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

const get_following_posts = async (uid, pid, amount) => {
  // console.log('uid', uid, 'pid', pid, 'amount', amount);
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT p.post_id, p.user_id, p.caption, u.username, p.created_at, p.imgfilename, p.deleted_at, p.banned_at, ' +
        '( ' +
        'SELECT count(post_id) ' +
        'FROM Upvote l ' +
        'WHERE p.post_id = l.post_id ' +
        'AND l.unliked_at IS NULL ' +
        ') Upvotes, ' +
        '( ' +
        'SELECT count(approved) ' +
        'FROM Following f ' +
        'WHERE f.following_id = u.user_id ' +
        'AND f.approved = 1 ' +
        ') PosterFollowers, ' +
        '( ' +
        'SELECT count(blocked_at) ' +
        'FROM Blocking AS b ' +
        'WHERE b.blocking_id = u.user_id ' +
        ') HiddenFrom ' +
        'FROM Post AS p, User AS u, Following AS f, Blocking AS b ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id = p.user_id ' +
        'AND u.user_id != ? ' +
        'AND ( ' +
        'f.follower_id = ? ' +
        'AND f.following_id = u.user_id ' +
        'AND f.approved = 1 ' +
        'AND ( ' +
        'u.private_acc = 0 ' +
        'OR u.private_acc = 1 ' +
        ') ' +
        ') ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND NOT ( ' +
        'b.blocker_id = ? ' +
        'AND b.blocking_id = u.user_id ' +
        'AND b.unblocked_at IS NULL ' +
        ') ' +
        'AND p.post_id < ? ' +
        'ORDER BY created_at DESC ' +
        'LIMIT ?', [uid, uid, uid, pid, amount],
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
        'SELECT DISTINCT t.tag ' +
        'FROM PostTag AS t ' +
        'WHERE (t.tag LIKE ?)' +
        'AND t.untagged_at IS NULL ',
        [tagname],
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
  get_following_posts,
  getTagsByName,
};