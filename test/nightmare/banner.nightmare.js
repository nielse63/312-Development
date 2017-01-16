
import path from 'path'
import { expect } from 'chai'

module.exports = function (urlToCheck = utils.URLS.home) {
  describe(`Banner (${urlToCheck})`, () => {
    let data = {}

    before(() => nightmare
        .evaluate(() => {
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
        .then(d => {
          data = d
        })
        .catch(e => {
          console.error(e)
        }))

    describe('Exists', () => {
      it('should have banner', () => expect(data.banner.exists).to.be.true)
    })

    describe('Font Sizes', () => {
      function testFontSize(element, size) {
        if (element) {
          expect(element).to.equal(size)
        }
      }

      it('h1 font size', () => {
        testFontSize(data.fonts.h1, '94px')
      })

      it('h2 font size', () => {
        testFontSize(data.fonts.h2, '88px')
      })

      it('h3 font size', () => {
        testFontSize(data.fonts.h3, '40px')
      })
    })
  })
}
