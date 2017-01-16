
import { expect } from 'chai'

function runNightmare(n, expectedURL) {
  return nightmare
    .click(`[data-header] nav a:nth-child(${n})`)
    .wait(500)
    .evaluate(() => window.location.href)
    .then(url => {
      expect(url).to.equal(expectedURL)
    })
    .catch(e => {
      throw e
    })
}

module.exports = function () {
  describe('Validate Navigation', () => {
    it('second link should navigate to about', () => runNightmare(2, utils.URLS.about))
    it('third link should navigate to portfolio', () => runNightmare(3, utils.URLS.portfolio))
    it('fourth link should navigate to contact', () => runNightmare(4, utils.URLS.contact))
    it('first link should navigate to home', () => runNightmare(1, utils.URLS.home))
  })
}
