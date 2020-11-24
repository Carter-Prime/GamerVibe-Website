'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const {delay} = require('./delay');
const {messageJson} = require('./json_messages');

// Local strategy for email/ password login
passport.use(new Strategy({
  usernameField: 'email',
}, async (email, password, done) => {
  try {
    // Get user from database
    const [user] = await userModel.getUserLogin(email);
    // console.log('pass local user', user);

    if (user === undefined) {
      // No user with given email found
      await delay(Math.random() * 1000);
      return done(null, false);
    }

    // Use bcrypt to compare passwords
    if (!await bcrypt.compare(password, user.passwd)) {
      // Passwords don't match
      return done(null, false);
    }

    delete user.passwd; // Remove password property from user object
    return done(null, {...user});
  } catch (e) {
    return done(e);
  }
}));

// JWT strategy for bearer token
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
}, async (jwtPayload, done) => {
  try {
    // console.log('util pass JWT', jwtPayload)
    if (jwtPayload === undefined) {
      return done(null, false, messageJson('Incorrect id'));
    }
    return done(null, {...jwtPayload}, messageJson('Logged in successfully'));
  } catch (e) {
    return done(e);
  }
}));

module.exports = passport;