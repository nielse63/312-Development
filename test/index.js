
var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true
});

nightmare
  .goto('http://localhost:3000')
  // .type('form[action*="/search"] [name=p]', 'github nightmare')
  // .click('form[action*="/search"] [type=submit]')
  // .wait('#main')
  .evaluate(function () {
    const app = document.getElementById('app')
    if( ! app ) {
      return 'Unable to find #app'
    }
    return 'Found #app'
  })
  .end()

  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });