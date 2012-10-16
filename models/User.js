/**
 * User Model
 *
 * Controls Users and Roles for the system.
 */

var User = module.exports = function User(options) {
  this.options = options || {};

  // Define a new resource
  this.storage = options.adapters.mongo.resource('users');

  // Set some default values
  this._attributes = {
    id: '',
    username: '',
    name: '',
    email: '',
    role: '',
    access_token: '',
    refresh_token: '',
    avatar: '',
    ctime: '',
    mtime: ''
  };

};

/**
 * Setter
 *
 * Use the following method to set instance
 * attributes.
 */

User.prototype.setter = function set(attrs) {
  var self = this;

  Object.keys(attrs).forEach(function(key) {
    if(key in self._attributes) {
      self._attributes[key] = attrs[key];
    }
  });
};

/**
 * Getter
 *
 * Use the following method to retrieve instance
 * attributes.
 */

User.prototype.getter = function get(attr) {
  return this._attributes[attr];
};


User.prototype.all = function all(callback) {
  this.storage.all(function(err, results) {
    if(err) return callback(err);
    return callback(null, results);
  });
};

User.prototype.get = function get(id, callback) {
  this.storage.get(id, function(err, result) {
    if(err) return callback(err);
    return callback(null, result);
  });
};

User.prototype.create = function create(attrs, callback) {
  var self = this;

  this.setter(attrs); // set to clean up data

  this.storage.create(this._attributes, function(err, result) {
    if(err) return callback(err);
    return callback(null, result);
  });
};

User.prototype.destroy = function destroy(id, callback) {
  this.storage.destroy(id, function(err, result) {
    if(err) return callback(err);
    return callback(null, result);
  });
};

User.prototype.update = function update(id, attrs, callback) {
  this.setter(attrs); // set to clean up data

  this.storage.update(id, this._attributes, function(err, result) {
    if(err) return callback(err);
    return callback(null, result);
  });
};

/**
 * Authorize
 *
 * Takes an oAuth response and gets a User or
 * if the user doesn't exist, create a user with
 * base permissions.
 *
 * oAuth should manage access control to the application
 *
 * @access_token   {String}     - access_token returned from oAuth response
 * @request_token  {String}     - request_token returned from oAuth response
 * @profile        {Object}     - profile information returned from oAuth response
 *
 * Returns an authorized user profile to store in session
 *
 * @api private
 */

User.prototype.authorize = function authorize(access_token, refresh_token, profile, callback) {
  var self = this,
      data,
      user,
      id;

  this.storage.find({ 'refresh_token': refresh_token }, function(err, users) {
    if(err) return callback(err);
    if(users.length > 1) return callback(new Error("Found multiple users that meet this criteria."));

    if(users.length < 1) {

      // create a new user with base permissions
      data = {
        username: profile.username,
        name: profile.name,
        role: profile.role,
        access_token: access_token,
        refresh_token: refresh_token,
        avatar: profile.avatar,
        ctime: new Date()
      };

      self.create(data, function(err, model) {
        if(err) return callback(err);
        return callback(null, model);
      });

    }
    else {
      user = new User(self.options);

      data = users[0];
      data.access_token = access_token;

      user.setter(data);
      id = user._attributes.id;

      user.update(id, user, function(err, model) {
        if(err) return callback(err);
        return callback(null, model);
      });
    }

  });
};