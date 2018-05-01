
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
      const endDate = new Date(2018, 3, 1);
      endDate.setTime(endDate.getTime() + (endDate.getTimezoneOffset() * 60 * 1000));
      console.log(endDate);
      const output = createNPMUrl(name, endDate);
      expect(output).to.equal('https://api.npmjs.org/downloads/range/2018-01-01:2018-04-01/something');
    });

    it('should handle double digit months', () => {
      const endDate = new Date(2018, 11, 1);
      endDate.setTime(endDate.getTime() + (endDate.getTimezoneOffset() * 60 * 1000));
      console.log(endDate);
      const output = createNPMUrl(name, endDate);
      expect(output).to.equal('https://api.npmjs.org/downloads/range/2018-09-02:2018-12-01/something');
    });
  });
});
