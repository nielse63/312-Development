
const express = require('express');
const debug = require('debug');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const API_PORT = process.env.PORT || 9999;

app.use('/api/messages', bodyParser.json());
app.use('/api/messages', bodyParser.urlencoded({
  extended: true,
}));
app.set('env', (process.env.NODE_ENV || 'development'));
app.set('etag', 'strong');
app.disable('x-powered-by');

routes.forEach((route) => {
  route(app);
});

app.listen(API_PORT, () => {
  debug('312_API')(`App listening on port ${API_PORT}`);
});
