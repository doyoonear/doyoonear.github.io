/* eslint-env jest */
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('listContainBeer', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});



// function compileAndroidCode() {
//   throw new Error('you are using the wrong JDK');
// }

// test('compiling android goes as expected', () => {
//   expect(compileAndroidCode).toThrow();
//   expect(compileAndroidCode).toThrow(Error);
//   expect(compileAndroidCode).toThrow('you are using the wrong JDK');
//   expect(compileAndroidCode).toThrow(/JDK/);
// });