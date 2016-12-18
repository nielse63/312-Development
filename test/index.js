
const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true,
})

nightmare
  .goto('http://localhost:3000')
  // .type('form[action*="/search"] [name=p]', 'github nightmare')
  // .click('form[action*="/search"] [type=submit]')
  // .wait('#main')
  .evaluate(() => {
    const app = document.getElementById('app')
    if (!app) {
      return 'Unable to find #app'
    }
    return 'Found #app'
  })
  .end()

  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.error('Search failed:', error)
  })
