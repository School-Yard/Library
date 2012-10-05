var Page,
    should = require('should'),
    Helpers = require('./support/helpers'),
    models = require('../models');


describe('Page', function() {

  before(function(done) {
    Helpers.MockConnection(function(resource) {
      Page = models.Page(resource);
      return done();
    });
  });

   it('should be the page class, not the wrapper', function() {
    var page = new Page();

    should.exist(page._resource);
    should.exist(page._attributes);
    should.exist(page._filters);
  });

  describe('properties', function() {

    describe('set', function() {
      it('should have valid properties', function() {

      });
    });

    //End property tests
  });

});