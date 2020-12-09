'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const followController = require('../controllers/followController');
const {userActive, checkBody} = require('../utils/customMiddlewares');

router.route('/').
    post(
        userActive, [
          body('user').trim().isInt(),
        ], checkBody,
        followController.follow_user).
    delete(
        userActive, [
          body('user').trim().isInt(),
        ], checkBody,
        followController.unfollow_user);

// Check if user is following given user
router.route('/:id').
    get(
        userActive,
        followController.is_following_user_id,
    );

module.exports = router;