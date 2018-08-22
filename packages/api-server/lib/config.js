
const bodyParser = require('body-parser');
const corser = require('corser');
const debug = require('debug');

const log = debug('312_API');

module.exports = (app) => {
  app.use(corser.create());
  app.use('/api/messages', bodyParser.json());
  app.use('/api/messages', bodyParser.urlencoded({
    extended: true,
  }));
  app.set('env', (process.env.NODE_ENV || 'development'));
  app.set('etag', 'strong');
  app.disable('x-powered-by');

  app.get('/api/**', (req, res, next) => {
    log(`Request: ${req.path}`);
    next();
  });

  app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
};
