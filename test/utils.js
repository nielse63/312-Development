
const Nightmare = require('nightmare')
const expect = require('chai').expect
const config = require('../package.json')

export const urls = {
  home: `${config.homepage}/`,
  about: `${config.homepage}/about`,
  portfolio: `${config.homepage}/portfolio`,
  contact: `${config.homepage}/contact`,
}

export function elementExists(selector, url, done) {
  new Nightmare().goto(url)
    .wait(selector)
    .exists(selector)
    .end()
    .then(result => {
      expect(result).to.be.true
      done()
    })
    .catch(error => {
      console.error(`${selector} no found at ${url}:`, error)
      done()
    })
}
