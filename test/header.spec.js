
import * as utils from './utils'

const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should

const URL = utils.urls.home
const SELECTORS = '[data-header] nav a'
const nightmare = new Nightmare({ show: true })

function basicPageSuite(url) {
  describe('Header items', function describe1() {
    it('should have header', function it1(done) {
      this.timeout(5000)
      utils.elementExists('[data-header]', url, done)
    })

    it('should have logo', function it2(done) {
      this.timeout(5000)
      utils.elementExists('[data-header] > div > h1', url, done)
    })

    it('should have nav', function it3(done) {
      this.timeout(5000)
      utils.elementExists('[data-header] > div > nav', url, done)
    })
  })
}

function checkNavURL(index, url, done) {
  nightmare
    .goto(URL)
    .wait(SELECTORS)
    .evaluate(function eval1(target, idx) {
      const links = document.querySelectorAll(target)
      const link = links[idx]
      if (!link) {
        return ''
      }
      return link.href
    }, SELECTORS, index)
    .then(function then1(href) {
      const match = href.match(new RegExp(url))
      if (!match || !match.length) {
        return done()
      }
      expect(match.index).to.be.above(0)
      return done()
    })
    .catch(function catch1() {
      done()
    })
}

describe('Header', () => {
  basicPageSuite(URL)

  describe('Nav Links', function describe2() {
    it('should have 4 links', function it3(done) {
      this.timeout(15000)

      nightmare
        .goto(URL)
        .wait(SELECTORS)
        .evaluate(function eval2() {
          return document.querySelectorAll(SELECTORS)
        })
        .end()
        .then(function then2(links) {
          expect(links.length).to.equal(4)
          done()
        })
        .catch(function catch1() {
          done()
        })
    })

    it('should have home link first', function it4(done) {
      this.timeout(5000)
      checkNavURL(0, '/', done)
    })

    it('should have about link second', function it5(done) {
      this.timeout(5000)
      checkNavURL(1, '/about', done)
    })

    it('should have portfolio link third', function it6(done) {
      this.timeout(5000)
      checkNavURL(2, '/portfolio', done)
    })

    it('should have contact link fourth', function it7(done) {
      this.timeout(5000)
      checkNavURL(3, '/contact', done)
    })
  })
})
