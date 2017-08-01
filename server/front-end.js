
const debug = require('debug')('front-end');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const sslRedirect = require('heroku-ssl-redirect');
const helmet = require('helmet');
const { isProduction, setupEnv } = require('./helpers');

const port = process.env.PORT || 9999;
const staticDir = path.resolve(__dirname, '../dist');

// function setResponseHeaders(res) {
//   res.setHeader('X-XSS-Protection', '1; mode=block');
//   res.setHeader('X-Frame-Options', 'SAMEORIGIN');
//   res.setHeader('X-Content-Type-Options', 'nosniff');
// }

const app = express();

// setup environment vars
setupEnv(app);

// set server add-ons
if (isProduction(app)) {
  app.use(sslRedirect());
}

app.use(helmet());
app.use(compression());
app.use(serveStatic(staticDir, {
  etag: true,
  cacheControl: true,
  dotfiles: 'ignore',
  maxAge: 604800000,
  // setHeaders: setResponseHeaders,
}));

app.listen(port, () => {
  debug(`App listening on port ${port}`);
});
