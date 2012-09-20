module.exports = function(options) {

  var _resource = options.adapter.mongo.resource('article');

  var Article = function(attrs) {
    this.storage = _resource;

    this._id = null;

    // Set some default values
    this._attributes = {
      title: '',
      slug: '',
      user: '',
      created: Date.now(),
      modified: '',
      body: ''
    };

    this._filters = {
      slug: function() {
        return this._attributes.title
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/\W+/g, '');
      },
      modified: function() {
        return Date.now();
      }
    };

    // Be as vague as possible.
    return Article.prototype.set.call(this, attrs);
  };

  /**
   * `Article.prototype._applyFilters`
   *  Run all attributes through the _filters functions
   */
  Article.prototype._applyFilters = function() {
    var self = this;

    Object.keys(this._filters).forEach(function(key) {
      self._attributes[key] = self._filters[key].call(self, self._attributes[key]);
    });

    return this;
  };

  /**
   * `Article.prototype._applyFilters`
   *  Run all attributes through the set filters
   *
   * @param {object} attrs new attributes
   */
  Article.prototype.set = function(attrs) {
    var self = this;

    Object.keys(attrs).forEach(function(key) {
      if(key in self._attributes) {
        self._attributes[key] = attrs[key];
      }
    });

    return this._applyFilters();
  };

  /**
   * `Article.get`
   * Get specific attributes
   *
   * @param {array|string} attrs
   * @return {string|object}
   */
  Article.prototype.get = function(attrs) {
    if(typeof attrs === 'string') {
      return this._attributes[attrs];
    }
    else {
      var self = this,
          attributes = {};

      attrs.forEach(function(key) {
        attributes[key] = self._attributes[key];
      });

      return attributes;
    }
  };

  /**
   * `Article.prototype.save`
   * Commit the current state of the model to the db
   *
   * @param {function} callback
   */
  Article.prototype.save = function(callback) {
    var self = this;

    if(!this._id) {
      // Create a new article since this._id doesn't exist
      this.storage.create(this._attributes, function(err, article) {
        if(err) return callback(err);
        self._id = article.id;
        return callback(null, self);
      });
    }
    else {
      //Save the record
      this.storage.save(this._id, this._attributes, function(err, article) {
        if(err) return callback(err);
        return callback(null, self);
      });
    }

    return this;
  };

  /**
   * `Article.destroy`
   * Destroy the article instance
   *
   * @param {function} callback
   */
  Article.prototype.destroy = function(callback) {
    this.storage.destroy(this._id, callback);

    return this;
  };

  /**
   * `Article.prototype.update`
   * Update attributes and commit
   *
   * @param {object} attrs
   * @param {function} callback
   */
  Article.prototype.update = function(attrs, callback) {
    this.set(attrs);
    this.save(callback);

    return this;
  };

  /**
   * `Article.prototype.like`
   * Articles that are like this one.
   * Builds a regex like /.*example|stuff|morestuff.* /
   *
   * @param {function} callback
   */
  Article.prototype.like = function(callback) {
    var regex,
        keywords = this._attributes.title.split(/s+/);

    regex = keywords.reduce(function(prevWord, curWord) {
      return prevWord + '|' + curWord.toLowerCase();
    }, '/.*').concat('*./');

    return Article.find({title: new RegExp(regex, 'ig')}, callback);
  };

  /**
   * Static functions
   *
   * TODO: Make all static functions return an Article
   */

  /**
   * `Article.all`
   * Points to `Resource.prototype.all`
   *
   * @param {function} callback(err, results)
   */
  Article.all = _resource.all;

  /**
   * `Article.find`
   *  Points to `Resource.prototype.find`
   *
   * @param {object} conditions
   * @param {function} callback(err, results)
   */
  Article.find = _resource.find;

  /**
   * `Article.get`
   *  Points to `Resource.prototype.get`
   *
   * @param {string} id
   * @param {function} callback(err, result)
   */
  Article.get = _resource.get;

  /**
   * `Article.create`
   * Points to `Resource.prototype.create`
   *
   * @param {object} attrs
   * @param {function} callback
   */
  Article.create = _resource.create;

  /**
   * `Article.destroy`
   *
   * @param {string} id
   * @param {function} callback
   */
  Article.destroy = _resource.destroy;

  //Expose `Article`
  return Article;
};