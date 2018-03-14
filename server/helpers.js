
const helmet = require('helmet');

module.exports.isProduction = function isProduction() {
  return process.env.IS_HEROKU;
};

module.exports.loadENV = function loadENV() {
  if (!process.env.IS_HEROKU && !process.env.TRAVIS) {
    require('dotenv').config();
  }
};

module.exports.setupEnv = function setupEnv(app) {
  app.set('env', (process.env.NODE_ENV || 'development'));
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
};
