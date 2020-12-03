'use strict'
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const commentController = require('../controllers/commentController')

router.route('/').post([
    body('postId').trim().isNumeric(),
    body('content').trim().isLength({min: 1, max: 255}).escape()
], commentController.addComment)

module.exports = router