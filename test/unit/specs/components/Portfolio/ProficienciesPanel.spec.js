
import ProficienciesPanel from '@/components/Portfolio/ProficienciesPanel';
import { isFunction, isObject } from '../../../helpers';

describe('ProficienciesPanel.vue', () => {
  describe('data', () => {
    it('should have data', () => {
      const data = ProficienciesPanel.data().tools;
      expect(data).to.not.be.null;
      expect(isObject(data)).to.be.true;
    });
  });

  describe('filters', () => {
    it('should have titlize function', () => {
      expect(
        isFunction(ProficienciesPanel.filters.titlize)
      ).to.be.true;
    });

    it('should filter text', () => {
      const input = 'this-is-a-string';
      const output = 'This Is A String';
      expect(
        ProficienciesPanel.filters.titlize(input)
      ).to.equal(output);
    });

    it('should filter without argument', () => {
      expect(
        ProficienciesPanel.filters.titlize()
      ).to.equal('');
    });
  });
});
