'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const postsRoute = require('./routes/postsRoute');
const userRoute = require('./routes/userRoute');
const followRoute = require('./routes/followRoute');
const banRoute = require('./routes/banRoute');
const app = express();
const checks = require('./utils/checks');
const passport = require('./utils/pass');
const passportOptions = {
  session: false,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./production')(app, process.env.PORT);
} else {
  require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}

// Routes
app.use(express.static('./Public/')); // For webpage
app.use('/thumbnails', express.static('./thumbnails')); // For thumbnails
app.use('/uploads', express.static('./uploads')); // For full size images
app.use('/profile-pics', express.static('./profilePics')); // For profile images
app.use('/profile-thumbs', express.static('./profileThumbs')); // For profile thumbs
app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', passportOptions), postRoute);
app.use('/posts', postsRoute);
app.use('/user', passport.authenticate('jwt', passportOptions), userRoute);
app.use('/follow', passport.authenticate('jwt', passportOptions), followRoute);
app.use('/ban', passport.authenticate('jwt', passportOptions), banRoute);