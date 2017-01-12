
// const config = require('../package.json')
const config = {
  homepage: 'http://localhost:3001',
}

exports.URLS = {
  home: `${config.homepage}/`,
  about: `${config.homepage}/about`,
  portfolio: `${config.homepage}/portfolio`,
  contact: `${config.homepage}/contact`,
}

exports.VIEWPORT = {
  width: 1350,
  height: 650,
}

exports.TRANSITION_DURATION = 1600
