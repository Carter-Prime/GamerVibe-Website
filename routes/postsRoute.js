'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const passport = require('../utils/pass');
const passportOptions = {
  session: false,
};

router.route('/discover').post((req, res, next) => {
  // If user is logged in then attach user to req
  // In both cases still continue
  passport.authenticate('jwt', passportOptions, (err, user, info) => {
    if(user) {
      req.user = user
    }
    next()
  })(req, res, next)
},[
  body('amount').trim().isNumeric(),
  body('beginId').if(body('beginId').exists()).trim().isNumeric(),
], postController.get_discover_posts);

router.route('/home').post(
    passport.authenticate('jwt', passportOptions),
    [
        body('startId').
            if(body('startId').exists()).
            isNumeric(),
        body('amount').if(body('amount').exists()).
            isNumeric()
    ],
    postController.getHomePosts
)

module.exports = router;