
import actions from '@/store/actions';

describe('actions', () => {
  describe('existence', () => {
    it('should exist', () => {
      expect(actions).to.not.be.null;
    });

    it('should have `closeMenu` function', () => {
      expect(actions.closeMenu).to.not.be.null;
      expect(typeof actions.closeMenu).to.equal('function');
    });

    it('should have `toggleMenu` function', () => {
      expect(actions.toggleMenu).to.not.be.null;
      expect(typeof actions.toggleMenu).to.equal('function');
    });

    it('should have `saveRepos` function', () => {
      expect(actions.saveRepos).to.not.be.null;
      expect(typeof actions.saveRepos).to.equal('function');
    });

    it('should have `saveModule` function', () => {
      expect(actions.saveModule).to.not.be.null;
      expect(typeof actions.saveModule).to.equal('function');
    });
  });
});
