
describe('About', () => {
  before(async () => {
    await page.goto('http://localhost:8080/#/about-me');
  });

  it('should exist', async () => {
    const element = await page.$('.about');
    expect(element).not.to.be.null;
  });

  it('should have title', async () => {
    const h1 = await page.$('h1');
    expect(h1).not.to.be.null;
  });
});
