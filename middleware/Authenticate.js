/**
 * Authentication Middleware
 *
 * Uses Passport and the TxSSC Passport Strategy
 * to manage OAuth authentication with the TxSSC SSO.
 */

var passport = require('passport'),
    txsscStrategy = require('passport-txssc').Strategy;

module.exports = function authenticate() {

  return function(req, res) {

    if(!req.session.passport.user) {
      res.redirect('/sessions/oauth/login');
    }

    else {
      res.emit('next');
    }

  };

};