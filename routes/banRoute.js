'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const banController = require('../controllers/banController');

router.route('/').put([
    body('bannedId').trim().isNumeric(),
    body('reason').trim().isLength({min: 1, max: 255}).escape()
], banController.ban_user)

module.exports = router