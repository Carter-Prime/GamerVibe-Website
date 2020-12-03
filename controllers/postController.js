'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const {errorJson} = require('../utils/json_messages');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentModel');
const postTagModel = require('../models/postTagModel');
const upvoteModel = require('../models/upvoteModel');
const moderatorModel = require('../models/moderatorModel');
const {delete_file, make_thumbnail} = require('../utils/my_random_stuff');

// Make new post
const new_post = async (req, res) => {
  // console.log('postController new_post body', req.body);
  // console.log('postController new_post file', req.file);
  // console.log('postController new_post user', req.user);

  // Checks if image is missing
  if (!req.file) {
    return res.status(400).json(errorJson('Image must be JPEG or PNG'));
  }

  // Checks for validation errors
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Check if user exists
  const user = await userModel.getUser(req.user.user_id);
  // console.log('user', user);
  if (user['error']) {
    // User query returns error
    return res.status(400).json(errorJson('Something went wrong'));
  }

  // Makes thumbnail
  const thumb = await make_thumbnail(req.file, './thumbnails');
  // console.log('postController new_post thumb', thumb);

  // If thumbnail return error
  if (thumb['error']) {
    delete_file(`./uploads/${req.file.filename}`);
    return res.status(400).json(thumb);
  }

  // Add new post to database
  const query = await postModel.add_new_post(req.user.user_id, req.body.caption,
      req.file.filename);

  // If query return error
  if (query['error']) {
    delete_file(`./uploads/${req.file.filename}`);
    delete_file(`./thumbnails/${req.file.filename}`);
    return res.status(400).json(query);
  }

  // Add tags to posts
  if (req.body.tags) {
    for (let t of req.body.tags) {
      // console.log('postController new_post tag', t);
      t = encodeURI(t.trim());
      await postTagModel.add_tag(query['insertId'], t);
    }
  }

  // Everything went fine
  res.json(await postModel.get_post(query['insertId']));
};

// Get one post with id
const fetch_post = async (req, res) => {
  const post = {};
  const postId = req.params.id;

  // Fetch post
  const content = await postModel.get_post(postId);
  // console.log('postController fetch_post content', content);

  // If error on content then send it to res
  if (content['error']) {
    return res.status(400).json(content);
  }

  // TODO: user can only get post if moderator or user is allowed to see that
  const user = req.user;

  // Include all comments, tags and upvotes for that post
  post.content = content;
  post.comments = await commentModel.get_post_comments(postId);
  post.tags = await postTagModel.get_tags(postId);
  post.upvotes = await upvoteModel.get_upvotes(postId);

  // Send post to res
  res.json(post);
};

// Get n amount of posts
const get_n_posts = async (req, res) => {
  // console.log('postController get_n_posts body', req.body);

  // Check validation results
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']));
  }

  // Parse timestamp from body
  let time = Date.parse(req.body.beginTime);
  // console.log('postController get_n_posts time', time);
  if (isNaN(time)) {
    const date = new Date();
    // console.log('date', date)
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    // console.log('date', date)
    time = date.toISOString().replace('T', ' ').replace('Z', '');
  } else {
    time = new Date(req.body.beginTime).toISOString().
        replace('T', ' ').
        replace('Z', '');
  }
  // console.log('postController get_n_posts time', time);

  // Get posts from database
  const fetchedPosts = await postModel.get_posts(
      req.body.amount,
      req.user ? req.user.user_id : 0,
      time,
  );
  // console.log('postController get_n_posts posts', posts)

  // If error when fetching posts, send it to res
  if (fetchedPosts['error']) {
    return res.status(400).json(fetchedPosts);
  }

  const posts = [];
  for (let i = 0; i < fetchedPosts.length; i++) {
    const post = fetchedPosts[i];
    // console.log('post', post, 'index', i)
    const postObj = {};

    // Include all comments, tags and upvotes for every post
    postObj.content = post;
    postObj.comments = await commentModel.get_post_comments(post.post_id);
    postObj.tags = await postTagModel.get_tags(post.post_id);
    postObj.upvotes = await upvoteModel.get_upvotes(post.post_id);
    posts.push(postObj);
  }

  // Send posts to res
  res.json(posts);
};

// Delete post (set posts deleted at timestamp)
const delete_post = async (req, res) => {
  const user = req.user;
  // console.log('postController delete_post user', user)

  // Get post with given id
  const post = await postModel.get_post(req.params.id);
  // console.log('postController delete_post post', post);

  let allowed = true;

  if (post['error']) {
    // Post not exists
    return res.status(400).json(post);
  }

  if (post.user_id !== user.user_id) {
    // User is not posts original poster
    allowed = false;

    const mod = await moderatorModel.get_mod(user.user_id);
    // console.log('postController delete_post mod', mod)

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
const getPostsByUser = async (req, res) => {
  const user = req.user;
  const posts = await postModel.get_posts_by_user(user.user_id);

  if (posts['error']) {
    return res.status(400).json(posts);
  }

  res.json(posts);
};

const getHomePosts = async (req, res) => {
  const valRes = validationResult(req)
  if(!valRes.isEmpty()) {
    return res.status(400).json(errorJson(valRes['errors']))
  }

  const user = req.user;
  const query = await postModel.get_home_posts(
      user.user_id,
      req.body.startId ? req.body.startId : Number.MAX_SAFE_INTEGER
  )
  res.json(query)
};

module.exports = {
  new_post,
  fetch_post,
  delete_post,
  get_n_posts,
  getPostsByUser,
  getHomePosts,
};