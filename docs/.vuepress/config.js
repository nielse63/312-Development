
const path = require('path');
const pkg = require('../../package.json');

module.exports = {
  title:       pkg.title,
  description: pkg.description,
  base:        '/312-Development/',
  dest:        path.join(__dirname, 'dist'),
  themeConfig: {
    lastUpdated: 'Last Updated',

    // sidebar
    displayAllHeaders: true,
    sidebar:           [
      ['/', 'Home'],
      ['/motivation', 'Motivation & Goals'],
      ['/packages', 'Packages'],
      ['/development', 'Development'],
      ['/testing', 'Testing'],
      ['/deployment', 'Deployment'],
      ['/documentation', 'Documentation'],
      ['/third-party-integrations', 'Third Party Integrations'],
      ['/acknowledgements', 'Acknowledgements & Testing'],
    ],

    // repo settings
    repo:       'nielse63/312-Development',
    docsBranch: 'gh-pages',
    editLinks:  true,
  },
};
