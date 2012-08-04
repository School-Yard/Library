var fs = require('fs'),
    path = require('path');

var file = module.exports = {};

// Get all the top level files/folders in a root directory, execute callback for each
file.expandFolder = function recurse(rootdir, callback) {
  fs.readdirSync(rootdir).forEach(function(file) {
    var filepath = path.join(rootdir, file),
        directory = fs.statSync(filepath).isDirectory();

    callback(filepath, file, directory);
  });
};