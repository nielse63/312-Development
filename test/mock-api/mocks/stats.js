const faker = require('faker');
const mockUser = require('./user');

const week = (index) => {
  const a = faker.random.number({ min: 0, max: 500 });
  const d = faker.random.number({ min: 0, max: 500 });
  const c = faker.random.number({ min: 0, max: 50 });
  return {
    w: index,
    a,
    d,
    c,
  };
};

const stats = () => {
  const MAX_USERS = 2;
  const MAX_WEEKS = faker.random.number({ min: 20, max: 100 });
  let i = 0;
  const output = [];
  while (i < MAX_USERS) {
    const data = [];
    let j = 0;
    while (j < MAX_WEEKS) {
      const singleWeek = week(j);
      data.push(singleWeek);
      j += 1;
    }
    const object = {
      total:  faker.random.number(),
      author: mockUser(),
      weeks:  data,
    };
    output.push(object);
    i += 1;
  }
  return output;
};

module.exports = stats;
