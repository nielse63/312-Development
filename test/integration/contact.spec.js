
import test from 'ava';
import { newBrowser, newPage } from './utils';

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
  await page.goto('http://localhost:9999/#/contact');
  await page.waitForSelector('#app');
});

test.after(async () => {
  if (!browser) {
    return;
  }
  await browser.close();
});

test('Contact Loads Page', async (t) => {
  const contact = await page.$('.contact');
  t.not(contact, null);
});

test('Contact Page Title', async (t) => {
  const element = await page.$('.page-title');
  t.not(element, null);

  const title = await element.evaluate(() => document.body.querySelector('.page-title').innerText);
  t.is(title, 'CONTACT ME');
});

test('Has Correct Number of Panels', async (t) => {
  const count = await page.evaluate(() => document.body.querySelectorAll('.panel').length);
  t.is(count, 1);
});

test('Correct Panel Titles', async (t) => {
  const titles = await page.evaluate(() => {
    const panels = document.body.querySelectorAll('.panel');
    const output = [];
    panels.forEach((panel) => {
      panel.querySelectorAll('.panel__title').forEach((element) => {
        output.push(element.innerText);
      });
    });
    return output;
  });
  t.is(titles.length, 2);
  t.is(titles[0], 'Shoot Me a Message');
  t.is(titles[1], 'Latest Tweets');
});

test('Has a Form', async (t) => {
  const form = page.$('form');
  t.not(form, null);
  [
    'first-name',
    'last-name',
    'email',
    'message',
  ].forEach((name) => {
    const field = page.$(`[name="${name}"]`);
    t.not(field, null);
  });
});
