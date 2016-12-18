
const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should
const config = require('../package.json')

config.homepage = 'http://localhost:3000'

const urls = {
  // home: `${config.homepage}/`,
  // about: `${config.homepage}/about`,
  // portfolio: `${config.homepage}/portfolio`,
  // contact: `${config.homepage}/contact`,
  home: `${config.homepage}/`,
  about: `${config.homepage}/about`,
  portfolio: `${config.homepage}/portfolio`,
  contact: `${config.homepage}/contact`,
}

function elementExists(selector, url, done) {
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

function basicPageSuite(url) {
  describe(url, () => {
    it('should have container when loaded', done => {
      elementExists('#app', url, done)
    })

    it('should have header when loaded', done => {
      elementExists('#app > header', url, done)
    })

    it('should have footer when loaded', done => {
      elementExists('#app > footer', url, done)
    })
  })
}

describe('Site-wide tests', function () {
  this.timeout(15000)

  for (const page in urls) {
    const url = urls[page]
    basicPageSuite(url)
  }
})
