const fetch = require('../fetch');

module.exports = (app) => {
  app.get('/api/npm/packages', async (req, res) => {
    const { status, data } = await fetch('https://registry.npmjs.org/-/v1/search?text=author:nielse63');
    res.status(status).json(data);
  });

  app.get('/api/npm/downloads/:pkg', async (req, res) => {
    const date = new Date();
    const year = date.getFullYear() + 1;
    const to = `${year}-01-01`;
    const { status, data } = await fetch(`https://api.npmjs.org/downloads/point/2010-01-01:${to}/${req.params.pkg}`);
    res.status(status).json(data);
  });
};
