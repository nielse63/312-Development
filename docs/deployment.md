# Deployment

> *"The key to following the continuous delivery path is to continually question your own assumptions about what’s possible."*
>
> **-- Jeff Sussna**

## Build Process

To build for production, execute the script `yarn build` - this simple compiled the source files using [Webpack](https://webpack.js.org/).  Files are compiled to the `dist/` directory.

For production releases, the app is build using the `bin/deploy` script, which (for the time being) must be run manually.

See the [webpack production configuration](../build/webpack.prod.conf.js) for the full production build process.

## Releasing

Staging releases are automated through the [Heroku GitHub Integration service](https://devcenter.heroku.com/articles/github-integration), with each successful merge into the master branch creating a new release. Prior to release, however, the [Travis CI tests](https://travis-ci.org/nielse63/312-Development) must pass.

Following a successful staging release, I validate the changes on the staging site. Once checked, I [manually promote the staging release](https://devcenter.heroku.com/articles/pipelines#promoting) to the production application in the pipeline.

The promotion from staging to production is done manually on purpose - to ensures that any code that is moved to production has been manually verified by me. Performing a release this way means I cannot blame a broken production site on a faulty release pipeline script.
