
var Dispatcher = module.exports = function Dispatcher(card_catalog) {
  this.card_catalog = card_catalog;
};

Dispatcher.prototype.dispatch = function dispatch(req, res) {
  var self = this;

  this.card_catalog.dispatch(req, res, function(err) {
    
    // TO-DO handle static assets. Should prob serve from a static
    // asset path such as http://assets.example.com

    // A switch statement should respond to the err status code
    switch(err.status) {
      case 404:
        self.not_found(req, res);
        break;
      case 500:
        self.error(req, res);
        break;
      default:
        self.error(req, res);
        break;
    }
  });
};

Dispatcher.prototype.not_found = function not_found(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.end('<h1>404</h1>');
};

Dispatcher.prototype.error = function error(req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/html'
  });
  res.end('<h1>500</h1>');
};