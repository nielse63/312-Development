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

// html parsing
app.engine('html', hogan)
app.set('views', `${__dirname}/src`)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/build/`))
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

// set headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  return next()
})

// routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(app.get('port'), () => {
  if (process.env.DYNO) {
    console.log('This is on Heroku..!!')
    fs.openSync('/tmp/app-initialized', 'w')
  }
  console.log('Viewable at http://localhost:%s', app.get('port')) // eslint-disable-line no-console
})
