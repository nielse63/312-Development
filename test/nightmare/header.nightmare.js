
import path from 'path'
import url from 'url'
import { expect } from 'chai'

module.exports = function () {
  describe(`Header (${utils.URLS.home})`, () => {
    let data = {}

    before(() => nightmare
        .viewport(utils.VIEWPORT.width, utils.VIEWPORT.height)
        .goto(utils.URLS.home)
        .wait('[data-header]')
        .wait(1000)
        .evaluate(() => {
          const header = document.querySelector('[data-header]')
          const logo = document.querySelector('[data-header] h1')
          const nav = document.querySelector('[data-header] nav')
          const navItems = document.querySelectorAll('[data-header] nav a')
          const navItemsArray = [].slice.call(navItems)
          const style = window.getComputedStyle(header)

          return {
            header: {
              exists: !!header,
              width: header.clientWidth,
              height: header.clientHeight
            },
            logo: {
              exists: !!logo,
              width: logo.clientWidth,
              height: logo.clientHeight,
              left: logo.offsetLeft,
              color: window.getComputedStyle(document.querySelector('[data-header] h1 a')).color
            },
            nav: {
              exists: !!nav,
              right: window.innerWidth - ((nav.offsetLeft + nav.clientWidth) - 15),
              items: navItemsArray.map(item => {
                const itemStyle = window.getComputedStyle(item)
                return {
                  paddingLeft: itemStyle.paddingLeft,
                  paddingRight: itemStyle.paddingRight
                }
              }),
              links: navItemsArray.map(item => item.href)
            }
          }
        })
        .then(d => {
          data = d
        })
        .catch(e => {
          throw e
        }))

    describe('Header items', () => {
      it('should have header', () => expect(data.header.exists).to.be.true)
      it('should have logo', () => expect(data.logo.exists).to.be.true)
      it('should have nav', () => expect(data.nav.exists).to.be.true)
    })

    describe('Nav Links', () => {
      let links = {
        length: 0,
        urls: []
      }

      function testNavLinks(givenURL, expectedPath) {
        const object = url.parse(givenURL)
        expect(object.pathname).to.equal(expectedPath)
      }

      before(() => {
        links = {
          length: data.nav.items.length,
          urls: data.nav.links
        }
      })

      it('should have 4 links', () => {
        expect(links.length).to.equal(4)
      })

      it('should have home link first', () => {
        testNavLinks(links.urls[0], '/')
      })

      it('should have about link second', () => {
        testNavLinks(links.urls[1], '/about')
      })

      it('should have portfolio link third', () => {
        testNavLinks(links.urls[2], '/portfolio')
      })

      it('should have contact link fourth', () => {
        testNavLinks(links.urls[3], '/contact')
      })
    })

    describe('Header Style', () => {
      it('validate header styles', () => {
        expect(data.header.width).to.equal(utils.VIEWPORT.width)
        expect(data.header.height).to.equal(66)
      })

      it('validate logo styles', () => {
        expect(data.logo.width).to.equal(218)
        expect(data.logo.height).to.equal(66)
        expect(data.logo.left).to.equal(50)
        expect(data.logo.color).to.equal('rgb(249, 247, 249)')
      })

      it('validate nav styles', () => {
        expect(data.nav.right).to.equal(50)
        data.nav.items.forEach(item => {
          expect(item.paddingLeft).to.equal('15px')
          expect(item.paddingRight).to.equal('15px')
        })
      })
    })
  })
}
