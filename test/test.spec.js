
import { h, render, rerender } from 'preact';
import { route } from 'preact-router';
import App from 'components/app';

/* global sinon,expect */

describe('App', () => {
  let scratch;

  before(() => {
    scratch = document.createElement('div');
    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach(() => {
    scratch.innerHTML = '';
  });

  after(() => {
    scratch.parentNode.removeChild(scratch);
    scratch = null;
  });


  describe('routing', () => {
    it('should render the homepage', () => {
      render(<App />, scratch);
      expect(scratch.innerHTML).to.contain('<a href="/">312 Development</a>');
    });

    // it('should render /about', () => {
    //   render(<App />, scratch);
    //   route('/about');
    //   rerender();
    //   expect(scratch.innerHTML).to.contain('<h1>Who I am</h1><h2>and <mark>what I do</mark></h2>');
    // });

    // it('should render /portfolio', () => {
    //   render(<App />, scratch);
    //   route('/portfolio');
    //   rerender();
    //   expect(scratch.innerHTML).to.contain('<h1>Check out</h1>');
    // });

    // it('should render /contact', () => {
    //   render(<App />, scratch);
    //   route('/contact');
    //   rerender();
    //   expect(scratch.innerHTML).to.contain('<h1>Let\'s stay</h1>');
    // });
  });
});
