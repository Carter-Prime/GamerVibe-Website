'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const userModel = require('../models/usermodel');

// Local strategy for email/ password login
passport.use(new Strategy(async (email, password, done) => {
  const params = [email];
  try {
    // TODO: getUserLogin query
    // Get user from database
    const [user] = await userModel.getUserLogin(params);
    if (user === undefined) {
      // No user with given email found
      return done(null, false);
    }

    // Use bcrypt to compare passwords
    if (!bcrypt.compareSync(password, user.password)) {
      // Passwords don't match
      return done(null, false);
    }

    delete user.password; // Remove password property from user object
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
      return done(null, false, {message: 'Incorrect id'});
    }
    return done(null, {...jwtPayload}, {message: 'Logged in successfully'});
  } catch (e) {
    return done(e);
  }
}));

module.exports = passport;