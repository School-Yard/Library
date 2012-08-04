/**
 * An example card that shows how to use a plugin
 * with Card-Catalog.
 *
 * Mimics the scaffolding created by Rails scaffolding.
 * Contains the 7 RESTful routes that a resource would use.
 *
 * Cards can be made however you like. The only requirement is
 * that they must have a Constuctor entry point that inherits from
 * the Card-Catalog Card prototype.
 */
var card_catalog = require('cardcatalog'),
    util = require('utile');

var Example = module.exports = function Example(options) {
  this.name = "Example"; // Required
  this.slug = "example"; // Required

  // Create the Example routing table
  this.router = {
    'get': {
      '/': this.index,
      '/new': this.newRecord,
      '/:id': this.show,
      '/:id/edit': this.edit
    },
    'put': {
      '/:id': this.update
    },
    'post': {
      '/': this.create
    },
    'delete': {
      '/:id': this.destroy
    }
  };
};

util.inherits(Example, card_catalog.card);

Example.prototype.index = function root(req, res, category) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Index page');
};

Example.prototype.newRecord = function newRecord(req, res, category) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Create a new record');
};

Example.prototype.create = function create(req, res, category) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Created record');
};

Example.prototype.show = function show(req, res, category) {
  var args = Array.prototype.slice.call(arguments, 3).pop(),
      str = ' ';

  Object.keys(args).forEach(function(k) {
    str += k + ': ' + args[k];
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Get record with params:' + str);
};

Example.prototype.edit = function edit(req, res, category) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Example edit page');
};

Example.prototype.update = function update(req, res, category) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Example update page');
};

Example.prototype.destroy = function destroy(req, res, category) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Example destroy page');
};