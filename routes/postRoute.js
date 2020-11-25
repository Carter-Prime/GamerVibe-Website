'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const upload = multer({
  dest: './uploads',
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('jpg') &&
        !file.mimetype.includes('jpeg') &&
        !file.mimetype.includes('png')) {
      return cb(null, false);
    }
    cb(null, true);
  },
});
const postController = require('../controllers/postController');

router.route('/').post(upload.single('gameImage'), [
  body('caption').trim().notEmpty().isLength({max: 255}),
], postController.new_post);

router.route('/:id')
  .get(postController.fetch_post)
  .delete(postController.delete_post);

module.exports = router;