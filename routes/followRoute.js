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
        followController.followUser).
    delete(
        userActive, [
          body('user').trim().isInt(),
        ], checkBody,
        followController.unfollowUser);

// Check if user is following given user
router.route('/:id').
    get(
        userActive,
        followController.isFollowingUserId,
    );

module.exports = router;