'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/jsonMessages');

// Make new post
const add_new_post = async (uid, caption, imgFilename) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Post(user_id, caption, imgfilename) VALUES(?,?,?)',
        [uid, caption, imgFilename],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get multiple posts that are not given users posts
// and are older than beginTime
const get_discover_posts = async (n, uid, beginId) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT p.post_id, p.user_id, p.caption, p.views, ' +
        'u.username, p.created_at, p.imgfilename, ' +
        '( ' +
        'SELECT count(*) ' +
        'FROM Upvote l ' +
        'WHERE p.post_id = l.post_id ' +
        'AND l.unliked_at IS NULL ' +
        ') Upvotes, ' +
        '( ' +
        'SELECT count(*) ' +
        'FROM Following f ' +
        'WHERE f.following_id = u.user_id ' +
        'AND f.canceled_At IS NULL ' +
        ') PosterFollowers, ' +
        '( ' +
        'SELECT count(*) ' +
        'FROM Blocking AS b ' +
        'WHERE b.blocking_id = u.user_id ' +
        'AND b.unblocked_at IS NULL ' +
        ') HiddenFrom ' +
        'FROM Post AS p, User AS u, Following AS f, Blocking AS b ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id != ? ' +
        'AND u.user_id = p.user_id ' +
        'AND u.private_acc = 0 ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND ( ' +
        'SELECT COUNT(*) ' +
        'FROM Blocking as b ' +
        'WHERE b.blocker_id = ? ' +
        'AND b.blocking_id = p.user_id ' +
        'AND b.unblocked_at IS NULL' +
        ') = 0 ' +
        'AND ( ' +
        'SELECT COUNT(*) ' +
        'FROM Following as f1 ' +
        'WHERE f1.follower_id = ? ' +
        'AND f1.following_id = p.user_id ' +
        'AND f1.canceled_at IS NULL ' +
        ') = 0 ' +
        'AND p.post_id < ? ' +
        'ORDER BY created_at DESC ' +
        'LIMIT ?', [uid, uid, uid, beginId, n],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Gets posts from users that user is following
const get_following_posts = async (uid, pid, amount) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, u.username, p.caption, p.imgfilename, ' +
        'p.created_at, p.deleted_at, p.banned_at, p.views, ' +
        'f.follower_id, f.following_id, f.canceled_at, ' +
        '( ' +
        'SELECT COUNT(*) ' +
        'FROM Upvote l ' +
        'WHERE p.post_id = l.post_id ' +
        'AND l.unliked_at IS NULL ' +
        ') Upvotes, ' +
        '( ' +
        'SELECT COUNT(*) ' +
        'FROM Following f ' +
        'WHERE f.following_id = u.user_id ' +
        'AND f.canceled_at IS NULL ' +
        ') PosterFollowers, ' +
        '( ' +
        'SELECT COUNT(*) ' +
        'FROM Blocking AS b ' +
        'WHERE b.blocking_id = u.user_id ' +
        'AND b.unblocked_at IS NULL ' +
        ') HiddenFrom ' +
        'FROM Post AS p ' +
        'INNER JOIN User AS u ' +
        'ON p.user_id = u.user_id ' +
        'LEFT JOIN Following AS f ' +
        'ON f.following_id = p.user_id ' +
        'WHERE f.follower_id = ? ' +
        'AND f.canceled_at IS NULL ' +
        'AND p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND p.post_id < ? ' +
        'ORDER BY p.created_at DESC ' +
        'LIMIT ?', [uid, pid, amount],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get single post with given id
const get_post = async (id) => {
  try {
    await add_view(id)
    const [rows] = await promisePool.execute(
        'SELECT p.post_id, p.user_id, u.username, ' +
        'p.caption, p.views, p.created_at, p.imgfilename ' +
        'FROM Post AS p, User AS u ' +
        'WHERE p.post_id = ? ' +
        'AND p.user_id = u.user_id ' +
        'AND p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL',
        [id]
    );
    return rows[0] ? rows[0] : errorJson('No posts found');
  } catch (e) {
    return errorJson(e.message);
  }
};

const add_view = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE Post SET views = views + 1 ' +
        'WHERE post_id = ? ' +
        'AND deleted_at IS NULL ' +
        'AND banned_at IS NULL', [id],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

const get_views = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT views ' +
        'WHERE post_id = ? ' +
        'AND deleted_at IS NULL ' +
        'AND banned_at IS NULL', [id],
    );
    return rows;
  } catch (e) {
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
    return rows['affectedRows'] === 0
        ? errorJson('No posts deleted')
        : messageJson('Post deleted successfully');
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get all posts by user
const get_posts_by_user = async (uid, pid, n) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT p.post_id, p.user_id, p.caption, u.username, ' +
        'p.created_at, p.imgfilename, p.deleted_at, p.banned_at, p.views, ' +
        '( ' +
        'SELECT count(post_id) ' +
        'FROM Upvote l ' +
        'WHERE p.post_id = l.post_id ' +
        'AND l.unliked_at IS NULL ' +
        ') Upvotes ' +
        'FROM Post AS p, User AS u, Following AS f, Blocking AS b ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id = p.user_id ' +
        'AND u.user_id = ? ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND p.post_id < ? ' +
        'ORDER BY created_at DESC ' +
        'LIMIT ? ',
        [uid, pid, n],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Only used when error happens when making thumbnail
const delete_temp_post = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM Post WHERE post_id = ?', [id]);
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Search tags with given tagname
const getTagsByName = async (tagname) => {
  try {
    const [rows] = await promisePool.execute(
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

// Get all posts by tag
const get_posts_by_tag = async (tagname) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT p.post_id, ' +
        'p.user_id, ' +
        'p.caption, ' +
        'u.username, ' +
        'p.created_at, ' +
        'p.imgfilename, ' +
        'p.deleted_at, ' +
        'p.banned_at, ' +
        'p.views, ' +
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
        'FROM Post AS p, ' +
        'User AS u, ' +
        'Following AS f, ' +
        'Blocking AS b, ' +
        'PostTag AS t ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id = p.user_id ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND u.private_acc = 0 ' +
        'AND p.post_id = t.post_id ' +
        'AND t.tag LIKE ? ' +
        'ORDER BY HiddenFrom ASC, Upvotes DESC; ',
        [tagname],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get all posts by username
const get_posts_by_username = async (username) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT p.post_id, ' +
        'p.user_id, ' +
        'p.caption, ' +
        'u.username, ' +
        'p.created_at, ' +
        'p.views, ' +
        'p.imgfilename, ' +
        'p.deleted_at, ' +
        'p.banned_at, ' +
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
        'FROM Post AS p, ' +
        'User AS u ' +
        'WHERE p.deleted_at IS NULL ' +
        'AND p.banned_at IS NULL ' +
        'AND u.user_id = p.user_id ' +
        'AND u.username LIKE ? ' +
        'AND u.private_acc = 0 ' +
        'AND u.deleted_at IS NULL ' +
        'AND u.banned_at IS NULL ' +
        'AND TIMESTAMPDIFF(SECOND, p.created_at, NOW()) > 0 ' +
        'ORDER BY created_at DESC ',
        [username],
    );
    return rows;
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
  get_posts_by_tag,
  get_posts_by_username,
  get_views,
};
