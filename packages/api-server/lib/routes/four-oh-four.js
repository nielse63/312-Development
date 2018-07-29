
module.exports = (app) => {
  app.use((req, res) => {
    if (/^\/api/.test(req.path)) {
      res.status(404).json({ error: 'Endpoint not found' });
      return;
    }
    res.status(404).json({ error: 'Page not found' });
  });
};
