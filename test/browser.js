
const puppeteer = require('puppeteer');

const DEFAULTS = {
  viewport: {
    width:  1280,
    height: 630,
  },
};

module.exports.newBrowser = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  return browser;
};

module.exports.newPage = async (browser, viewport = DEFAULTS.viewport) => {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  return page;
};

module.exports.urlForPage = (path = '') => {
  const port = process.env.PORT || 9999;
  return `http://localhost:${port}/#/${path}`;
};
