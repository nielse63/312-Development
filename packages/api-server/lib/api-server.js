
const express = require('express');
const debug = require('debug');
const routes = require('./routes');
const config = require('./config');

const log = debug('312_API');
const app = express();
const API_PORT = process.env.PORT || 9999;

config(app);

routes.forEach((route) => {
  route(app);
});

app.listen(API_PORT, () => {
  log(`App listening on port ${API_PORT}`);
});
