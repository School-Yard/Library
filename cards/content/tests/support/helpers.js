var TK = require('trapperkeeper'),
    Helpers = module.exports = exports;


Helpers.MockConnection = function(cb) {
  var self = this;
  this._resource = TK.connect('mongodb', 'mongodb://127.0.0.1', 27017, {database: 'library_testing'});
  this._resource.on('ready', function() {
    return cb({
      adapter: {
        mongo: self._resource
      }
    });
  });
};

Helpers.Clean = function() {
  this._resource.connection.db.dropDatabase();
};