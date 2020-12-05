'use strict';
const express = require('express');
const router = express.Router();
const blockingController = require('../controllers/blockingController');

router.route('/').get(blockingController.get_blocked_users_by_user)

module.exports = router