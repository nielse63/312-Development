/* eslint-env node */
/* eslint-disable max-statements, no-console */

const express = require('express')
const path = require('path')
const extend = require('lodash/extend')
const hogan = require('hogan-express')
const bodyParser = require('body-parser')
const compression = require('compression')
const fs = require('fs')
const minifyHTML = require('express-minify-html')
const config = require('./src/config.json')
const render = require('preact-render-to-string')
const { match, RouterContext } = require('react-router')

// vars
const app = express()

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

// set headers
app.disable('x-powered-by')

// html parsing
app.engine('html', hogan)
app.set('view engine', 'html')
app.set('views', `${__dirname}/src`)
app.enable('view cache')
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/build/`, {
  setHeaders(res) {
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-Content-Type-Options', 'nosniff')
  },
}))
app.use(minifyHTML({
  override: true,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
  },
}))

// set port
app.set('port', (process.env.NODE_ENV === 'production' ? process.env.PORT || 3000 : 3001))

// set meta data
function createTitle(data) {
  const title = data.title || data.defaultTitle
  const description = data.description || data.backupTitle
  return `${title} | ${description}`
}

function getPageMeta(page) {
  const key = page === '/index' ? '' : page
  const meta = config.META[key] || {}
  const info = extend({}, config.META.default, meta)
  info.title = createTitle(info)
  return info
}

// routing
app.get('*', (req, res) => {
  const json = getPageMeta(req.url)

  const baseURL = `${req.protocol}://${req.headers.host}/`
  const site = extend({}, json, {
    url: baseURL,
    canonical: `${baseURL}${(req.originalUrl.replace('/', ''))}`,
  })
  res.locals = {
    site,
  }
  res.render(path.join(__dirname, 'build', 'home'), site)
})

app.listen(app.get('port'), () => {
  if (process.env.DYNO) {
    console.log('This is on Heroku..!!')
    fs.openSync('/tmp/app-initialized', 'w')
  }
  console.log('Viewable at http://localhost:%s', app.get('port')) // eslint-disable-line no-console
})
