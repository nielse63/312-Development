
const helmet = require('helmet');

function isProduction() {
  return process.env.IS_HEROKU;
}

function loadENV() {
  if (!process.env.IS_HEROKU && !process.env.IS_TRAVIS) {
    require('dotenv').config();
  }
}

function setupEnv(app) {
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
}

module.exports = {
  isProduction,
  loadENV,
  setupEnv,
};
