
const puppeteer = require('puppeteer');
const { expect } = require('chai');

const oldBrowser = global.browser;
const oldPage = global.page;
const oldExpect = global.expect;

before(async () => {
  global.expect = expect;
  global.browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  global.page = await browser.newPage();
});

after(async () => {
  await browser.close();
  global.browser = oldBrowser;
  global.page = oldPage;
  global.expect = oldExpect;
});
