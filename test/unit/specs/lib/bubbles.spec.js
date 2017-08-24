
import bubbles, { getSize, getRangeData } from '@/lib/bubbles';
import { isFunction, isArray } from '../../helpers';

describe('bubbles', () => {
  it('should exist', () => {
    expect(getSize).to.not.be.null;
    expect(getRangeData).to.not.be.null;
    expect(bubbles).to.not.be.null;
  });

  it('should be a function', () => {
    expect(isFunction(getSize)).to.be.true;
    expect(isFunction(getRangeData)).to.be.true;
    expect(isFunction(bubbles)).to.be.true;
  });

  describe('getRangeData', () => {
    const colors = ['rgba(236, 55, 108, 0.5)'];
    const output = {
      wide: getRangeData(1280, colors),
      narrow: getRangeData(400, colors),
    };

    it('should return array', () => {
      expect(isArray(output.wide)).to.be.true;
    });

    it('should pre-determine number of objects', () => {
      expect(output.wide.length).to.equal(40);
      expect(output.narrow.length).to.equal(20);
    });
  });

  describe('guards', () => {
    it('should stop execution if no element found', () => {
      const output = bubbles();
      expect(output).to.be.undefined;
    });
  });

  describe('ui testing', () => {
    beforeEach((done) => {
      const html = '<div id="bubbles"></div>';
      document.body.insertAdjacentHTML('afterbegin', html);
      bubbles();
      done();
    });

    afterEach(() => {
      document.body.removeChild(document.getElementById('bubbles'));
    });

    it('should have wrapper element', () => {
      const element = document.getElementById('bubbles');
      expect(element).to.not.be.null;
    });

    it('should have added a canvas element', () => {
      const element = document.getElementById('bubbles');
      const canvas = element.querySelector('canvas');
      expect(canvas).to.not.be.null;
    });

    it('should handle resize', () => {
      window.resizeTo(
        window.screen.availWidth / 2,
        window.screen.availHeight / 2
      );
      const element = document.getElementById('bubbles');
      expect(element).to.not.be.null;
    });
  });
});
