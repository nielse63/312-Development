
const Case = require('case');
const pkg = require('../../../package.json');

module.exports = {
  title:       Case.capital(pkg.name),
  description: pkg.description,
  template:    'readme',
  badges:      [
    {
      title: 'Build Status',
      src:   'https://travis-ci.org/nielse63/312-Development.svg?branch=master',
      href:  'https://travis-ci.org/nielse63/312-Development',
    },
    {
      title: 'Coverage Status',
      src:   'https://coveralls.io/repos/github/nielse63/312-Development/badge.svg?branch=master',
      href:  'https://coveralls.io/github/nielse63/312-Development?branch=master',
    },
    {
      title: 'Code Climate',
      src:   'https://codeclimate.com/github/nielse63/312-Development/badges/gpa.svg',
      href:  'https://codeclimate.com/github/nielse63/312-Development',
    },
    {
      title: 'dependencies Status',
      src:   'https://david-dm.org/nielse63/312-Development/status.svg',
      href:  'https://david-dm.org/nielse63/312-Development',
    },
    {
      title: 'devDependencies Status',
      src:   'https://david-dm.org/nielse63/312-Development/dev-status.svg',
      href:  'https://david-dm.org/nielse63/312-Development?type=dev',
    },
    {
      title: 'Known Vulnerabilities',
      src:   'https://snyk.io/test/github/nielse63/312-development/badge.svg',
      href:  'https://snyk.io/test/github/nielse63/312-development) [![Greenkeeper badge](https://badges.greenkeeper.io/nielse63/312-Development.svg)](https://greenkeeper.io/',
    },
    {
      title: 'lerna',
      src:   'https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg',
      href:  'https://lernajs.io/',
    },
  ],
};
