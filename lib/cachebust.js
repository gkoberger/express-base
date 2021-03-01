module.exports = function() {
  return function(req, res, next) {
    var slug = process.env.HEROKU_SLUG_COMMIT ? process.env.HEROKU_SLUG_COMMIT.substr(0,5) : '';

    if (!slug && !req.headers.host.includes('localhost') && req.headers.host.includes('herokuapp')) {
      const app = req.headers.host.match(/([-_a-zA-Z0-9]+)\.herokuapp.com/)[1];
      console.log("🚨 SET UP CACHE BUSTING!");
      console.log(`  heroku labs:enable runtime-dyno-metadata -a ${app}`);
    }

    res.locals.cache = slug;
    next();
  };
};
