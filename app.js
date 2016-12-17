
var express = require('express')
var path = require('path')
var throng = require('throng');
// var compression = require('compression')
var extend = require('lodash/extend');
var hogan = require('hogan-express');
var bodyParser = require('body-parser');
var compression = require('compression');
var minifyHTML = require('express-minify-html');
// var slash = require('express-slash')

// vars
var app = express()
var WORKERS = process.env.WEB_CONCURRENCY || 1;

// concurrency handling
throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: start
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

  // always
  app.set('port', (process.env.NODE_ENV === 'production' ? process.env.PORT || 3000 : 3001))

  // routing
  // app.enable('strict routing');
  // var router = express.Router({
  //   caseSensitive: app.get('case sensitive routing'),
  //   strict       : app.get('strict routing')
  // });
  // app.use(router);
  // app.use(slash());

  // html parsing
  app.engine('html', hogan)
  app.set('views', `${__dirname}/build`)
  app.use(express.static(`${__dirname}/build/`))
  app.use(compression())
  app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
      removeComments:            true,
      collapseWhitespace:        true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes:     true
    }
  }))

  // set headers
  app.use(function(req, res, next) {
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    return next();
  });

  app.get('*', function(req, res) {
    const baseURL = `${req.protocol}://${req.hostname}`
    res.locals = {
      baseURL: baseURL,
      url : `${baseURL}${req.originalUrl}`
    }
    // console.log(res.locals)
    res.status(200).render('index.html')
  });

  app.listen(app.get('port'), function () {
    console.log('Viewable at http://localhost:%s', app.get('port'))
  })
}
