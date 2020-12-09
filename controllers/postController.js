'use strict';
const postModel = require('../models/postModel');
const {errorJson} = require('../utils/jsonMessages');
const commentModel = require('../models/commentModel');
const postTagModel = require('../models/postTagModel');
const upvoteModel = require('../models/upvoteModel');
const moderatorModel = require('../models/moderatorModel');
const followModel = require('../models/followModel');
const {delete_file, make_thumbnail} = require('../utils/fileHandling');
const {clearWhitespaces} = require('../utils/checks');

// Make new post
const new_post = async (req, res) => {
  const thumbUrl = './thumbnails';
  const uploadUrl = './uploads';

  // Checks if image is missing
  if (!req.file) {
    return res.status(400).json(errorJson('Image must be JPEG or PNG'));
  }

  // Makes thumbnail
  const thumb = await make_thumbnail(req.file, thumbUrl);

  // If thumbnail return error
  if (thumb['error']) {
    delete_file(`${uploadUrl}/${req.file.filename}`);
    return res.status(400).json(thumb);
  }

  const caption = clearWhitespaces(req.body.caption)
  if(caption.length === 0) {
    delete_file(`${uploadUrl}/${req.file.filename}`);
    delete_file(`${thumbUrl}/${req.file.filename}`);
    return res.status(400).json(errorJson('You can\'t add empty caption'))
  }

  // Add new post to database
  const query = await postModel.add_new_post(
      req.user.user_id,
      req.body.caption,
      req.file.filename,
  );

  // If query return error
  if (query['error']) {
    delete_file(`${uploadUrl}/${req.file.filename}`);
    delete_file(`${thumbUrl}/${req.file.filename}`);
    return res.status(400).json(query);
  }

  // Add tags to posts
  if (req.body.tags) {
    for (let t of req.body.tags) {
      t = encodeURI(t.trim());
      await postTagModel.addTag(query['insertId'], t);
    }
  }

  // Everything went fine
  res.json(await postModel.get_post(query['insertId']));
};

// Get one post with id
const fetch_post = async (req, res) => {
  const postId = req.params.id;

  // Fetch post
  const post = await postModel.get_post(postId);

  // If error on content then send it to res
  if (post['error']) {
    return res.status(400).json(post);
  }

  const userId = req.user ?
      req.user.user_id :
      0;

  //User is not posted this post
  if (userId !== post.user_id) {
    const follow = await followModel.isFollowing(userId, post.user_id);
    const mod = await moderatorModel.getModerator(userId);

    // User is not following current user or user is not moderator
    if (follow['error'] && mod['error']) {
      return res.status(400).json(errorJson('No rights to view this post'));
    }
  }

  const featExtras = await add_extras_one_post(post);
  // Send post to res
  res.json(featExtras);
};

// Get discover posts
const get_discover_posts = async (req, res) => {
  const user = req.user;

  // Get posts from database
  const fetchedPosts = await postModel.get_discover_posts(
      req.body.amount,
      user ? user.user_id : 0,
      req.body.beginId ? req.body.beginId : Number.MAX_SAFE_INTEGER,
  );

  // If error when fetching posts, send it to res
  if (fetchedPosts['error']) {
    return res.status(400).json(fetchedPosts);
  }

  const featExtras = await get_extras(fetchedPosts);

  // Send posts to res
  res.json(featExtras);
};

// Delete post (set posts deleted at timestamp)
const delete_post = async (req, res) => {
  const user = req.user;

  // Get post with given id
  const post = await postModel.get_post(req.params.id);
  if (post['error']) {
    // Post not exists
    return res.status(400).json(post);
  }

  let allowed = true;

  if (post.user_id !== user.user_id) {
    // User is not posts original poster
    allowed = false;

    const mod = await moderatorModel.getModerator(user.user_id);
    if (!mod['error']) {
      // User is moderator
      allowed = true;
    }
  }

  if (!allowed) {
    // User is not allowed to delete post
    return res.status(400).
        json(errorJson('User don\'t have permission to delete this post'));
  }

  // User can delete post
  const query = await postModel.delete_post(req.params.id);
  return query['error'] ?
      res.status(400).json(query) :
      res.json(query);
};

// Get all posts by current user
const get_posts_by_userid = async (req, res) => {
  const posts = await postModel.getPostsByUserId(
      req.user.user_id,
      req.body.beginId ? req.body.beginId : Number.MAX_SAFE_INTEGER,
      req.body.amount ? req.body.amount : 30,
  );

  if (posts['error']) {
    return res.status(400).json(posts);
  }
  const featExtras = await get_extras(posts);

  res.json(featExtras);
};

// Get following posts
const get_following_posts = async (req, res) => {
  const user = req.user;
  const query = await postModel.get_following_posts(
      user.user_id,
      req.body.beginId ? req.body.beginId : Number.MAX_SAFE_INTEGER,
      req.body.amount ? req.body.amount : 30,
  );

  if (query['error']) {
    return res.status(400).json(query);
  }

  const featExtras = await get_extras(query);

  res.json(featExtras);
};

// Sets extras to list of posts
const get_extras = async (fetchedPosts) => {
  const posts = [];
  for (let i = 0; i < fetchedPosts.length; i++) {
    const post = fetchedPosts[i];
    posts.push(await add_extras_one_post(post));
  }
  return posts;
};

// Include all comments, tags and upvotes for every post
const add_extras_one_post = async (post) => {
  const postObj = {};
  postObj.content = post;
  postObj.comments = await commentModel.getPostComments(post.post_id);
  postObj.tags = await postTagModel.getTags(post.post_id);
  postObj.upvotes = await upvoteModel.getUpvotes(post.post_id);
  return postObj;
};

// Get tags list by tag name
const get_tags_by_name = async (req, res) => {
  const tagname = req.params.tagname;
  const tags = await postModel.getget_tags_by_name(`%${tagname}%`);
  res.json(tags);
};

// Get posts by tag name
const get_posts_by_tag = async (req, res) => {
  const tagname = req.params.tagname;
  const posts = await postModel.getPostsByTag(`${tagname}`);
  if (posts['error']) {
    return res.status(400).json(posts);
  }
  const featExtras = await get_extras(posts);
  res.json(featExtras);
};

// Get posts by username
const get_posts_by_username = async (req, res) => {
  const username = req.params.username;
  const posts = await postModel.getPostsByUsername(`${username}`);
  if (posts['error']) {
    return res.status(400).json(posts);
  }
  const featExtras = await get_extras(posts);
  res.json(featExtras);
};

module.exports = {
  new_post,
  fetch_post,
  delete_post,
  get_discover_posts,
  get_posts_by_userid,
  get_following_posts,
  get_tags_by_name,
  get_posts_by_tag,
  get_posts_by_username,
};
