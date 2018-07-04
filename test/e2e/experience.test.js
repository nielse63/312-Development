
describe('Experience', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/experience');
  });

  it('should render correctly', async () => {
    await expect(page).toMatchElement('.view-experience');
  });

  it('should have title', async () => {
    await expect(page).toMatchElement('h1', { text: 'My Experience' });
  });
});
