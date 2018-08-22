
const apiServerConfig = require('../packages/api-server/lib/config');
const apiServerRoutes = require('../packages/api-server/lib/routes');

module.exports = (app) => {
  apiServerConfig(app);
  apiServerRoutes.forEach((route) => {
    route(app);
  });
};
