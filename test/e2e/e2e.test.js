
describe('E2E', () => {
  beforeAll(async () => {
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
        await expect(page).toMatchElement('.app-navigation.open');
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
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.about-me');
    });

    // it('should have title', async () => {
    //   await expect(await page.$('.about-me')).toMatchElement('h2', { text: 'About Me' });
    // });
  });

  describe('Experience', () => {
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.experience');
    });

    // it('should have title', async () => {
    //   await expect(page).toMatchElement('h2', { text: 'Experience' });
    // });
  });

  describe('Portfolio', () => {
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.portfolio');
    });

    // it('should have title', async () => {
    //   await expect(page).toMatchElement('h1', { text: 'Portfolio' });
    // });
  });

  describe('Contact', () => {
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.contact-me');
    });

    // it('should have title', async () => {
    //   await expect(page).toMatchElement('h1', { text: 'Contact Me' });
    // });
  });

  describe('Skills and Tools', () => {
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.skills-and-tools');
    });

    // it('should have title', async () => {
    //   await expect(page).toMatchElement('h1', { text: 'Contact Me' });
    // });
  });
});
