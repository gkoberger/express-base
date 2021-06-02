var MongoClient = require('mongodb').MongoClient;

// First, go here and add the DB: https://cloud.mongodb.com/v2/5acd29bfdf9db1790b84cc85#metrics/replicaSet/5acd2be09d0e9b6f34bd3b2f/explorer
// Next, add the user: https://cloud.mongodb.com/v2/5acd29bfdf9db1790b84cc85#security/database/users

const connect = {
  user: '',
  pass: '',
  db: '',
};

const config = {
  url: `mongodb+srv://${connect.user}:${connect.pass}@gregs-everything.aihwu.mongodb.net/${connect.db}?retryWrites=true&w=majority`,
  database: connect.db,
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
