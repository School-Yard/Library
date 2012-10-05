module.exports = function(options) {

  var _resource = options.adapter.mongo.resource('page');

  var Page = function(attrs) {
    this._resource = _resource;

    this._id = null;

    // Set some default values
    this._attributes = {
      title: '',
      slug: '',
      user: '',
      created: Date.now(),
      modified: '',
      summary: '',
      articles: []
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

    if(typeof attrs === 'object') Page.prototype.set.call(this, attrs);
    return this;
  };

  /**
   * `Page.prototype._applyFilters`
   *  Run all attributes through the _filters functions
   */
  Page.prototype._applyFilters = function() {
    var self = this;

    Object.keys(this._filters).forEach(function(key) {
      self._attributes[key] = self._filters[key].call(self, self._attributes[key]);
    });

    return this;
  };

  /**
   * `Page.prototype._applyFilters`
   *  Run all attributes through the set filters
   *
   * @param {object} attrs new attributes
   */
  Page.prototype.set = function(attrs) {
    var self = this;

    Object.keys(attrs).forEach(function(key) {
      if(key in self._attributes) {
        self._attributes[key] = attrs[key];
      }
    });

    return this._applyFilters();
  };

  /**
   * `Page.get`
   * Get specific attributes
   *
   * @param {array|string} attrs
   * @return {string|object}
   */
  Page.prototype.get = function(attrs) {
    if(typeof attrs === 'string') {
      if(attrs === 'id') return this._id;
      return this._attributes[attrs];
    }
    else {
      var self = this,
          attributes = {};

      attrs.forEach(function(key) {
        if(key === 'id') {
          attributes.id = self._id;
        }
        else {
          attributes[key] = self._attributes[key];
        }
      });

      return attributes;
    }
  };

  /**
   * `Page.prototype.save`
   * Commit the current state of the model to the db
   *
   * @param {function} callback
   */
  Page.prototype.save = function(callback) {
    var self = this;

    if(!this._id) {
      // Create a new page since this._id doesn't exist
      this._resource.create(this._attributes, function(err, page) {
        if(err) return callback(err);
        self._id = page.id;
        return callback(null, self);
      });
    }
    else {
      //Save the record
      this._resource.save(this._id, this._attributes, function(err, page) {
        if(err) return callback(err);
        return callback(null, self);
      });
    }

    return this;
  };

  /**
   * `Page.destroy`
   * Destroy the page instance
   *
   * @param {function} callback
   */
  Page.prototype.destroy = function(callback) {
    this._resource.destroy(this._id, callback);

    return this;
  };

  /**
   * `Page.prototype.update`
   * Update attributes and commit
   *
   * @param {object} attrs
   * @param {function} callback
   */
  Page.prototype.update = function(attrs, callback) {
    this.set(attrs);
    this.save(callback);

    return this;
  };

  /**
   * `Page.prototype.addArticle`
   *
   * @param {object} article
   * @param {function} callback
   */
  Page.prototype.addArticle = function(article, callback) {
    this._attributes.articles.push(article.get('id'));

    return this;
  };

  /**
   * `Page.prototype.removeArticle`
   *
   * @param {object} article
   * @param {function} callback
   */
  Page.prototype.removeArticle = function(article, callback) {
    var i, len, articles = this._attributes.articles;

    for(i = 0, len = articles.length; i < len; i++) {
      if(articles[i] === article.id) articles.splice(i, 1);
    }

    return this;
  };


  /**
   * Static functions
   *
   * TODO: Make all static functions return an Page
   */

  /**
   * `Page.all`
   * Points to `Resource.prototype.all`
   *
   * @param {function} callback(err, results)
   */
  Page.all = function(callback) {
    _resource.all(function(err, results) {
      if(err) return callback(err);

      var pages = results.map(function(page) {
        return new Page(page);
      });

      return callback(null, pages);
    });
  };

  /**
   * `Page.find`
   *  Points to `Resource.prototype.find`
   *
   * @param {object} conditions
   * @param {function} callback(err, results)
   */
  Page.find = function(conditions, callback) {
    _resource.find(conditions, function(err, results) {
      if(err) return callback(err);

      var pages = results.map(function(page) {
        return new Page(page);
      });

      return callback(null, pages);
    });
  };

  /**
   * `Page.get`
   *  Points to `Resource.prototype.get`
   *
   * @param {string} id
   * @param {function} callback(err, result)
   */
  Page.get = function(id, callback) {
    _resource.get({_id: id}, function(err, page) {
      if(err) return callback(err);
      if(!page) return callback(null, null);
      return callback(null, new Page(page));
    });
  };

  /**
   * `Page.create`
   * Points to `Resource.prototype.create`
   *
   * @param {object} attrs
   * @param {function} callback
   */
  Page.create = function(attrs, callback) {
    _resource.create(attrs, function(err, page) {
      if(err) return callback(err);
      return callback(null, new Page(page));
    });
  };

  /**
   * `Page.destroy`
   *
   * @param {string} id
   * @param {function} callback
   */
  Page.destroy = _resource.destroy;

  //Expose `Page`
  return Page;
};