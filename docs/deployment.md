# Deployment

## Build Process

To build for production, execute the script `yarn build` - this simple compiled the source files using [Webpack](https://webpack.js.org/).  Files are compiled to the `dist/` directory.

For production releases, this script is called during the `heroku-postbuild` hook of the Heroku deployment process.

### Pertinent Files

* `build/webpack.prod.js` - Webpack config used when `NODE_ENV` is ‘production’

### Resources

* [Webpack - Building for Production](https://webpack.js.org/guides/production/)
* [Heroku Specific Build Steps](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)

## Releasing

Staging and production releases are automated using [Travis CI’s deployment build stage](https://docs.travis-ci.com/user/deployment/heroku/). A deployment will occur after a successful merge into master, and only after a successful Travis run.

The deploy stage in Travis essentially just pushes the code on the master branch of the GitHub repo into the specified Heroku app.

**Note:** Changes are only pushed to the staging application and requires manual verification before a production release can begin. This is to ensure that I have my eyes on every release, and nothing gets shipped without me manually moving it.

Once the app is deployed to the staging app, dependencies will be installed and the `heroku-postbuild` hook is executed. **This is where we compile the production application.** After a clean build, the resulting static assets are served up using the [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).

### Pertinent Files

* `bin/heroku-postbuild` - Script executed during the `heroku-postbuild` release hook
* `.travis.yml` - Config file for Travis CI

### Resources

* [Heroku Specific Build Steps](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)
