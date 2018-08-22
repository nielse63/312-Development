
const express = require('express');
const debug = require('debug');
const routes = require('./routes');
const config = require('./config');

const log = debug('312_API');
const app = express();
const API_PORT = process.env.PORT || 9999;

config(app);
// app.use(corser.create());
// app.use('/api/messages', bodyParser.json());
// app.use('/api/messages', bodyParser.urlencoded({
//   extended: true,
// }));
// app.set('env', (process.env.NODE_ENV || 'development'));
// app.set('etag', 'strong');
// app.disable('x-powered-by');

// app.get('/api/**', (req, res, next) => {
//   log(`Request: ${req.path}`);
//   next();
// });

// app.get('/api/status', (req, res) => {
//   res.status(200).json({ status: 'ok' });
// });

routes.forEach((route) => {
  route(app);
});

app.listen(API_PORT, () => {
  log(`App listening on port ${API_PORT}`);
});
