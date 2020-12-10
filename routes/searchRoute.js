'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');


router.route('/user/:name').get(userController.get_users_by_name);
router.route('/tag/:tagname').get(postController.get_tags_by_name);
router.route('/tagname/:tagname').get(postController.get_posts_by_tag);
router.route('/username/:username').get(postController.get_posts_by_username);

module.exports = router;
