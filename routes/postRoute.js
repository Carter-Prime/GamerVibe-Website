"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const multer = require("multer");
const upload = multer({
  dest: "./uploads",
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.includes("jpg") &&
      !file.mimetype.includes("jpeg") &&
      !file.mimetype.includes("png")
    ) {
      return cb(null, false);
    }
    cb(null, true);
  },
});
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const upvoteController = require("../controllers/upvoteController");

router
  .route("/comment")
  .post(
    [
      body("postId").trim().isNumeric(),
      body("content").trim().isLength({ min: 1, max: 255 }).escape(),
    ],
    commentController.addComment
  );

router
  .route("/upvote")
  .post([body("postId").trim().isNumeric()], upvoteController.addUpvote);

router.route('/upvote/:id').get(upvoteController.checkUpvote)

router
  .route("/")
  .post(
    upload.single("gameImage"),
    [
      body("caption").trim().notEmpty().isLength({ max: 255 }),
      body("tags").if(body("tags").exists()).isArray(),
    ],
    postController.new_post
  );

router
  .route("/id/:id")
  .get(postController.fetch_post)
  .delete(postController.delete_post);

router.route("/search/tag/:tagname").get(postController.tagsByName);

module.exports = router;
