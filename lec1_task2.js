function equals(cmp1, cmp2) {
  if (cmp1 === null || cmp2 === null) {
    return cmp1 === null && cmp2 === null;
  } else if (Array.isArray(cmp1) === true && Array.isArray(cmp2) === true) {
    if (cmp1.length !== cmp2.length) return false;
    for (let i = 0; i < cmp1.length; i += 1) if (!equals(cmp1[i], cmp2[i])) return false;
  } else if (typeof cmp1 === 'object' && typeof cmp2 === 'object') {
    const m1 = Object.getOwnPropertyNames(cmp1);
    const m2 = Object.getOwnPropertyNames(cmp2);
    if (m1.length !== m2.length) return false;
    return m1.every(x => equals(cmp1[x], cmp2[x]));
  } else {
    return cmp1 === cmp2;
  }
  return true;
}

// *******TESTS**********

let i1;
let i2;
let temp;
let ok = 1;

// *******ARRAYS**********

i1 = ['gg', 'wp', 'babyrage'];
i2 = { arteezy: 'babyrage', sing_sing: 'davai davai' };
console.log(i1);
console.log(i2);
console.log('\narrays: array and object\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = ['lkasdfj', { a: 6 }, [67, 98, ['lol', '14']], 'g'];
i2 = ['g', { a: 6 }, [67, 98, ['lol', '14']], 'lkasdfj'];
console.log(i1);
console.log(i2);
console.log('\narrays: same content on diff indexes with objects inside\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = ['lkasdfj', { a: 6, str: undefined }, [67, 98, ['lol', '14']], 'g'];
i2 = ['g', { a: 6, str: null }, [67, 98, ['lol', '14']], 'lkasdfj'];
console.log(i1);
console.log(i2);
console.log('\narrays: same content with different objects inside\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

// *******OBJECTS**********

i1 = { a: 1, b: { c: 5, e: { d: 'asdf' } } };
i2 = { b: { c: 5, e: { d: 'asdf' } }, a: 1 };
console.log(i1);
console.log(i2);
console.log('\nobjects: equal objects\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = { a: 1, b: { c: 5, e: { d: 'asdf', trava: 'green' } } };
i2 = { b: { c: 5, e: { d: 'asdf' }, trava: 'green' }, a: 1 };
console.log(i1);
console.log(i2);
console.log('\nobjects: non-equal objects\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = undefined;
i2 = { null: null };
console.log(i1);
console.log(i2);
console.log('\nobjects: undefined and null key in object\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = null;
i2 = { null: null };
console.log(i1);
console.log(i2);
console.log('\nobjects: null and null key in object\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = { z: 'kek', null: Infinity };
i2 = i1;
console.log(i1);
console.log(i2);
console.log('\nobjects: same object\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = { a: 1, b: +0, c: { h: 3 } };
i2 = { a: 1, b: +0, c: { h: 3 } };
console.log(i1);
console.log(i2);
console.log('\nobjects: similar objects\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

// // *******OTHER_CASES**********

i1 = 56;
i2 = false;
console.log(i1);
console.log(i2);
console.log('\nother_cases: false and convertable to truth value\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = 10;
i2 = '10';
console.log(i1);
console.log(i2);
console.log('\nother_cases: same number as a number and as a string\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = null;
i2 = null;
console.log(i1);
console.log(i2);
console.log('\nother_cases: both nulls\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = undefined;
i2 = null;
console.log(i1);
console.log(i2);
console.log('\nother_cases: null and undefined\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = null;
i2 = 0;
console.log(i1);
console.log(i2);
console.log('\nother_cases: null and 0\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = 'Vinni the fucker pooh';
i2 = 'Vo dvore trava, na trave bomj...';
console.log(i1);
console.log(i2);
console.log('\nother_cases: different strings\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = 'Temnota drug molodeji';
i2 = 'Temnota drug molodeji';
console.log(i1);
console.log(i2);
console.log('\nother_cases: similar strings\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = '';
i2 = false;
console.log(i1);
console.log(i2);
console.log('\nother_cases: false and convertable to false value\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = '';
i2 = -0;
console.log(i1);
console.log(i2);
console.log('\nother_cases: convertable to false values\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = -Infinity;
i2 = -Infinity;
console.log(i1);
console.log(i2);
console.log('\nother_cases: negative infinities\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = Infinity;
i2 = Infinity;
console.log(i1);
console.log(i2);
console.log('\nother_cases: positive infinities\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = Infinity;
i2 = -Infinity;
console.log(i1);
console.log(i2);
console.log('\nother_cases: positive and negative infinities\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = Symbol();
i2 = i1;
console.log(i1);
console.log(i2);
console.log('\nother_cases: same symbol\nExpected: true');
ok -= (temp = equals(i1, i2)) === true ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

i1 = Symbol();
i2 = Symbol();
console.log(i1);
console.log(i2);
console.log('\nother_cases: two symbols\nExpected: false');
ok -= (temp = equals(i1, i2)) === false ? 0 : 1;
console.log('RESULT:   ' + temp + '\n////////////////////////////////////////\n');

if (ok === 1) console.log('ALL TESTS PASSED');
else console.log('SOME TESTS FAILED');
