# 312-Development

[Check out the Site](https://312development.com/) | [Follow me on Twitter](https://twitter.com/erikkylenielsen/)

[![Build Status](https://travis-ci.org/nielse63/312-Development.svg?branch=master)](https://travis-ci.org/nielse63/312-Development)
[![Coverage Status](https://coveralls.io/repos/github/nielse63/312-Development/badge.svg?branch=master)](https://coveralls.io/github/nielse63/312-Development?branch=master)
[![Code Climate](https://codeclimate.com/github/nielse63/312-Development/badges/gpa.svg)](https://codeclimate.com/github/nielse63/312-Development)
[![dependencies Status](https://david-dm.org/nielse63/312-Development/status.svg)](https://david-dm.org/nielse63/312-Development)
[![devDependencies Status](https://david-dm.org/nielse63/312-Development/dev-status.svg)](https://david-dm.org/nielse63/312-Development?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/nielse63/312-development/badge.svg)](https://snyk.io/test/github/nielse63/312-development)

## About This Repo

First and foremost, this repo is not meant to be a tutorial or boilerplate of any kind. This is simply the repo for [my personal site](https://312development.com/), hoping to share the code I've used to create this latest iteration.

[Feel free to email me](mailto:erik@312development.com) with any questions you might have regarding how and why I did things the way I did and, as always, I welcome [any bugs you find and report](https://github.com/nielse63/312-Development/issues/new), as well as new [pull requests](https://github.com/nielse63/312-Development/compare).

## Technology & Tools

This is just the highlight reel of all the tools I'm using on my site. To see all the giants whose shoulders I'm standing on, checkout the [package.json](https://github.com/nielse63/312-Development/blob/master/package.json) file.

### The Base

![Vue.js](static/img/vue.png)
![Webpack](static/img/webpack.png)
![Yarn](static/img/yarn.png)

I built my site using the Vue.js framework, running on Webpack-based build system, with Yarn as my package manager of choice.

### Production

![Heroku](static/img/heroku.png)
![Express](static/img/express.png)
![PM2](static/img/pm2.png)

The production server is running on Express and I'm using PM2 for process management and load-balancing. The site is hosted on Heroku, using the Node.js buildpack.

### Transpiling

![Babel](static/img/babel.png)
![PostCSS](static/img/postcss.png)
![ESLint](static/img/eslint.png)
![StyleLint](static/img/stylelint.png)

All JavaScript is written in ES6+, and style is transpiled from SCSS. As such, I'm using Babel and PostCSS to transpile the development code to be production ready. These modules work in congruency with ESLint and StyleLint to maintain code quality and style.

### Testing

![Mocha](static/img/mocha.png)
![Chai](static/img/chai.png)
![Karma](static/img/karma.png)
![Nightwatch](static/img/nightwatch.png)
![Travis](static/img/travis-ci.png)

Just like any professional project, I wanted to have my code tested. Tests are run by Karma, using Mocha as the test framework and Chai as the assertion library. End-to-end and integration tests are done in Nightwatch, and all test suites must pass in Travis before a deployment can proceed.

### Other Services

![CodeClimate](static/img/codeclimate.png)
![Coveralls](static/img/coveralls.png)
![Snyk](static/img/snyk.png)
![David](static/img/david.png)

I'm running my code through several third-party services including: **CodeClimate** to maintain code quality; **Coveralls** for test coverage; **Snyk** to watch for any vulnerabilities in my NPM packages; and **David** to ensure my dependencies are up to date.

## Found a Bug?

If there's a bug in my code that you found, or you just think the design of my site is dumb, the best way to let me know is [logging an issue](https://github.com/nielse63/312-Development/issues/new).
