
describe('Home', () => {
  before(async () => {
    await page.goto('http://localhost:8080/#/');
  });

  it('should exist', async () => {
    const element = await page.$('.home');
    expect(element).not.to.be.null;
  });

  it('should have title and subtitle', async () => {
    const h1 = await page.$('h1');
    const h2 = await page.$('h2');
    expect(h1).not.to.be.null;
    expect(h2).not.to.be.null;
  });
});
