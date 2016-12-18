/* eslint-env node */
/* eslint-disable max-statements */

const express = require('express')
const path = require('path')
const throng = require('throng')
const extend = require('lodash/extend')
const hogan = require('hogan-express')
const bodyParser = require('body-parser')
const compression = require('compression')
// const minifyHTML = require('express-minify-html')

// vars
const app = express()

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

  // html parsing
  app.engine('html', hogan)
  app.set('views', `${__dirname}/build`)
  app.use(express.static(`${__dirname}/build/`))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(compression())
  // app.use(minifyHTML({
  //   override: true,
  //   htmlMinifier: {
  //     removeComments: true,
  //     collapseWhitespace: true,
  //     collapseBooleanAttributes: true,
  //     removeAttributeQuotes: true,
  //   },
  // }))

  // set headers
  app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    return next()
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
    // const baseURL = `${req.protocol}://${req.hostname}`
    // res.locals = {
    //   baseURL,
    //   url: `${baseURL}${req.originalUrl}`,
    // }
    // res.status(200).render('index')
  })

  app.listen(app.get('port'), () => {
    console.log('Viewable at http://localhost:%s', app.get('port')) // eslint-disable-line no-console
  })
}

// concurrency handling
throng({
  workers: (process.env.WEB_CONCURRENCY || 1),
  lifetime: Infinity,
  start,
}, start)
