
const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./send-email');
const getTweets = require('./get-tweets');
const { loadENV, setupEnv } = require('./helpers');

loadENV();

function setHeaders(req, res) {
  const referrer = req.get('referrer').replace(/\/$/g, '');
  if (referrer.indexOf(req.hostname) > -1) {
    res.header('Access-Control-Allow-Origin', referrer);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  }
}

const port = process.env.PORT || 3000;

const app = express();

// setup environment vars
setupEnv(app);

const oneDate = 24 * 60 * 60 * 1000;
app.use('/submission', bodyParser.json());
app.use('/submission', bodyParser.urlencoded({
  extended: true,
}));

app.get('*', (req, res, next) => {
  setHeaders(req, res);
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
    console.error(error);
    res.status(500).json(error);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
