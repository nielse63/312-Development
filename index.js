/* eslint-env node */
/* eslint-disable max-statements, no-console */

const express = require('express')
const path = require('path')
const hogan = require('hogan-express')
const bodyParser = require('body-parser')
const compression = require('compression')
const fs = require('fs')
const minifyHTML = require('express-minify-html')
const sslRedirect = require('heroku-ssl-redirect')
const config = require('./src/config.json')

// vars
const app = express()
const viewsDir = process.env.NODE_ENV === 'production' ? `${__dirname}/src` : `${__dirname}/build`

// functions
function setResponseHeaders(res) {
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Cache-Control', 'max-age=2628000, public')
}

// set headers
app.disable('x-powered-by')

// html parsing
app.engine('html', hogan)
app.set('view engine', 'html')
app.set('views', viewsDir)
app.enable('view cache')
app.use(compression())
if (process.env.SSL_REDIRECT) {
  app.use(sslRedirect())
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/build`, {
  setHeaders: setResponseHeaders,
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
app.set('port', process.env.PORT || 3001)

// TODO: move meta configuration functions into their own class
// set meta data
function createTitle(data) {
  const title = data.title || data.defaultTitle
  const description = data.description || data.backupTitle
  return `${title} | ${description}`
}

function getPageMeta(page) {
  const key = page === '/index' ? '' : page
  const meta = config.META[key] || {}
  const info = Object.assign({}, config.META.default, meta)
  info.title = createTitle(info)
  return info
}

// routing
app.get('*', (req, res) => {
  if (!res.headersSent) {
    setResponseHeaders(res)
  }
  const json = getPageMeta(req.url)
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  const baseURL = `${protocol}://${req.headers.host}/`
  const site = Object.assign({}, json, {
    url: baseURL,
    canonical: `${baseURL}${(req.originalUrl.replace('/', ''))}`,
  })
  res.locals = {
    site,
  }
  res.render(path.join(__dirname, 'build', 'home'), site)
})

module.exports = app

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log('Viewable on port %s', app.get('port')) // eslint-disable-line no-console
  })
}
