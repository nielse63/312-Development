
describe('About', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/about-me');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.view-about-me');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'About Me' });
  });
});
