'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const passport = require('../utils/pass');
const passportOptions = {
  session: false,
};
const {userActive, checkBody} = require('../utils/customMiddlewares');

// Gets discover posts
router.route('/discover').
    post(
        (req, res, next) => {
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
        ],
        checkBody,
        postController.get_discover_posts,
    );

// Get posts from users that user is following
router.route('/following').post(
    passport.authenticate('jwt', passportOptions),
    userActive, [
      body('beginId').
          if(body('beginId').exists()).
          isInt(),
      body('amount').if(body('amount').exists()).
          isInt(),
    ], checkBody,
    postController.get_following_posts,
);

// Get posts from current user
router.route('/feed').post(
    passport.authenticate('jwt', passportOptions),
    userActive, [
      body('beginId').
          if(body('beginId').exists()).
          isInt(),
      body('amount').if(body('amount').exists()).
          isInt(),
    ], checkBody,
    postController.get_posts_by_userid,
);

module.exports = router;