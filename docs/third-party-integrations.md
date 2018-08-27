# Third-Party Tools

This site relies on the use of third-party systems and tools to help ensure that the code quality and outcome is of the highest standard. Below are a list of a few third-party services that are integrated with this app.

## Travis CI

- [312 Development on Travis CI](https://travis-ci.org/nielse63/312-Development)

Travis is used as a CI/CD pipeline that automated releases and production builds, as well as validating no updates cause breaking changes.

View the [`.travis.yml`](../.travis.yml) to see the full config.

## Coveralls

- [Coverage Reports from Coveralls](https://coveralls.io/github/nielse63/312-Development)

Coveralls is my test coverage reporting service of choice. Following a successful Travis run test coverage is reported to Coveralls, with the results displayed on a badge in [the main project README](../README.md).

## Code Climate

- [Automated Code Reviews with Code Climate](https://codeclimate.com/github/nielse63/312-Development)

CodeClimate is used automate code reviews, and hold me accountable for the state of the project. The service checks for things like cognitive complexity, duplicate code, and a number of other things. The results are quantified as a “maintainability score” and displayed on a repo badge.

## Snyk

- [Dependency Security](https://app.snyk.io/org/nielse63/project/3d379b3c-fc9d-46a4-9949-d169887f3588/)

I use Snyk as my security service of choice. At regular intervals (every 24 hours) Snyk audits my dependencies for any security vulnerabilities, and notifies me of any negative changes that might leave my app susceptible to attack.

## Greenkeeper

- [Keeping dependencies up to date with Greenkeeper](https://account.greenkeeper.io/account/nielse63)

GreenKeeper is a service that automatically updates project dependencies and runs all tests to ensure an update doesn’t cause breaking changes. As a result, the node modules I rely on to development and build the app are kept up at the latest version.
