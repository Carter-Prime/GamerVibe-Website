'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const banController = require('../controllers/banController');
const {userActive, checkBody} = require('../utils/customMiddlewares');

// Ban user
// or remove ban from user
router.route('/').
    get(banController.isBanned).
    put(
        userActive, [
          body('bannedId').trim().isInt(),
          body('reason').trim().isLength({min: 1, max: 255}).escape(),
        ], checkBody,
        banController.ban_user).
    delete(
        userActive, [
          body('bannedId').trim().isInt(),
        ], checkBody,
        banController.unban_user);

module.exports = router;