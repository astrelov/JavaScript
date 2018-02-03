import test from 'ava';
import equals from './equals';


test('arrays: array and object.', (t) => {
  const a = ['gg', 'wp', 'babyrage'];
  const b = { arteezy: 'babyrage', sing_sing: 'davai davai' };
  t.false(equals(a, b));
});


test('arrays: same content on diff indexes with objects inside.', (t) => {
  const a = ['lkasdfj', { a: 6 }, [67, 98, ['lol', '14']], 'g'];
  const b = ['g', { a: 6 }, [67, 98, ['lol', '14']], 'lkasdfj'];
  t.false(equals(a, b));
});


test('arrays: same content with different objects inside.', (t) => {
  const a = ['lkasdfj', { a: 6, str: undefined }, [67, 98, ['lol', '14']], 'g'];
  const b = ['g', { a: 6, str: null }, [67, 98, ['lol', '14']], 'lkasdfj'];
  t.false(equals(a, b));
});


test('arrays: two empty arrays.', (t) => {
  const a = [];
  const b = [];
  t.true(equals(a, b));
});


test('objects: equal objects.', (t) => {
  const a = { a: 1, b: { c: 5, e: { d: 'asdf' } } };
  const b = { b: { c: 5, e: { d: 'asdf' } }, a: 1 };
  t.true(equals(a, b));
});


test('objects: non-equal objects.', (t) => {
  const a = { a: 1, b: { c: 5, e: { d: 'asdf', trava: 'green' } } };
  const b = { b: { c: 5, e: { d: 'asdf' }, trava: 'green' }, a: 1 };
  t.false(equals(a, b));
});


test('objects: undefined and null key in object.', (t) => {
  const a = undefined;
  const b = { null: null };
  t.false(equals(a, b));
});


test('objects: null and null key in object.', (t) => {
  const a = null;
  const b = { null: null };
  t.false(equals(a, b));
});


test('objects: same object.', (t) => {
  const a = { z: 'kek', null: Infinity };
  const b = a;
  t.true(equals(a, b));
});


test('objects: similar objects.', (t) => {
  const a = { a: 1, b: +0, c: { h: 3 } };
  const b = { a: 1, b: +0, c: { h: 3 } };
  t.true(equals(a, b));
});



test('objects: objects with circular references', (t) => {
  const a = {};
  const b = {};
  a.f = a;
  b.f = b;
  t.true(equals(a, b));
});


test('objects: objects with circular references', (t) => {
  const a = { fist: 'pump' };
  const b = { lol: 'kek' };
  a.f = a;
  b.f = b;
  t.false(equals(a, b));
});


test('objects: objects with circular references', (t) => {
  const a = { v: { g: {} } };
  const b = { v: { g: {} } };
  a.v.g.child = b.v;
  b.v.g.child = a.v;
  t.false(equals(a, b));
});


test('objects: objects with circular references', (t) => {
  const a = { v: { g: {} } };
  const b = { v: { g: {} } };
  a.v.g.child = a.v;
  b.v.g.child = b.v.g;
  t.false(equals(a, b));
});


test('equal objects with circular references', (t) => {
  const a = { e: 8 };
  const b = { e: 8 };
  a.c = a;
  b.c = b;
  t.true(equals(a, b));
});


test('objects: objects with circular references', (t) => {
  const a = { x: 1, y: {}, z: 'abc' };
  const b = { x: 1, y: {}, z: 'abc' };
  a.y = a;
  b.y = b;
  t.true(equals(a, b));
});


test('objects: objects with circular reference to another object.', (t) => {
  const a = {};
  const b = {};
  a.f = b;
  b.f = a;
  t.false(equals(a, b));
});


test('objects: objects with circular references before different keyValues', (t) => {
  const a = { x: 1, y: {}, z: 'abc' };
  const b = { x: 1, y: {}, z: 'cab' };
  a.y = a;
  b.y = b;
  t.false(equals(a, b));
});


test('primitive types: false and convertable to truth value.', (t) => {
  const a = 56;
  const b = false;
  t.false(equals(a, b));
});


test('primitive types: same number as a number and as a string.', (t) => {
  const a = 10;
  const b = '10';
  t.false(equals(a, b));
});


test('primitive types: both nulls.', (t) => {
  const a = null;
  const b = null;
  t.true(equals(a, b));
});


test('primitive types: null and undefined.', (t) => {
  const a = undefined;
  const b = null;
  t.false(equals(a, b));
});


test('primitive types: null and 0.', (t) => {
  const a = null;
  const b = 0;
  t.false(equals(a, b));
});


test('primitive types: different strings.', (t) => {
  const a = 'Vinni the fucker pooh';
  const b = 'Vo dvore trava, na trave bomj...';
  t.false(equals(a, b));
});


test('primitive types: similar strings.', (t) => {
  const a = 'Temnota drug molodeji';
  const b = 'Temnota drug molodeji';
  t.true(equals(a, b));
});


test('primitive types: false and convertable to false value.', (t) => {
  const a = '';
  const b = false;
  t.false(equals(a, b));
});


test('primitive types: convertable to false values.', (t) => {
  const a = '';
  const b = 0;
  t.false(equals(a, b));
});


test('primitive types: negative infinities.', (t) => {
  const a = -Infinity;
  const b = -Infinity;
  t.true(equals(a, b));
});


test('primitive types: positive infinities.', (t) => {
  const a = Infinity;
  const b = Infinity;
  t.true(equals(a, b));
});


test('primitive types: positive and negative infinities.', (t) => {
  const a = Infinity;
  const b = -Infinity;
  t.false(equals(a, b));
});


test('primitive types: same symbol.', (t) => {
  const a = Symbol();
  const b = a;
  t.true(equals(a, b));
});


test('primitive types: two symbols.', (t) => {
  const a = Symbol();
  const b = Symbol();
  t.false(equals(a, b));
});
