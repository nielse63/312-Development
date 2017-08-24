
import debug from 'debug';
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import sslRedirect from 'heroku-ssl-redirect';
import expressStaticGzip from 'express-static-gzip';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import sendEmail from './send-email';
import getTweets from './get-tweets';
import { isProduction, setupEnv } from './helpers';

const log = debug('frontend:log');
const logError = debug('frontend:error');
const port = process.env.PORT || 9999;
const staticDir = path.resolve(__dirname, '../dist');

function setResponseHeaders(res) {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'max-age=2628000, public');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
}

const app = express();

// setup environment vars
setupEnv(app);

// set server add-ons
if (isProduction()) {
  app.use(sslRedirect());
}

app.use(helmet());
app.use(compression());
app.use(serveStatic(staticDir, {
  etag: true,
  cacheControl: true,
  dotfiles: 'ignore',
  maxAge: 604800000,
  setHeaders: setResponseHeaders,
}));
app.use('/', expressStaticGzip(staticDir));

const oneDate = 24 * 60 * 60 * 1000;
app.use('/submission', bodyParser.json());
app.use('/submission', bodyParser.urlencoded({
  extended: true,
}));

app.post('/submission', (req, res) => {
  const returnURL = `${req.get('referer')}#/thank-you`;
  sendEmail(req.body);
  res.cookie('form_submission', req.body, { expires: new Date(Date.now() + oneDate) });
  res.redirect(returnURL);
});

app.get('/get-tweets', (req, res) => {
  getTweets().then((data) => {
    res.status(200).json(data);
  }, (error) => {
    logError(error);
    res.status(500).json(error);
  });
});

app.listen(port, () => {
  log(`App listening on port ${port}`);
});
