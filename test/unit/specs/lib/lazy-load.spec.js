
import lazyLoad from '@/lib/lazy-load';
import { isFunction } from '../../helpers';

const source = 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?dpr=2&auto=format&fit=crop&w=1500&h=994&q=80&cs=tinysrgb&crop=';

describe('lazy-load', () => {
  it('should exist', () => {
    expect(lazyLoad).to.not.be.null;
    expect(isFunction(lazyLoad)).to.be.true;
  });

  describe('dom testing', () => {
    it('should load images', (done) => {
      const img = document.createElement('img');
      img.setAttribute('data-lazy-load', source);
      document.body.appendChild(img);

      img.onload = () => {
        expect(img.src).to.equal(source);
        done();
      };
      lazyLoad();
    });

    it('should load background images', (done) => {
      const element = document.createElement('div');
      element.setAttribute('data-lazy-load', source);
      document.body.appendChild(element);
      lazyLoad();
      setTimeout(() => {
        const style = window.getComputedStyle(element);
        expect(style.backgroundImage).to.equal(`url("${source}")`);
        done();
      }, 0);
    });
  });
});
