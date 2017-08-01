
const debug = require('debug')('back-end');
const express = require('express');
const bodyParser = require('body-parser');
// const sslRedirect = require('heroku-ssl-redirect');
const helmet = require('helmet');
const sendEmail = require('./send-email');
const getTweets = require('./get-tweets');
const { loadENV, setupEnv } = require('./helpers');

loadENV();

const port = 3000;
const frontEndPort = process.env.PORT || (process.env.NODE_ENV === 'production' ? 9999 : 8080);
let allowedURL = process.env.NODE_ENV === 'production' ? 'https://312development.com' : `http://localhost:${frontEndPort}`;
if (process.env.STAGING_ENV) {
  allowedURL = 'https://staging312.herokuapp.com';
}

const app = express();
app.use(helmet());

// setup environment vars
setupEnv(app);

function setHeaders(res) {
  res.header('Access-Control-Allow-Origin', allowedURL);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
}

// set server add-ons
// if (isProduction(app)) {
//   app.use(sslRedirect());
// }
// app.set('trust proxy', 'loopback');

const oneDate = 24 * 60 * 60 * 1000;
app.use('/submission', bodyParser.json());
app.use('/submission', bodyParser.urlencoded({
  extended: true,
}));

app.get('*', (req, res, next) => {
  setHeaders(res);
  next();
});

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
    res.status(500).json(error);
  });
});

app.listen(port, () => {
  debug(`App listening on port ${port}`);
});
