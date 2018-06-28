
describe('Portfolio', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/portfolio');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.portfolio');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'Portfolio' });
  });
});
