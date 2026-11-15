import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/index.js';

test('slugify lowercases and joins words with hyphens', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('slugify strips accents and punctuation', () => {
  assert.equal(slugify('  Crème brûlée, again!  '), 'creme-brulee-again');
});

test('slugify returns an empty string for text with no letters or digits', () => {
  assert.equal(slugify('!!!'), '');
});

test('slugify with maxLength returns a slug of at most maxLength characters', () => {
  const text = 'The quick brown fox jumps over the lazy dog';
  for (let maxLength = 1; maxLength <= 50; maxLength += 1) {
    assert.ok(slugify(text, { maxLength }).length <= maxLength);
  }
  assert.equal(slugify('Hello World', { maxLength: 50 }), 'hello-world');
});

test('slugify with maxLength cuts at the last hyphen and never ends with a hyphen', () => {
  assert.equal(slugify('one two three four', { maxLength: 10 }), 'one-two');
  assert.equal(slugify('one two three four', { maxLength: 13 }), 'one-two-three');
  // A hyphen falling exactly after the limit keeps the whole word.
  assert.equal(slugify('one two three', { maxLength: 7 }), 'one-two');
  // A hyphen at the last allowed position is dropped.
  assert.equal(slugify('one two three', { maxLength: 8 }), 'one-two');
  const text = 'a bb ccc dddd eeeee ffffff';
  for (let maxLength = 1; maxLength <= 30; maxLength += 1) {
    assert.ok(!slugify(text, { maxLength }).endsWith('-'));
  }
});

test('slugify with maxLength cuts a first word longer than the limit', () => {
  assert.equal(slugify('extraordinary things', { maxLength: 5 }), 'extra');
  assert.equal(slugify('extraordinary', { maxLength: 5 }), 'extra');
});

test('slugify without maxLength is unchanged', () => {
  const text = 'A very long title that goes on and on and on';
  const expected = 'a-very-long-title-that-goes-on-and-on-and-on';
  assert.equal(slugify(text), expected);
  assert.equal(slugify(text, {}), expected);
  assert.equal(slugify(text, { maxLength: undefined }), expected);
  assert.equal(slugify(text, undefined), expected);
});

test('slugify throws a RangeError for an invalid maxLength', () => {
  for (const maxLength of [0, -1, 1.5, NaN, Infinity, '5', null, true, {}]) {
    assert.throws(() => slugify('Hello World', { maxLength }), RangeError);
  }
});
