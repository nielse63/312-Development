// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '@tags': ['home'],
  Home: function test(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.home')
      .assert.containsText('h1', 'ERIK NIELSEN');
  },
  Accessible: function test(browser) {
    browser.axeInject();
    browser.axeRun();
  },
  End: function test(browser) {
    browser.end();
  },
};
