"use strict";
const postModel = require("../models/postModel");
const { validationResult } = require("express-validator");
const { errorJson } = require("../utils/json_messages");
const userModel = require("../models/userModel");
const commentModel = require("../models/commentModel");
const postTagModel = require("../models/postTagModel");
const upvoteModel = require("../models/upvoteModel");
const moderatorModel = require("../models/moderatorModel");
const followModel = require("../models/followModel");
const { delete_file, make_thumbnail } = require("../utils/my_random_stuff");
const checks = require("../utils/checks");

// Make new post
const new_post = async (req, res) => {
  // Checks if image is missing
  if (!req.file) {
    return res.status(400).json(errorJson("Image must be JPEG or PNG"));
  }

  // Checks for validation errors
  if (checks.hasBodyErrors(req, res)) return;

  // Check if user exists
  const user = await userModel.getUser(req.user.user_id);
  if (user["error"]) {
    // User query returns error
    return res.status(400).json(errorJson("Something went wrong"));
  }

  // Makes thumbnail
  const thumb = await make_thumbnail(req.file, "./thumbnails");

  // If thumbnail return error
  if (thumb["error"]) {
    delete_file(`./uploads/${req.file.filename}`);
    return res.status(400).json(thumb);
  }

  // Add new post to database
  const query = await postModel.add_new_post(
    req.user.user_id,
    req.body.caption,
    req.file.filename
  );

  // If query return error
  if (query["error"]) {
    delete_file(`./uploads/${req.file.filename}`);
    delete_file(`./thumbnails/${req.file.filename}`);
    return res.status(400).json(query);
  }

  // Add tags to posts
  if (req.body.tags) {
    for (let t of req.body.tags) {
      t = encodeURI(t.trim());
      await postTagModel.add_tag(query["insertId"], t);
    }
  }

  // Everything went fine
  res.json(await postModel.get_post(query["insertId"]));
};

// Get one post with id
const fetch_post = async (req, res) => {
  const postId = req.params.id;

  // Fetch post
  const post = await postModel.get_post(postId);

  // If error on content then send it to res
  if (post["error"]) {
    return res.status(400).json(post);
  }

  const user = req.user;

  //User is not posted this post
  if (user.user_id !== post.user_id) {
    const follow = await followModel.is_following(user.user_id, post.user_id);
    const mod = await moderatorModel.get_mod(user.user_id);

    // User is not following current user or user is not moderator
    if (follow["error"] && mod["error"]) {
      return res.status(400).json(errorJson("No rights to view this post"));
    }
  }

  const featExtras = await add_extras_one_post(post);
  // Send post to res
  res.json(featExtras);
};

// Get n amount of posts
const get_n_posts = async (req, res) => {
  // Check validation results
  if (checks.hasBodyErrors(req, res)) return;

  // TODO: delet this
  // Parse timestamp from body
  let time = Date.parse(req.body.beginTime);
  if (isNaN(time)) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    time = date.toISOString().replace("T", " ").replace("Z", "");
  } else {
    time = new Date(req.body.beginTime)
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
  }

  // Get posts from database
  const fetchedPosts = await postModel.get_posts(
    req.body.amount,
    req.user ? req.user.user_id : 0,
    time
  );

  // If error when fetching posts, send it to res
  if (fetchedPosts["error"]) {
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
  if (post["error"]) {
    // Post not exists
    return res.status(400).json(post);
  }

  let allowed = true;

  if (post.user_id !== user.user_id) {
    // User is not posts original poster
    allowed = false;

    const mod = await moderatorModel.get_mod(user.user_id);
    if (!mod["error"]) {
      // User is moderator
      allowed = true;
    }
  }

  if (!allowed) {
    // User is not allowed to delete post
    return res
      .status(400)
      .json(errorJson("User don't have permission to delete this post"));
  }

  // User can delete post
  const query = await postModel.delete_post(req.params.id);
  return query["error"] ? res.status(400).json(query) : res.json(query);
};

// Get all posts by current user
const getPostsByUser = async (req, res) => {
  const user = req.user;
  const posts = await postModel.get_posts_by_user(user.user_id);

  if (posts["error"]) {
    return res.status(400).json(posts);
  }

  res.json(posts);
};

const getHomePosts = async (req, res) => {
  if (checks.hasBodyErrors(req, res)) return;

  const user = req.user;
  const query = await postModel.get_home_posts(
    user.user_id,
    req.body.startId ? req.body.startId : Number.MAX_SAFE_INTEGER,
    req.body.amount ? req.body.amount : 30
  );

  const featExtras = await get_extras(query);

  res.json(featExtras);
};

const get_extras = async (fetchedPosts) => {
  const posts = [];
  for (let i = 0; i < fetchedPosts.length; i++) {
    const post = fetchedPosts[i];
    posts.push(await add_extras_one_post(post));
  }
  return posts;
};

const add_extras_one_post = async (post) => {
  const postObj = {};

  // Include all comments, tags and upvotes for every post
  postObj.content = post;
  postObj.comments = await commentModel.get_post_comments(post.post_id);
  postObj.tags = await postTagModel.get_tags(post.post_id);
  postObj.upvotes = await upvoteModel.get_upvotes(post.post_id);
  return postObj;
};

// Get tags list by tag name
const tagsByName = async (req, res) => {
  const tagname = req.params.tagname;
  const tags = await postModel.getTagsByName(`%${tagname}%`);
  res.json(tags);
};

module.exports = {
  new_post,
  fetch_post,
  delete_post,
  get_n_posts,
  getPostsByUser,
  getHomePosts,
  tagsByName,
};
