
describe('E2E', () => {
  beforeAll(async () => {
    await page.setViewport({
      width:  1280,
      height: 650,
    });
    await page.goto('http://localhost:3000');
  });

  describe('General', () => {
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.home', { timeout: 1000 });
    });

    describe('Footer', () => {
      let footer;
      beforeAll(async () => {
        footer = await page.$('.footer');
      });

      it('should have correct links', async () => {
        await expect(footer).toMatchElement('a[href="https://github.com/nielse63"]', {
          text: 'GitHub',
        });
        await expect(footer).toMatchElement('a[href="https://www.npmjs.com/~nielse63"]', {
          text: 'NPM',
        });
        await expect(footer).toMatchElement('a[href="https://twitter.com/ErikKyleNielsen/"]', {
          text: 'Twitter',
        });
        await expect(footer).toMatchElement('a[href="https://www.linkedin.com/in/erikkylenielsen/"]', {
          text: 'LinkedIn',
        });
      });
    });

    describe('Navigation', () => {
      it('should exist', async () => {
        await expect(page).toMatchElement('.app-navigation');
      });

      it('should open on button click', async () => {
        await expect(page).toClick('.app-navigation-button');
        await expect(page).toMatchElement('#main.nav-open');
        await expect(page).toMatchElement('.app-navigation.open');
      });

      it('should close when clicked again', async () => {
        await expect(page).toClick('.app-navigation-button');
        await expect(page).toMatchElement('#main:not(.nav-open)');
      });

      it('should close nav when clicking outside of open navbar', async () => {
        await expect(page).toClick('.app-navigation-button');
        await expect(page).toMatchElement('#main.nav-open');
        await expect(page).toClick('.canvas');
        await expect(page).toMatchElement('#main:not(.nav-open)', { timeout: 1000 });
      });
    });
  });

  describe('Intro Panel', () => {
    it('should have title and subtitle', async () => {
      await expect(page).toMatchElement('h1', { text: 'Erik Nielsen' });
      await expect(page).toMatchElement('h2', {
        text: 'Senior UI Software Engineer from Chicago, IL',
      });
    });
  });

  describe('About', () => {
    let section;
    beforeAll(async () => {
      section = await page.$('#about-me');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('.about-me');
    });

    it('should have title', async () => {
      await expect(section).toMatchElement('h2', { text: 'About Me' });
    });
  });

  describe('Experience', () => {
    let section;
    beforeAll(async () => {
      section = await page.$('#experience');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('.experience');
    });

    it('should have title', async () => {
      await expect(section).toMatchElement('h2', { text: 'Experience' });
    });
  });

  describe('Portfolio', () => {
    let section;
    beforeAll(async () => {
      section = await page.$('#portfolio');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('.portfolio');
    });

    it('should have title', async () => {
      await expect(section).toMatchElement('h2', { text: 'Selected Work' });
    });
  });

  describe('Skills and Tools', () => {
    let section;
    beforeAll(async () => {
      section = await page.$('#skills-and-tools');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('#skills-and-tools');
    });

    it('should have title', async () => {
      await expect(section).toMatchElement('h2', { text: 'Skills and Tools' });
    });
  });

  describe('Contact', () => {
    let section;
    beforeAll(async () => {
      section = await page.$('#contact-me');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('#contact-me');
    });

    it('should have title', async () => {
      await expect(section).toMatchElement('h2', { text: 'Contact Me' });
    });
  });
});
