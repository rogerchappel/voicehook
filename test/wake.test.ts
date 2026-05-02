import test from 'node:test';
import assert from 'node:assert/strict';
import { findWakePhrase } from '../src/wake.js';

test('findWakePhrase extracts command text after the phrase', () => {
  const match = findWakePhrase('Please Voicehook: remind Atlas to review', ['voicehook']);
  assert.equal(match?.phrase, 'voicehook');
  assert.equal(match?.commandText, 'remind Atlas to review');
});

test('findWakePhrase returns undefined without a wake phrase', () => {
  assert.equal(findWakePhrase('ordinary transcript', ['voicehook']), undefined);
});
