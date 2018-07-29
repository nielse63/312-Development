const baseFetch = require('../fetch');

const fetch = url => baseFetch(url, {
  Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
});

module.exports = (app) => {
  Object.entries({
    '/api/github/gists': 'https://api.github.com/users/nielse63/gists',
    '/api/github/user':  'https://api.github.com/users/nielse63',
    '/api/github/repos': 'https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed&per_page=200',
  }).forEach(([path, url]) => {
    app.get(path, async (req, res) => {
      const { status, data } = await fetch(url);
      res.status(status).json(data);
    });
  });
};
