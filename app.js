'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const followingRoute = require('./routes/followingRoute');
const app = express();
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
app.use(express.static('./frontend/')); // For webpage
app.use('/thumbnails', express.static('./thumbnails')); // For thumbnails
app.use('/uploads', express.static('./uploads')); // For full size images
app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', passportOptions), postRoute);
app.use('/user', passport.authenticate('jwt', passportOptions), userRoute);
app.use('/following', passport.authenticate('jwt', passportOptions),
    followingRoute);