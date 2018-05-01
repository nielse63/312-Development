import mutations from '@/store/mutations';
import originalState from '@/store/state';
import { isArray, isObject } from '../../helpers';

const copy = Object.assign({}, originalState);
let state = copy;

describe('mutations', () => {
  beforeEach(() => {
    state = Object.assign({}, copy);
  });

  describe('existence', () => {
    it('should exist', () => {
      expect(mutations).to.not.be.null;
    });

    it('should have `closeMenu` function', () => {
      expect(mutations.closeMenu).to.not.be.null;
      expect(typeof mutations.closeMenu).to.equal('function');
    });

    it('should have `toggleMenu` function', () => {
      expect(mutations.toggleMenu).to.not.be.null;
      expect(typeof mutations.toggleMenu).to.equal('function');
    });

    it('should have `saveRepos` function', () => {
      expect(mutations.saveRepos).to.not.be.null;
      expect(typeof mutations.saveRepos).to.equal('function');
    });

    it('should have `saveModule` function', () => {
      expect(mutations.saveModule).to.not.be.null;
      expect(typeof mutations.saveModule).to.equal('function');
    });
  });

  describe('closeMenu', () => {
    it('`closeMenu` should set state.menuOpen to false', () => {
      expect(state.menuOpen).to.be.false;

      state.menuOpen = true;
      mutations.closeMenu(state);
      expect(state.menuOpen).to.be.false;
    });
  });

  describe('toggleMenu', () => {
    it('`toggleMenu` should negate state.menuOpen', () => {
      expect(state.menuOpen).to.be.false;

      mutations.toggleMenu(state);
      expect(state.menuOpen).to.be.true;

      mutations.toggleMenu(state);
      expect(state.menuOpen).to.be.false;
    });
  });

  describe('saveRepos', () => {
    it('`saveRepos` should set the repos object', () => {
      expect(isArray(state.repos)).to.be.true;

      const repos = [{
        title: 'One',
        content: 'Lorem ipsum dolor.',
      }, {
        title: 'Two',
        content: 'Lorem ipsum dolor.',
      }];

      mutations.saveRepos(state, repos);
      expect(state.repos.length).to.equal(2);
      expect(state.repos).to.equal(repos);
    });
  });

  describe('saveModule', () => {
    it('`saveModule` should set the module object', () => {
      expect(isObject(state.modules)).to.be.true;

      const module = {
        name: 'module-name',
        data: {
          key: 'value',
        },
      };

      mutations.saveModule(state, module);
      expect(state.modules['module-name']).to.not.be.null;
      expect(state.modules['module-name']).to.equal(module.data);
    });
  });

  describe('saveTweets', () => {
    it('`saveTweets` should set the tweets object', () => {
      expect(isArray(state.tweets)).to.be.true;

      const tweets = [{
        date: 'Today @ 3:47 pm',
        text: 'Animating Progress https://t.co/BtMooIjCcm',
        time: 'Mon Apr 30 20:47:30 +0000 2018',
        url: 'https://twitter.com/ErikKyleNielsen/status/991056471117967400',
      }, {
        date: 'Today @ 12:26 pm',
        text: 'Go Time 78: Hacking drones with Go with Ron Evans https://t.co/Bj6PRsqWtd',
        time: 'Mon Apr 30 17:26:11 +0000 2018',
        url: 'https://twitter.com/ErikKyleNielsen/status/991005807553720300',
      }];

      mutations.saveTweets(state, tweets);
      expect(state.tweets.length).to.equal(tweets.length);
      expect(state.tweets).to.equal(tweets);
    });
  });
});
