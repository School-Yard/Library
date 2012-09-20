var should = require('should'),
    Helpers = require('./support/helpers'),
    Article = require('../models/article')(Helpers.MockConnection());

describe('Article', function() {
  var attributes = {
    title: 'Hello world!',
    user: '12345',
    body: 'This is a test.'
  };

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
      var article = new Article(attributes);

      it('properties requested with article.get(array)', function() {
        var attrs = article.get(['title', 'body']);

        attrs.should.eql({title: attributes.title, body: attributes.body});
      });

      it('property requested with article.get(string)', function() {
        article.get('title').should.equal(attributes.title);
      });
    });

    describe('_filters', function() {
      var article = new Article(attributes);

      it('should run on creation', function() {
        article.get('slug').should.equal(article._filters.slug.call(article, attributes.title));
      });

      it('should run on set', function() {
        article.set({title: '@HELLO* WORLD$$$$$'});
        article.get('slug').should.equal('hello_world');
      });
    });

  });

  describe('member functions', function() {
    var article;

    beforeEach(function() {
      article = new Article(attributes);
    });

    it('should save successfully', function(done) {
      article.save(function(err, article) {
        err.should.not.exist();
        article.should.exist();
        article._attributes.should.equal(attributes);
        return done();
      });
    });

  });



});