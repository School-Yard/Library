var card_catalog = require('cardcatalog'),
    Dispatcher = require('./dispatch'),
    path = require('path'),
    file = require('./file');

var library = exports;

/**
 * Create a new catalog to use with the Card-Catalog
 *
 * @params
 * connection {Object} - a Trapper-Keeper connection object
 * namespace  {String} - a string to namespace the categories in.
 *
 * returns a Card-Catalog
 */
library.create_catalog = function create_catalog(connection, namespace) {
  var catalog = card_catalog.categorize({
    connection: connection,
    namespace: namespace
  });
  
  this.load_cards();
  this.dispatcher = new Dispatcher(catalog);
  return catalog;
};

/**
 * Load all the cards from the card directory into a
 * Card-Catalog.
 *
 * returns a card cache
 */
library.load_cards = function load_cards() {
  var rootdir = path.join(__dirname, '/../cards'),
      cards = addCards(rootdir);

  return card_catalog.add_cards({
    cards: cards
  });
};

function addCards(rootdir) {
  var cards = [];

  file.expandFolder(rootdir, function(filepath, name, directory) {
    if(directory) {
      cards.push(require(filepath));
    }
  });

  return cards;
}

/**
 * Dispatcher
 *
 * returns a catalog's dispatch instance
 */
library.dispatcher = function dispatcher() {
  if(this.dispatcher) return this.dispatcher;
  throw new Error('a catalog must be created before you can dispatch routes');
};