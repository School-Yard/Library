/**
 * Methods for using and responding to OAuth routes
 */

var passport = require('passport');

var OAuth = module.exports;

function error(req, res, err) {
  this.emit('error', { res: res, status: 400, message: err });
}

/**
 * OAuth Authorize Method
 *
 * Sends the user to the OAuth provider to authenticate with.
 */

OAuth.authorize = function authorize(req, res) {
  if(!req.session.passport.user) {
    passport.authenticate('txssc', { failureRedirect: '/' }).call(this, req, res, function() {
      // Never Gets Called, Passed off to the TxSSC SSO
    });
  }
  else {
    res.redirect('/admin');
  }
};

/**
 * OAuth Callback
 *
 * After an OAuth response this method will be called.
 */

OAuth.callback = function callback(req, res) {
  passport.authenticate('txssc', { failureRedirect: '/' }).call(this, req, res, function() {
    res.redirect('/admin');
  });
};

/**
 * OAuth Logout Function
 *
 * Destory the session
 */

OAuth.logout = function logout(req, res) {
  req.logout();
  res.redirect('/sessions/oauth/login');
};

/**
 * Login Page
 */

OAuth.login = function login(req, res) {
  res.render('login');
};