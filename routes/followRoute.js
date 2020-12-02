'use strict'
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const followController = require('../controllers/followController');

router.route('/').post([
  body('user').trim().isNumeric()
], followController.followUser)

module.exports = router