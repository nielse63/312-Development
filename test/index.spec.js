
import * as utils from './utils'

const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should

function basicPageSuite(url) {
  describe(url, function () {
    this.timeout(0)

    it('should have container when loaded', function (done) {
      utils.elementExists('#app', url, done)
    })

    it('should have header when loaded', function (done) {
      utils.elementExists('#app > header', url, done)
    })

    it('should have footer when loaded', function (done) {
      utils.elementExists('#app > footer', url, done)
    })
  })
}

describe('Check Page Status', () => {
  const pages = Object.keys(utils.urls)
  pages.forEach(page => {
    const url = utils.urls[page]
    basicPageSuite(url)
  })
})
