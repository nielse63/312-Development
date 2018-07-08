
describe('E2E', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/#/');
  });

  describe('General', () => {
    describe('Footer', () => {
      let footer;
      beforeAll(async () => {
        footer = await page.$('.footer');
      });

      it('should have correct links', async () => {
        await expect(footer).toMatchElement('a[href="https://github.com/nielse63"]', {
          tet: 'GitHub',
        });
        await expect(footer).toMatchElement('a[href="https://www.npmjs.com/~nielse63"]', {
          tet: 'NPM',
        });
        await expect(footer).toMatchElement('a[href="https://twitter.com/ErikKyleNielsen/"]', {
          tet: 'Twitter',
        });
        await expect(footer).toMatchElement('a[href="https://www.linkedin.com/in/erikkylenielsen/"]', {
          tet: 'LinkedIn',
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

  describe('Home', () => {
    it('should render correctly', async () => {
      await expect(page).toMatchElement('.home', { timeout: 1000 });
    });

    describe('Intro Panel', () => {
      it('should have title and subtitle', async () => {
        await expect(page).toMatchElement('h1', { text: 'Erik Nielsen' });
        await expect(page).toMatchElement('h2', {
          text: 'Senior UI Software Engineer from Chicago, IL',
        });
      });
    });
  });

  describe('About', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/#/about-me');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('.view-about-me');
    });

    it('should have title', async () => {
      await expect(page).toMatchElement('h1', { text: 'About Me' });
    });

    it('should have correct content panel text values', async () => {
      await expect(page).toMatchElement('.content-panel h2', { text: 'Who I Am' });
      await expect(page).toMatchElement('.content-panel h2', { text: 'My Contributions' });
    });
  });

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

  describe('Contact', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/#/contact-me');
    });

    it('should render correctly', async () => {
      await expect(page).toMatchElement('.view-contact');
    });

    it('should have title', async () => {
      await expect(page).toMatchElement('h1', { text: 'Contact Me' });
    });
  });

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
});
