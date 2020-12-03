'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const passport = require('../utils/pass');
const passportOptions = {
  session: false,
};

router.route('/discover').post([
  body('amount').trim().isNumeric(),
  body('beginTime').trim(),
], postController.get_n_posts);

router.route('/home').post(
    passport.authenticate('jwt', passportOptions),
    [
        body('startId').
            if(body('startId').exists()).
            isNumeric()
    ],
    postController.getHomePosts
)

module.exports = router;