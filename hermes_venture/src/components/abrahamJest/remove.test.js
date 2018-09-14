const remove = require('../abrahamJest/remove')

test('items deleted', () => {
  
  expect(remove(1).length).toBe(2);
});