
describe('Portfolio', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/portfolio');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.view-portfolio');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'Portfolio' });
  });
});
