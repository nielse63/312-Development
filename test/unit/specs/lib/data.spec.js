
import { completePromise, handleNPMData, createNPMUrl } from '@/lib/data';
import { isFunction, isArray, isObject, isString } from '../../helpers';

describe('data', () => {
  describe('completePromise', () => {
    it('should be a function', () => {
      expect(isFunction(completePromise)).to.be.true;
    });
  });

  describe('handleNPMData', () => {
    it('should be a function', () => {
      expect(isFunction(handleNPMData)).to.be.true;
    });

    it('should handle array inputs', () => {
      const output = handleNPMData([]);
      expect(isArray(output.downloads)).to.be.true;
    });

    it('should handle object inputs', () => {
      const output = handleNPMData({});
      expect(isObject(output)).to.be.true;
    });
  });

  describe('createNPMUrl', () => {
    const name = 'something';

    it('should be a function', () => {
      expect(isFunction(completePromise)).to.be.true;
    });

    it('should return a string', () => {
      const output = createNPMUrl(name);
      expect(isString(output)).to.be.true;
    });

    it('should handle single digit months', () => {
      const output = createNPMUrl(name, new Date('2018-04-01T00:00:00'));
      expect(output).to.equal('https://api.npmjs.org/downloads/range/2017-12-31:2018-04-01/something');
    });

    it('should handle double digit months', () => {
      const output = createNPMUrl(name, new Date('2018-06-01T00:00:00'));
      expect(output).to.equal('https://api.npmjs.org/downloads/range/2018-03-02:2018-06-01/something');
    });
  });
});
