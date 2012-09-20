var fs = require('fs'),
    path = require('path'),
    Tests = module.exports = exports;


/**
 * Build test exports object from cards directory
 */
fs.readdirSync('cards').forEach(function(object) {
  var card = path.resolve(path.join('cards', object)),
      target = path.join(card, 'tests');

  if(fs.statSync(card).isDirectory() && fs.existsSync(target)) {
    Tests[object.toUpperCase()] = require(target);
  }
});