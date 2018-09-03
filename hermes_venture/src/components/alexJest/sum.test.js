const remove = require('../Cart')

test('Should have removed an Item', () => {
  expect(remove.delete().length).toBe(2);
});