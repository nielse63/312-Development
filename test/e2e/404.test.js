
describe('404', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/not-found');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.four-oh-four');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'Page Not Found' });
  });
});
