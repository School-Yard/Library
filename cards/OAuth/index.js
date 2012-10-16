/**
 * OAuth Card
 *
 * Handles OAuth Authentication with the TxSSC SSO system.
 */

var consolidate = require('consolidate'),
    OAuth = require('./controllers/oauth');

module.exports = {
  'name': 'OAuth',
  'slug': 'oauth',

  'engine': ['ejs', consolidate.ejs],
  'templates': __dirname + '/templates',

  'router': {
    'get': {
      '/authorize': OAuth.authorize,
      '/callback': OAuth.callback,
      '/logout': OAuth.logout,
      '/login': OAuth.login
    }
  },

  'static': __dirname + '/public'
};