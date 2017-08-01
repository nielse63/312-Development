
const path = require('path');
const fs = require('fs');

function isProduction(app) {
  return process.env.NODE_ENV === 'production' || app.get('env') === 'production';
}

function loadENV() {
  if (fs.existsSync(path.resolve(__dirname, '../.env'))) {
    require('dotenv').config();
  }
}

function setupEnv(app) {
  app.set('env', (process.env.NODE_ENV || 'development'));
  app.set('etag', 'strong');
  app.disable('x-powered-by');
}

module.exports = {
  isProduction,
  loadENV,
  setupEnv,
};
