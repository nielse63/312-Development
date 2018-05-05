
const express = require('express');
const path = require('path');

const port = process.env.PORT || 9999;
const staticDir = path.join(__dirname, 'dist');
const app = express();

// app.use(express.static(staticDir));
app.use('/', express.static(staticDir));
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
