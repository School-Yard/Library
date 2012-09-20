var TK = require('trapperkeeper'),
    Helpers = module.exports = exports;


Helpers.MockConnection = function() {
  return {
    adapter: {
      mongo: TK.connect('mongodb', 'mongodb://127.0.0.1', 27017, {database: 'library_testing'})
    }
  };
};