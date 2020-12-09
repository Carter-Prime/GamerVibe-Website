'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.route('/user/:name').get(userController.update_user_by_name);
router.route('/tagname/:tagname').get(postController.tagsByName);
router.route('/tag/:tagname').get(postController.getPostsByTag);
router.route('/username/:username').get(postController.getPostsByUsername);

module.exports = router;
