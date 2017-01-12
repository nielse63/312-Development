
import * as utils from '../utils'

const Nightmare = require('nightmare')
const expect = require('chai').expect

function runNightmare(n, expectedURL) {
  const nightmare = new Nightmare()
  return nightmare
    .goto(utils.URLS.home)
    .wait('#app[class*="ready"]')
    .click(`[data-header] nav a:nth-child(${n})`)
    .wait(500)
    .evaluate(function () {
      return window.location.href
    })
    .end()
    .then(function (url) {
      expect(url).to.equal(expectedURL)
    })
    .catch(function (e) {
      throw e
    })
}

module.exports = function () {
  describe('Validate Navigation', function () {
    it('second link should navigate to about', function () {
      return runNightmare(2, utils.URLS.about)
    })

    it('third link should navigate to portfolio', function () {
      return runNightmare(3, utils.URLS.portfolio)
    })

    it('fourth link should navigate to contact', function () {
      return runNightmare(4, utils.URLS.contact)
    })
  })
}
