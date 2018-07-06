const mockRepo = require('../mocks/repo');
const mockStats = require('../mocks/stats');

const repos = mockRepo();

module.exports = (app) => {
  app.get('/github/repos', (request, response) => {
    response.json(repos);
  });

  app.get('/github/:repo/stats', (request, response) => {
    const stats = mockStats();
    response.json(stats);
  });
};
