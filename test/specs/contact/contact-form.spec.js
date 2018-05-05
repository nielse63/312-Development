
const chai = require('chai');
const { newBrowser, newPage, urlForPage } = require('../../browser');

const { expect } = chai;

let browser;
let page;

describe('ContactForm', () => {
  before(async () => {
    browser = await newBrowser();
    page = await newPage(browser);
    await page.goto(urlForPage());
  });

  after(async () => {
    await browser.close();
  });

  it('component should exist', async () => {
    const componentLength = await page.$$eval('.contact-form', divs => divs.length);
    expect(componentLength).to.equal(1);
  });
});
