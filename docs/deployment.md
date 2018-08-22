# Deployment

The app is deployed to Heroku, using the
[static build pack plugin](https://github.com/heroku/heroku-buildpack-static)
to serve static assets. Here are the steps taken to deploy the app:

- A Travis run is kicked off by a merged PR
- Assuming the execution doesn't fail, a [Travis deploy script](https://docs.travis-ci.com/user/deployment/heroku/) kicks off
- Once the source assets are deployed, the static app is build by running `yarn build`
- The static buildpack plugin deploys the files, following the configuration set in [`static.json`](../static.json)
