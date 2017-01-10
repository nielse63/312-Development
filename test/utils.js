
const config = require('../package.json')

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
