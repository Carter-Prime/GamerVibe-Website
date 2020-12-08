'use strict'
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const followController = require('../controllers/followController');

router.route('/').post([
  body('user').trim().isInt()
], followController.followUser).
    delete([
      body('user').trim().isInt()
    ], followController.unfollowUser)

// Check if user is following given user
router.route('/:id').get(followController.isFollowingUserId)

module.exports = router