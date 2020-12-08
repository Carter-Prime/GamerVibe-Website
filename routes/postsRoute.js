'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const passport = require('../utils/pass');
const passportOptions = {
  session: false,
};

// Gets discover posts
router.route('/discover').post((req, res, next) => {
  // If user is logged in then attach user to req
  // In both cases still continue
  passport.authenticate('jwt', passportOptions, (err, user, info) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
}, [
  body('amount').trim().isInt(),
  body('beginId').if(body('beginId').exists()).trim().isInt(),
], postController.get_discover_posts);

// Get posts from users that user is following
router.route('/following').post(
    passport.authenticate('jwt', passportOptions),
    [
      body('beginId').
          if(body('beginId').exists()).
          isInt(),
      body('amount').if(body('amount').exists()).
          isInt(),
    ],
    postController.getFollowingPosts,
);

// Get posts from current user
router.route('/feed').post(
    passport.authenticate('jwt', passportOptions),
    [
      body('beginId').
          if(body('beginId').exists()).
          isInt(),
      body('amount').if(body('amount').exists()).
          isInt(),
    ],
    postController.getPostsByUser,
);

module.exports = router;