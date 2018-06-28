
describe('About', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/about-me');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.about');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'About Me' });
  });
});
