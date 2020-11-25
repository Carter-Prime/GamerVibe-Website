'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');

router.route('/').post([
  body('amount').trim().isNumeric(),
  body('beginTime').trim(),
], postController.get_n_posts);

module.exports = router;