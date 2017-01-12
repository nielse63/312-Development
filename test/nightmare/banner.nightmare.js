
import path from 'path'
import * as utils from '../utils'

const Nightmare = require('nightmare')
const expect = require('chai').expect

module.exports = function (urlToCheck = utils.URLS.home) {
  describe(`Banner (${urlToCheck})`, function () {
    const nightmare = new Nightmare()
    let data = {}

    before(function () {
      return nightmare
          .viewport(utils.VIEWPORT.width, utils.VIEWPORT.height)
          .goto(urlToCheck)
          .wait('#app')
          .wait(1500)
          .evaluate(function () {
            const selector = '[class^="banner_"]'
            const banner = document.querySelector(selector)
            const h1 = document.querySelector(`${selector} h1`)
            const h2 = document.querySelector(`${selector} h2`)
            const h3 = document.querySelector(`${selector} h3`)
            return {
              banner: {
                exists: !!banner,
              },
              fonts: {
                h1: !!h1 && window.getComputedStyle(h1).fontSize,
                h2: !!h2 && window.getComputedStyle(h2).fontSize,
                h3: !!h3 && window.getComputedStyle(h3).fontSize,
              },
            }
          })
          .end()
          .then(function (d) {
            data = d
          })
          .catch(function (e) {
            console.error(e)
          })
    })

    describe('Exists', function () {
      it('should have banner', function () {
        expect(data.banner.exists).to.be.true
      })
    })

    describe('Font Sizes', function () {
      function testFontSize(element, size) {
        if (element) {
          expect(element).to.equal(size)
        }
      }

      it('h1 font size', function () {
        testFontSize(data.fonts.h1, '94px')
      })

      it('h2 font size', function () {
        testFontSize(data.fonts.h2, '88px')
      })

      it('h3 font size', function () {
        testFontSize(data.fonts.h3, '40px')
      })
    })
  })
}
