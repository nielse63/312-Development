
describe('Contact', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/contact-me');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.contact');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'Contact Me' });
  });
});
