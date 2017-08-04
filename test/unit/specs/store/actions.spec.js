
import actions from '@/store/actions';
import { isFunction, isObject } from '../../helpers';

describe('actions', () => {
  describe('existence', () => {
    it('should exist', () => {
      expect(isObject(actions)).to.be.true;
    });

    it('should have `closeMenu` function', () => {
      expect(isFunction(actions.closeMenu)).to.be.true;
    });

    it('should have `toggleMenu` function', () => {
      expect(isFunction(actions.toggleMenu)).to.be.true;
    });

    it('should have `saveRepos` function', () => {
      expect(isFunction(actions.saveRepos)).to.be.true;
    });

    it('should have `saveModule` function', () => {
      expect(isFunction(actions.saveModule)).to.be.true;
    });
  });
});
