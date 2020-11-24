"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const followingRoute = require("./routes/followingRoute");

const app = express();
const passport = require("./utils/pass");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production") {
  require("./production")(app, process.env.PORT);
} else {
  require("./localhost")(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}

// Routes
app.use(express.static("./Public")); // For webpage
app.use("/thumbnails", express.static("./thumbnails")); // For thumbnails
app.use("/auth", authRoute);
app.use("/post", passport.authenticate("jwt", { session: false }), postRoute);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/following", passport.authenticate("jwt", { session: false }), followingRoute);
