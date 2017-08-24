
import '@/lib/prototypes';

describe('Prototypes', () => {
  describe('titleCase', () => {
    it('should alter correctly', () => {
      const input = 'this-is-a-string';
      const output = 'This Is A String';
      expect(input.titleCase()).to.equal(output);
    });
  });

  describe('capitalize', () => {
    it('should alter correctly', () => {
      const input = 'this is a string';
      const output = 'This is a string';
      expect(input.capitalize()).to.equal(output);
    });
  });

  describe('kebabCase', () => {
    it('should alter correctly', () => {
      const input = 'thisIsMyString';
      const output = 'this-is-my-string';
      expect(input.kebabCase()).to.equal(output);
    });
  });
});
