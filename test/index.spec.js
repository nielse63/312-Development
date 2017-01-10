/* global exec */

import * as utils from './utils'

if (process.env.CI) {
  process.exit()
}

require('shelljs/global')
const expect = require('chai').expect
const spawn = require('child_process').spawn

// on exit
process.on('exit', code => {
  console.log(`About to exit with code: ${code}`)
  console.log(process.pid)
})

// tests
const headerTest = require('./header.nightmare')

const nightmareTests = [
  headerTest,
]
let yarn = null
let notDone = true

describe('All Tests', function () {
  this.timeout(0)

  before(function () {
    return new Promise(function (resolve, reject) {
      const cwd = process.cwd()
      console.log('=== Creating new build ===')
      yarn = spawn('yarn', ['run', 'local'], {
        cwd,
        env: Object.assign({
          NODE_ENV: 'production',
          IS_LOCAL: true,
          WEB_CONCURRENCY: 1,
        }, process.env),
      })
      // yarn.stdout.on('data', data => {
      //   if (data.indexOf('WEB_CONCURRENCY') > -1) {
      //     console.log(`data: ${data}`)
      //   }
      // })
      yarn.stdout.on('data', data => {
        if (notDone && data.indexOf('Viewable at http://localhost:5000') > -1) {
          notDone = false
          resolve()
        }
      })
      yarn.on('close', code => {
        console.log(`=== yarn exited with code ${code} ===`)
      })
    }).catch(function (err) {
      console.log(`err: ${err}`)
    })
  })

  after(function (done) {
    yarn.kill()
    setTimeout(function () {
      done()
    }, 250)
  })

  describe('Check Page Status', function () {
    Object.keys(utils.URLS).forEach(page => {
      const url = utils.URLS[page]

      describe(url, function () {
        it('page should be visible', function (done) {
          exec(`curl -I ${url} 2>/dev/null | head -n 1 | cut -d$' ' -f2`, {
            silent: true,
          }, function (code, stdout, stderr) {
            if (code) return done(`error: ${stderr}`)
            const status = parseInt(stdout, 10)
            expect(status).to.be.within(200, 300)
            return done()
          })
        })
      })
    })
  })

  describe('Nightmare', function () {
    nightmareTests.forEach(function (test) {
      test()
    })
  })
})
