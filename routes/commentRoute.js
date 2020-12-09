'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const commentController = require('../controllers/commentController');
const {userActive, checkBody, isPost} = require('../utils/customMiddlewares');

router.route('/').
    post(
        userActive, [
          body('postId').trim().isInt(),
          body('content').trim().isLength({min: 1, max: 255}).escape(),
        ], checkBody,
        isPost,
        commentController.add_comment,
    );

module.exports = router;