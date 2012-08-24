/**
 * An example controller structure.
 *
 * Demonstrates how to break a module up into
 * a basic MVC structure.
 */

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
      category = req.category,
      data;

  this.User.all(function(err, users) {
    data = {
      users: users,
      category: category.slug,
      card: self.slug
    };

    res.render('users/index', data);
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

  res.render('users/new', data);
};

// POST - Create a new user
Users.create = function create(req, res) {
  var self = this,
      category = req.category,
      path;

  this.User.create(req.body.user, function(err, result) {
    if(err) return self.error(req, res, err);

    path = '/' + category.slug + '/' + self.slug;
    res.redirect(path);
  });
};

// GET - Show a single record
Users.show = function show(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id,
      path,
      data;

  if(!id) {
    path = '/' + category.slug + '/' + self.slug;
    res.redirect(path);
  }
  else {
    this.User.get(id, function(err, result) {

      data = {
        user: result,
        category: category.slug,
        card: self.slug
      };

      res.render('users/show', data);
    });
  }
};

// GET - Edit a User record
Users.edit = function edit(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id,
      path,
      data;

  if(!id) {
    path = '/' + category.slug + '/' + self.slug;
    res.redirect(path);
  }
  else {
    this.User.get(id, function(err, result) {

      data = {
        user: result,
        category: category.slug,
        card: self.slug
      };

      res.render('users/edit', data);
    });
  }
};

// PUT - Update a User record
Users.update = function update(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id,
      path;

  if(!id) {
    path = '/' + category.slug + '/' + self.slug;
    res.redirect(path);
  }
  else {
    this.User.update(id, req.body.user, function(err, result) {
      if(err) return self.error(req, res, err);

      path = '/' + category.slug + '/' + self.slug + '/' + id;
      res.redirect(path);
    });
  }
};

// DELETE - Destroy a User record
Users.destroy = function destroy(req, res, params) {
  var self = this,
      category = req.category,
      id = params.id,
      path;

  if(!id) {
    path = '/' + category.slug + '/' + self.slug;
    res.redirect(path);
  }
  else {
    this.User.destroy(id, function(err, result) {
      if(err) return self.error(req, res, err);

      path = '/' + category.slug + '/' + self.slug;
      res.redirect(path);
    });
  }
};