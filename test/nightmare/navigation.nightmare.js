
import { expect } from 'chai'

function runNightmare(n, expectedURL) {
  return nightmare
    .click(`[data-header] nav a:nth-child(${n})`)
    .wait(500)
    .evaluate(function () {
      return window.location.href
    })
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

    it('first link should navigate to home', function () {
      return runNightmare(1, utils.URLS.home)
    })
  })
}
