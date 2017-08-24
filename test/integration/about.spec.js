
import test from 'ava';
import { newBrowser, newPage, urlForPage } from './utils';

let browser;
let page;

test.before(async (t) => {
  browser = await newBrowser();
  if (!browser) {
    return;
  }
  page = await newPage(browser);
  page.on('error', (error) => {
    t.fail(error);
  });
  await page.goto(
    urlForPage('about')
  );
  await page.waitForSelector('#app');
});

test.after(async () => {
  if (!browser) {
    return;
  }
  await browser.close();
});

test('About Loads Page', async (t) => {
  const about = await page.$('.about');
  t.not(about, null);
});

test('About Page Title', async (t) => {
  const element = await page.$('.page-title');
  t.not(element, null);

  const title = await element.evaluate(() => document.body.querySelector('.page-title').innerText);
  t.is(title, 'ABOUT ME');
});

test('Has Correct Number of Panels', async (t) => {
  const count = await page.evaluate(() => document.body.querySelectorAll('.panel').length);
  t.is(count, 3);
});

test('Correct Panel Titles', async (t) => {
  const titles = await page.evaluate(() => {
    const panels = document.body.querySelectorAll('.panel');
    const output = [];
    panels.forEach((panel) => {
      const title = panel.querySelector('.panel__title').innerText;
      output.push(title);
    });
    return output;
  });
  t.is(titles.length, 3);
  t.is(titles[0], 'About Me');
  t.is(titles[1], 'Open Source Work');
  t.is(titles[2], 'Resume');
});

test.skip('Pulling in Open Source Work', async (t) => {
  await page.waitFor('.card');
  const count = await page.evaluate(() => {
    const panels = document.body.querySelectorAll('.panel');
    const panel = panels.item(1);
    return panel.querySelectorAll('.card').length;
  });
  t.is(count, 6);
});
