
var express = require('express')
var path = require('path')
var throng = require('throng');
var compression = require('compression')
var extend = require('lodash/extend');

// vars
var app = express()
var WORKERS = process.env.WEB_CONCURRENCY || 1;

// concurrency handling
throng({
  workers: WORKERS,
  lifetime: Infinity,
  // start: start
}, start);

function start() {

  // app config
  // app.use(function(req, res, next) {
  //   console.log(req.protocol + ' ' + req.url)
  //   if(!req.secure && process.env.NODE_ENV === 'production') {
  //     var secureUrl = "https://" + req.headers['host'] + req.url;
  //     res.redirect(301, secureUrl);
  //     res.end()
  //   }
  //   return next();
  // });
  app.set('port', (process.env.PORT || 3000))
  app.use(function(req, res, next) {
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    return next();
  });
  app.use(express.static('build'))
  app.use(compression)

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });

  app.listen(app.get('port'), function () {
    console.log('Viewable at http://localhost:%s', app.get('port'))
  })
}
