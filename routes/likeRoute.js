'use strict'
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const likeController = require('../controllers/upvoteController')

router.route('/').post([
    body('postId').trim().isNumeric()
], likeController.addLike)

module.exports = router