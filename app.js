
var express = require('express')
var path = require('path')
var sslRedirect = require('heroku-ssl-redirect')
var throng = require('throng');
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
  app.disable('x-powered-by');
  app.set('port', (process.env.PORT || 3000))
  app.use(function(req, res, next) {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    return next();
  });
  app.use(express.static('build'))
  app.use(sslRedirect(['production'], 301))

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });

  app.listen(app.get('port'), function () {
    console.log('Viewable at http://localhost:%s', app.get('port'))
  })
}
