var TK = require('trapperkeeper'),
    Helpers = module.exports = exports;


Helpers.MockConnection = function(callback) {
  var self = this;
  this._resource = TK.connect('mongodb', 'mongodb://127.0.0.1', 27017, {database: 'test'});
  this._resource.on('ready', function() {
    Helpers.Clean(function() {
      return callback({
        adapter: {
          mongo: self._resource
        }
      });
    });
  });
};

Helpers.Clean = function(callback) {
  this._resource.connection.db('test').dropDatabase(callback);
};