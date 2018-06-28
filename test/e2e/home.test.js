
describe('Home', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.home');
  });

  it('should have title and subtitle', async () => {
    await expect(page).toMatchElement('h1', { text: 'Erik Nielsen' });
    await expect(page).toMatchElement('h2', {
      text: 'Senior UI Software Engineer from Chicago, IL',
    });
  });
});
