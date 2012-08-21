/**
 * An example controller structure.
 *
 * Demonstrates how to break a module up into
 * a basic MVC structure.
 */

// Set a location to use for templates with DustFS
var dustfs = require('dustfs');
dustfs.dirs(path.join(__dirname + '/../templates/users'));

// Create an export object
var Users = module.exports;

/**
 * For each function used in a router the
 * `this` context will be that of the card_catalog.Card
 * instance.
 *
 * This allows you to access properties available
 * in the class such as this.adapters or this.slug.
 */

// GET - Index Page
Users.index = function root(req, res) {
  var self = this,
      category = req.category;

  this.User.all(function(err, users) {
    var data = {
      users: users,
      category: category.slug,
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

// GET - New User Form
Users.new_form = function new_form(req, res) {
  var self = this,
      category = req.category,
      data;

  data = {
    category: category.slug,
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

// POST - Create a new user
Users.create = function create(req, res) {
  var self = this,
      category = req.category;

  this.User.create(req.body.user, function(err, result) {
    if(err) console.log('Error: ' + err);

    var path = '/' + category.slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  });
};

// GET - Show a single record
Users.show = function show(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id;

  if(!id) {
    var path = '/' + category.slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    this.User.get(id, function(err, result) {

      var data = {
        user: result,
        category: category.slug,
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

// GET - Edit a User record
Users.edit = function edit(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id;

  if(!id) {
    var path = '/' + category.slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    this.User.get(id, function(err, result) {

      var data = {
        user: result,
        category: category.slug,
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

// PUT - Update a User record
Users.update = function update(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id;

  if(!id) {
    var path = '/' + category.slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    this.User.update(id, req.body.user, function(err, result) {
      var path = '/' + category.slug + '/' + self.slug + '/' + id;
      res.writeHead(302, {'Location': path});
      res.end();
    });
  }
};

// DELETE - Destroy a User record
Users.destroy = function destroy(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id;

  if(!id) {
    var path = '/' + category.slug + '/' + self.slug;
    res.writeHead(302, {'Location': path});
    res.end();
  } else {
    this.User.destroy(id, function(err, result) {
      var path = '/' + category.slug + '/' + self.slug;
      res.writeHead(302, {'Location': path});
      res.end();
    });
  }
};