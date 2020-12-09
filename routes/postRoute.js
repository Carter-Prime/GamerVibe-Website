'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const upload = multer({
  dest: './uploads',
  fileFilter: (req, file, cb) => {
    if (
        !file.mimetype.includes('jpg') &&
        !file.mimetype.includes('jpeg') &&
        !file.mimetype.includes('png')
    ) {
      return cb(null, false);
    }
    cb(null, true);
  },
});
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const upvoteController = require('../controllers/upvoteController');
const {userActive, checkBody} = require('../utils/customMiddlewares');

// Make new comment to post
router.route('/comment').post(
    [
      body('postId').trim().isInt(),
      body('content').trim().isLength({min: 1, max: 255}).escape(),
    ],
    commentController.add_comment,
);

// Add new upvote to post
router.route('/upvote').
    post([body('postId').trim().isInt()], upvoteController.addUpvote);

// Check if user is already upvoted post
router.route('/upvote/:id').
    get(
        checkBody,
        upvoteController.checkUpvote,
    );

// Make new post
router.route('/').
    post(
        userActive,
        upload.single('gameImage'), [
          body('caption').trim().notEmpty().isLength({max: 255}),
          body('tags').if(body('tags').exists()).isArray(),
        ], checkBody,
        postController.new_post,
    );

// Get post with id
// or delete it
router.route('/id/:id').
    get(
        userActive,
        postController.fetch_post).
    delete(
        userActive,
        postController.delete_post,
    );

module.exports = router;
