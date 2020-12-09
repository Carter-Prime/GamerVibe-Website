'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const likeController = require('../controllers/upvoteController');
const {userActive, checkBody, isPost} = require('../utils/customMiddlewares');

router.route('/').
    post(
        userActive, [
          body('postId').trim().isInt(),
        ], checkBody,
        isPost,
        likeController.addUpvote,
    );

module.exports = router;