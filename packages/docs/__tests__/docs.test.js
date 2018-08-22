
const docs = require('..');

describe('@312dev/docs', () => {
  it('should exist', () => {
    expect(docs).toBeDefined();
  });

  it('should return a function', () => {
    expect(docs).toBeInstanceOf(Function);
  });
});
