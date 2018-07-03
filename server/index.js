// express express-static-gzip debug compression
const debug = require('debug');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');
const helmet = require('helmet');

const log = debug('312dev');
const port = process.env.PORT || 8080;
const staticDir = path.resolve(__dirname, '../dist');
const app = express();

// setup server
app.use(compression());
app.use(serveStatic(staticDir, {
  etag:         true,
  cacheControl: true,
  dotfiles:     'ignore',
  maxAge:       604800000,
  setHeaders(res) {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'max-age=2628000, public');
    res.setHeader('X-DNS-Prefetch-Control', 'on');
  },
}));
app.set('env', process.env.NODE_ENV || 'development');
app.set('etag', 'strong');
app.disable('x-powered-by');
app.use(helmet({
  dnsPrefetchControl: {
    allow: true,
  },
  referrerPolicy: {
    policy: 'origin',
  },
}));
app.use('/', expressStaticGzip(staticDir));
app.listen(port, () => {
  log(`App listening on port ${port}`);
});
