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
    path = require('path'),
    User = require('./models/user'),
    dustfs = require('dustfs');

// Set template directory
dustfs.dirs(path.join(__dirname + '/templates'));

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
  var self = this,
      user = new User({ connection: req.storage.mongodb });

  user.all(function(err, users) {
    var data = {
      users: users,
      category: JSON.parse(category).slug,
      card: self.slug
    };

    dustfs.render('index.dust', data, function(err, html) {
      if(err) console.log('Error: '+err);
      else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  });
};

Example.prototype.newRecord = function newRecord(req, res, category) {
  var self = this,
      data = {
        category: JSON.parse(category).slug,
        card: self.slug
      };

  dustfs.render('new.dust', data, function(err, html) {
    if(err) console.log('Error: '+err);
    else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });
};

Example.prototype.create = function create(req, res, category) {
  var self = this,
      user = new User({ connection: req.storage.mongodb });

  user.create(req.body.user, function(err, result) {
    if(err) console.log('Error: ' + err);

    var path = '/' + JSON.parse(category).slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  });
};

Example.prototype.show = function show(req, res, category) {
  var self = this,
      args = Array.prototype.slice.call(arguments, 3).pop(),
      id = args.id,
      user = new User({ connection: req.storage.mongodb });

  if(!id) {
    var path = '/' + JSON.parse(category).slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    user.get(id, function(err, result) {

      var data = {
        user: result,
        category: JSON.parse(category).slug,
        card: self.slug
      };

      dustfs.render('show.dust', data, function(err, html) {
        if(err) console.log('Error: '+err);
        else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html);
        }
      });
    });
  }
};

Example.prototype.edit = function edit(req, res, category) {
  var self = this,
      args = Array.prototype.slice.call(arguments, 3).pop(),
      id = args.id,
      user = new User({ connection: req.storage.mongodb });

  if(!id) {
    var path = '/' + JSON.parse(category).slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    user.get(id, function(err, result) {

      var data = {
        user: result,
        category: JSON.parse(category).slug,
        card: self.slug
      };

      dustfs.render('edit.dust', data, function(err, html) {
        if(err) console.log('Error: '+err);
        else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html);
        }
      });
    });
  }
};

Example.prototype.update = function update(req, res, category) {
  var self = this,
      args = Array.prototype.slice.call(arguments, 3).pop(),
      id = args.id,
      user = new User({ connection: req.storage.mongodb });

  if(!id) {
    var path = '/' + JSON.parse(category).slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    user.update(id, req.body.user, function(err, result) {
      var path = '/' + JSON.parse(category).slug + '/' + self.slug + '/' + id;
      res.writeHead(302, {'Location': path});
      res.end();
    });
  }
};

Example.prototype.destroy = function destroy(req, res, category) {
  var self = this,
      args = Array.prototype.slice.call(arguments, 3).pop(),
      id = args.id,
      user = new User({ connection: req.storage.mongodb });

  if(!id) {
    var path = '/' + JSON.parse(category).slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    user.destroy(id, function(err, result) {
      var path = '/' + JSON.parse(category).slug + '/' + self.slug;
      res.writeHead(302, {'Location': path});
      res.end();
    });
  }
};