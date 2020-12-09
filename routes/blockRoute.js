'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {userActive, checkBody} = require('../utils/customMiddlewares');
const blockingController = require('../controllers/blockingController');

router.route('/').
    get(
        userActive,
        blockingController.get_blocked_users_by_user,
    ).
    put(
        userActive, [
          body('blockedId').trim().isInt(),
        ], checkBody,
        blockingController.block_user).
    delete(
        userActive, [
          body('blockedId').trim().isInt(),
        ], checkBody,
        blockingController.unblock_user);

module.exports = router;