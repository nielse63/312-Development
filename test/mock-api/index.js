const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());
  // Register all routes inside mock-api/routes.
  fs.readdirSync(path.join(__dirname, 'routes')).forEach((routeFileName) => {
    if (/\.js$/.test(routeFileName)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      require(`./routes/${routeFileName}`)(app);
    }
  });
};
