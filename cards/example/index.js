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
    util = require('util'),
    UsersController = require('./controllers/users'),
    User = require('./models/user');

var Example = module.exports = function Example(options) {
  card_catalog.Card.call(this, options);

  this.name = "Example"; // Required
  this.slug = "example"; // Required

  this.User = new User({
    adapters: this.adapters
  });

  // Create the Example routing table
  this.router = {
    'get': {
      '/': UsersController.index,
      '/new': UsersController.new_form,
      '/:id': UsersController.show,
      '/:id/edit': UsersController.edit
    },
    'put': {
      '/:id': UsersController.update
    },
    'post': {
      '/': UsersController.create
    },
    'delete': {
      '/:id': UsersController.destroy
    }
  };
};

util.inherits(Example, card_catalog.Card);

/**
 * Temporary Response Helpers
 */
Example.prototype.error = function error(req, res, err) {
  this.emit('error', { res: res, status: 400, message: err });
};

Example.prototype.redirect = function redirect(req, res, path) {
  res.writeHead(302, {'Location': path});
  res.end();
};

Example.prototype.render = function render(req, res, html) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};