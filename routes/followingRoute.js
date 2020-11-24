'use strict';
const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

router.route('/').get(followController.getFollowing);

module.exports = router;