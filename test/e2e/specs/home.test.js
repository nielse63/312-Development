
describe('Home', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.home', { timeout: 1000 });
  });

  it('should have title and subtitle', async () => {
    await expect(page).toMatchElement('h1', { text: 'Erik Nielsen' });
    await expect(page).toMatchElement('h2', {
      text: 'Senior UI Software Engineer from Chicago, IL',
    });
  });
});
