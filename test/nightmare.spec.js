/* eslint-disable global-require */

if (!process.env.CI) {
  require('./nightmare')
}
