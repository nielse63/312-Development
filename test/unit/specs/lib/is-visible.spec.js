
import scrolling from '@/lib/scrolling';
import isVisible from '@/lib/is-visible';

describe('is-visible', () => {
  before(() => {
    window.IN_TESTING = true;
  });

  it('should exist', () => {
    expect(isVisible).to.not.be.null;
  });

  describe('ui testing', () => {
    let div;

    beforeEach(() => {
      // set body styles and scroll to top
      document.body.style.height = '4000px';
      window.scrollTo(0, 0);

      // create div
      div = document.createElement('div');
      div.id = 'test-div';
      div.setAttribute('data-is-in-view', '');
      div.style.marginTop = '1000px';
      div.style.height = '100px';

      // append to body
      document.body.appendChild(div);

      // bind scroll listener
      isVisible();
      scrolling();
    });

    afterEach(() => {
      div.remove();
      div = null;
      window.isInViewBound = false;
    });

    it('should set class', (done) => {
      let timeout;
      let lastTimeout;
      function scrollBy200() {
        const y = window.scrollY;
        if (!div.classList.contains('visible')) {
          // class not added yet
          window.scrollTo(0, y + 100);
          clearTimeout(timeout);
          timeout = setTimeout(scrollBy200, 250);
        } else {
          // class has been added
          clearTimeout(timeout);
          clearTimeout(lastTimeout);
          expect(div.classList.contains('visible')).to.be.true;
          done();
        }
      }
      timeout = setTimeout(scrollBy200, 250);

      lastTimeout = setTimeout(() => {
        expect(div.classList.contains('visible')).to.be.true;
        done();
      }, 1800);
    });
  });
});
