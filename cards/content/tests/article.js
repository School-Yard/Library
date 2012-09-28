var Article,
    should = require('should'),
    Helpers = require('./support/helpers'),
    models = require('../models');


describe('Article', function() {
  var attributes = {
    title: 'Hello world!',
    user: '12345',
    body: 'This is a test.'
  };

  //Load Article with a mock connection object
  before(function(done) {
    Helpers.MockConnection(function(resource) {
      Article = models.Article(resource);
      return done();
    });
  });

  it('should be the article class, not the wrapper', function() {
    var article = new Article();

    should.exist(article._resource);
    should.exist(article._attributes);
    should.exist(article._filters);
  });

  // Begin property tests
  describe('properties', function() {

    describe('set', function() {

      it('on creation', function() {
        var article = new Article(attributes);

        article._attributes.title.should.equal(attributes.title);
        article._attributes.body.should.equal(attributes.body);
        article._attributes.user.should.equal(attributes.user);
      });

      it('with article.set()', function() {
        var article = new Article(attributes);
        article.set(attributes);

        article._attributes.title.should.equal(attributes.title);
        article._attributes.body.should.equal(attributes.body);
        article._attributes.user.should.equal(attributes.user);
      });
    });

    describe('get', function() {
      var article;

      before(function() {
        article = new Article(attributes);
      });

      it('properties requested with article.get(array)', function() {
        var attrs = article.get(['title', 'body']);

        attrs.should.eql({title: attributes.title, body: attributes.body});
      });

      it('property requested with article.get(string)', function() {
        article.get('title').should.equal(attributes.title);
      });
    });

    describe('_filters', function() {
      var article;

      before(function() {
        article = new Article(attributes);
      });

      it('should run on creation', function() {
        article.get('slug').should.equal(article._filters.slug.call(article, attributes.title));
      });

      it('should run on set', function() {
        article.set({title: '@HELLO* WORLD$$$$$'});
        article.get('slug').should.equal('hello_world');
      });
    });
    // End of properties
  });

  describe('member functions', function() {
    var article;

    beforeEach(function() {
      article = new Article(attributes);
    });

    it('should save successfully', function(done) {
      article.save(function(err, article) {
        should.not.exist(err);
        should.exist(article);
        article._attributes.should.include(attributes);
        return done();
      });
    });

    it('should update successfully', function(done) {
      article.update({title: 'Wacky new title'}, function(err, article) {
        article.get('title').should.equal('Wacky new title');
        return done();
      });
    });

    it('should destroy successfully', function(done) {
      article.save(function(err, article) {
        should.exist(article);

        article.destroy(function(err) {
          should.not.exist(err);

          Article.get(article.get('id'), function(err, article) {
            should.not.exist(article);
            return done();
          });
        });
      });
    });
    //End of member function tests
  });

  describe('static functions', function() {
    var article;

    beforeEach(function(done) {
      article = new Article(attributes);

      article.save(done);
    });
    it('get should retrieve one record with matching id', function(done) {
      Article.get(article.get('id'), function(err, result) {
        should.not.exist(err);
        should.exist(result);

        result.get('id').should.equal(article.get('id'));
        return done();
      });
    });
    //End static function tests
  });

});