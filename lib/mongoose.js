var MongoClient = require('mongodb').MongoClient;

// Update these variables!
const config = {
  url: '',
  database: '',
};

var options = {
  mongos: {
    ssl: true,
    sslValidate: false,
  }
};

module.exports = function() {
  let db = false;
  var url = config.url;
  return function(req, res, next) {
    if (!db) {
      const connection = MongoClient.connect(url, options, (err, client) => {
        db = client.db(config.database);
        req.db = db;
        next();
      });
    } else {
      req.db = db;
      next();
    }
  };
};
