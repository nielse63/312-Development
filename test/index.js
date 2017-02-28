
// import { h, render } from 'preact'
// import './common'
// import app from '../'
// import Phantom from 'phantom'

// let server
// let phantom
// let page

describe('App', () => {
  // let scratch

  before(() => {
    console.log(document)
    // scratch = document.createElement('div')
    // console.log(scratch)(document.body || document.documentElement).appendChild(scratch)
  })

  it('should have tests', () => {
    console.log(document)
    true.should.equal(true)
  })
})

// const setupPage = async function () {
//   if (page) {
//     page.close()
//     page = null
//   }
//   page = await phantom.createPage()
//   await page.property('viewportSize', {
//     width: utils.VIEWPORT.width,
//     height: utils.VIEWPORT.height,
//   })
//   await page.open(utils.URLS.home)
//   return page
// }

// describe('312 Development Tests', function () {
//   this.timeout(5000)
//   this.retries(3)

//   before(done => {
//     server = app.start(async () => {
//       console.log('Test server started')
//       phantom = await Phantom.create([], {
//         ignoreSslErrors: 'yes',
//       })
//       done()
//     })
//   })

//   after(async () => {
//     await phantom.exit()
//     server.close()
//     phantom.kill()
//   })

//   describe('#status', () => {
//     before(async () => {
//       page = await phantom.createPage()
//     })

//     it('home', async () => {
//       const status = await page.open(utils.URLS.home)
//       status.should.equal('success')
//     })

//     it('about', async () => {
//       const status = await page.open(utils.URLS.about)
//       status.should.equal('success')
//     })

//     it('portfolio', async () => {
//       const status = await page.open(utils.URLS.portfolio)
//       status.should.equal('success')
//     })

//     it('contact', async () => {
//       const status = await page.open(utils.URLS.contact)
//       status.should.equal('success')
//     })
//   })

//   describe('#header', () => {
//     let header

//     before(async () => {
//       page = await setupPage()
//       header = await page.evaluate(() => {
//         const $header = document.querySelector('[data-header]')
//         return {
//           exists: !!$header,
//           width: $header.clientWidth,
//           height: $header.clientHeight,
//         }
//       })
//     })

//     it('should have header', () => {
//       header.exists.should.be.true // eslint-disable-line no-unused-expressions
//     })

//     it('header width', () => {
//       header.width.should.equal(utils.VIEWPORT.width)
//     })

//     it('header height', () => {
//       header.height.should.equal(66)
//     })
//   })

//   describe('#logo', () => {
//     let logo

//     before(async () => {
//       page = await setupPage()
//       logo = await page.evaluate(() => {
//         const $logo = document.getElementById('logo')
//         return {
//           exists: !!$logo,
//           width: $logo.clientWidth,
//           height: $logo.clientHeight,
//           left: $logo.offsetLeft,
//         }
//       })
//     })

//     it('should have logo', () => {
//       logo.exists.should.be.true // eslint-disable-line no-unused-expressions
//     })

//     it('logo width', () => {
//       logo.width.should.equal(218)
//     })

//     it('logo height', () => {
//       logo.height.should.equal(66)
//     })

//     it('logo left', () => {
//       logo.left.should.equal(50)
//     })
//   })

//   describe('#nav', () => {
//     let nav

//     before(async () => {
//       page = await setupPage()
//       nav = await page.evaluate(() => {
//         const $nav = document.getElementById('header-nav')
//         const items = [].slice.call($nav.children)
//         return {
//           exists: !!$nav,
//           // right: window.innerWidth - (($nav.offsetLeft + $nav.clientWidth) - 15),
//           items: items.map(item => {
//             const itemStyle = window.getComputedStyle(item)
//             return {
//               paddingLeft: parseInt(itemStyle.paddingLeft, 10),
//               paddingRight: parseInt(itemStyle.paddingRight, 10),
//               href: item.href,
//             }
//           }),
//         }
//       })
//     })

//     it('should have nav', () => {
//       nav.exists.should.be.true // eslint-disable-line no-unused-expressions
//     })

//     it('nav item count', () => {
//       nav.items.length.should.equal(4)
//     })

//     // it('nav right', () => {
//     //   nav.right.should.equal(50)
//     // })

//     it('first nav link url', () => {
//       nav.items[0].href.should.equal(utils.URLS.home)
//     })

//     it('second nav link url', () => {
//       nav.items[1].href.should.equal(utils.URLS.about)
//     })

//     it('third nav link url', () => {
//       nav.items[2].href.should.equal(utils.URLS.portfolio)
//     })

//     it('fourth nav link url', () => {
//       nav.items[3].href.should.equal(utils.URLS.contact)
//     })

//     it('nav link padding', () => {
//       nav.items.forEach(item => {
//         item.paddingLeft.should.equal(15)
//         item.paddingRight.should.equal(15)
//       })
//     })
//   })
// })
