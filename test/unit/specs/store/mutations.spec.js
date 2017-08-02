
import mutations from '@/store/mutations';
import originalState from '@/store/state';

const copy = Object.assign({}, originalState);
let state = Object.assign({}, originalState);

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
      expect({}.toString.call(state.repos)).to.equal('[object Array]');
      expect(state.repos.length).to.equal(0);

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
      expect({}.toString.call(state.modules)).to.equal('[object Object]');
      expect(Object.keys(state.modules).length).to.equal(0);

      const module = {
        name: 'module-name',
        data: {
          key: 'value',
        },
      };

      mutations.saveModule(state, module);
      expect(Object.keys(state.modules).length).to.equal(1);
      expect(state.modules['module-name']).to.not.be.null;
      expect(state.modules['module-name']).to.equal(module.data);
    });
  });
});
