"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const followController = require("../controllers/followController");
const postController = require("../controllers/postController");
const { body } = require("express-validator");
const multer = require("multer");
const upload = multer({
  dest: "./profilePics",
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

router.route("/").put(
  upload.single("profilePic"),
  [
    body("fname")
      .if(body("fname").exists())
      .trim()
      .isLength({ max: 50 })
      .escape(),
    body("lname")
      .if(body("lname").exists())
      .trim()
      .isLength({ max: 50 })
      .escape(),
    //If discord field exists and it's not empty, then check if it's valid
    body("discord")
      .if(body("discord").exists().notEmpty())
      .trim()
      .isLength({ max: 100 })
      .isURL()
      .escape(),
    //If youtube field exists and it's not empty, then check if it's valid
    body("youtube")
      .if(body("youtube").exists().notEmpty())
      .trim()
      .isLength({ max: 100 })
      .isURL()
      .escape(),
    //If twitch field exists and it's not empty, then check if it's valid
    body("twitch")
      .if(body("twitch").exists().notEmpty())
      .trim()
      .isLength({ max: 100 })
      .isURL()
      .escape(),
    body("private")
      .if(body("private").exists().notEmpty())
      .custom((val) => val === "1" || val === "0"),
  ],
  userController.updateUser
);

router.route("/id/:id").get(userController.getUser);
router.route("/following").get(followController.getFollowing);
router.route("/followers").get(followController.getFollowers);
router.route("/posts").get(postController.getPostsByUser);

module.exports = router;
