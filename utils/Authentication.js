/**
 * Authentication Library
 *
 * Uses Passport and the TxSSC Passport Strategy
 * to manage OAuth authentication with the TxSSC SSO.
 */

var passport = require('passport'),
    txsscStrategy = require('passport-txssc').Strategy;

module.exports = function(options) {
  var UserModel = require('../models/User'),
      User = new UserModel(options);

  // Use the TxSSC Strategy within Passport.
  passport.use(
    new txsscStrategy({
      clientID: process.env.CONSUMER_KEY,
      clientSecret: process.env.CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      var sessionData;

      User.authorize(accessToken, refreshToken, profile, function(err, user) {
        if(err) return done(err);

        sessionData = {
          id: user.id,
          token: accessToken,
          name: user.name,
          role: user.role,
          avatar: user.avatar || ''
        };

        return done(null, sessionData);
      });
    })
  );
};