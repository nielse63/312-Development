
import scrolling from '@/lib/scrolling';

describe('scrolling', () => {
  it('should exist', () => {
    expect(scrolling).to.not.be.null;
  });

  it('should trigger event', (done) => {
    document.addEventListener('scrolling', (e) => {
      expect(e).to.not.be.null;
      done();
    }, false);

    // set body height & initialize function
    document.body.style.height = '4000px';
    scrolling();

    // scroll once
    window.scrollTo(0, 400);

    // wait a bit, then scroll again
    setTimeout(() => {
      window.scrollTo(0, 700);
      scrolling();
    }, 50);
  });
});
