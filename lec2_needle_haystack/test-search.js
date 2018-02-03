import test from 'ava';
import search from './search';

// test('', (t) => {
//   const needle = 5;
//   const haystack = {};
//   t.false(search(needle, haystack));
// });
//
// test('', (t) => {
//   const needle = 5;
//   const haystack = { a: 5 };
//   t.true(search(needle, haystack));
// });

test('', (t) => {
  const needle = 5;
  const haystack = { h: 10, a: null, b: 5 };
  haystack.a = haystack;
  t.true(search(needle, haystack));
});
