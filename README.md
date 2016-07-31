# 312-Development

[Check out the Site](https://312development.com/) | [Follow me on Twitter](https://twitter.com/erikkylenielsen/)

[![Build Status](https://travis-ci.org/nielse63/312-Development.svg?branch=master)](https://travis-ci.org/nielse63/312-Development)
[![dependencies Status](https://david-dm.org/nielse63/312-Development/status.svg)](https://david-dm.org/nielse63/312-Development)
[![devDependencies Status](https://david-dm.org/nielse63/312-Development/dev-status.svg)](https://david-dm.org/nielse63/312-Development?type=dev)

## About This Repo

First and foremost, this repo is **not meant to be a tutorial or boilerplate** of any kind. This is simply the repo for my personal site, [312development.com](https://312development.com/), hoping to share the code I've used to create this latest iteration.

If you are, however, looking for tutorials and/or boilerplates I'd highly recommend reading [Survive.js](http://survivejs.com/), and I've found the [React Boilerplate](http://reactboilerplate.com/) to be extremely helpful.

<a href="mailto:erik@312development.com">Feel free to email me</a> with any questions you might have regarding how and why I did things the way I did and, as always, I welcome [any bugs you find and report](https://github.com/nielse63/312-Development/issues/new), as well as new [pull requests](https://github.com/nielse63/312-Development/compare).

### Error Reporting

If there's a bug in my code that you found, or you just think the design of my site is dumb, the best way to let me know is [loggin an issue](https://github.com/nielse63/312-Development/issues/new) within this repo.

## Technology & Tools

*This is just the highlight reel of all the tools I'm using on my site. To see all the giants whose shoulders I'm standing on, checkout the [package.json](https://github.com/nielse63/312-Development/blob/master/package.json) file.*
### Frameworks & Build Tools:
* [React](https://facebook.github.io/react/) for rendering the UI & views
* [React Router](https://github.com/reactjs/react-router/) for handling routes
* [Flux](https://code.facebook.com/projects/1572329279676947/flux/) architecture for data flow management
* [Babel](http://babeljs.io/) for transpiling ES6
* [Webpack](http://webpack.github.io/) to bundle modules and handle workfloat automation
* [Express](http://expressjs.com/) for server side rendering (production only)

### Languages & Automation
* JS is written in [ES6 format](http://es6-features.org/#Constants)
* CSS is compiled from [Sass](http://sass-lang.com/)
* [Gulp](http://gulpjs.com/) was initially employed for workflow automation and a few tasks are still being employed
* Webpack, mentioned above, handles the bulk of the workflow:
	* Compiling Sass
	* Load optimization of bundled JS
	* Image and font file optimization

### Linting, Testing, and CI
* [Eslint](http://eslint.org/), executed in a custom Gulp task, validates the JS
* [SCSS-Lint](https://github.com/brigade/scss-lint) as a style type checker on .scss files
* Using [TravisCI](https://travis-ci.org/) for continuous integration, asset linting cannot fail in order for the build to pass
	* I'm in the process of writing functional unit tests ran through [Phantom](http://phantomjs.org/)
	* Unit and UAT tests are coming soon

## Third-Party Integrations

The app is deployed via [Heroku](https://heroku.com/), and incorporates several add-ons that can be easily incorporated through the platform:

* The SSL Endpoint, and certificate purchased via [DNSimple](https://dnsimple.com/)
* I installed [Librato](https://www.librato.com/) for HTTP request and memory usage monitoring
* The [Raygun](https://raygun.com/) SDK is used to track and alert me to any client-side errors a user may encounter. Another of their products, [Pulse](https://raygun.com/products/real-user-monitoring), which tracks client-side performance, user-experience satisfaction, and the load time of individual assets.
* Finally, I'm usng [KeenIO](https://keen.io/) for advanced analytics and user-data collection.
