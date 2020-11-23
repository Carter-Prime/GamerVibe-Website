'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const app = express();
const passport = require('./utils/pass');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./production')(app, process.env.PORT);
} else {
  require('./localhost')(app, process.env.PORT);
}

// Routes
app.use(express.static('./frontend'));
app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', {session: false}), postRoute);