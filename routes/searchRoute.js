"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

router
  .route("/user/:name")
  .get(
    [body("name").trim().isLength({ max: 255 }).escape()],
    userController.usersByName
  );

router
  .route("/tagname/:tagname")
  .get(
    [body("tagname").trim().isLength({ max: 100 }).escape()],
    postController.tagsByName
  );

router.route("/tag/:tagname").get(postController.getPostsByTag);
router.route("/username/:username").get(postController.getPostsByUsername);

module.exports = router;
