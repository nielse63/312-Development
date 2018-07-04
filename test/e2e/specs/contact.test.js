
describe('Contact', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/contact-me');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.view-contact', { timeout: 1000 });
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'Contact Me' });
  });
});
