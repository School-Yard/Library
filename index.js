var library = exports;

// Cards

library.cards = {
  OAuth                    : require('./cards/OAuth')
};

// Library Utils

library.utils = {
  Authentication           : require('./utils/Authentication')
};

// Middleware

library.middleware = {
  Authenticate             : require('./middleware/Authenticate')
};