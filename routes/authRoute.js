"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router
  .route("/register")
  .post(
    [
      body("username", "Min 3 characters, max 30 characters").trim().isLength({ min: 3, max: 30 }),
      body("email", "Email is not valid").trim().isEmail(),
      body(
        "password",
        `Password must match following requirements: 1 uppercase letter, minimum of 8 characters`
      ).matches("(?=.*[A-Z]).{8,}"),
    ],
    authController.register,
    authController.login
  );

module.exports = router;
