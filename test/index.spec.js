
import * as utils from './utils'

const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should

function basicPageSuite(url) {
  describe(url, function () {
    it('should have container when loaded', function (done) {
      this.timeout(5000)
      utils.elementExists('#app', url, done)
    })

    it('should have header when loaded', function (done) {
      this.timeout(5000)
      utils.elementExists('#app > header', url, done)
    })

    it('should have footer when loaded', function (done) {
      this.timeout(5000)
      utils.elementExists('#app > footer', url, done)
    })
  })
}

describe('Check Page Status', () => {
  for (const page in utils.urls) {
    const url = utils.urls[page]
    basicPageSuite(url)
  }
})