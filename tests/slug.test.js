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
