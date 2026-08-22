import test from 'node:test';
import assert from 'node:assert/strict';
import { commandTextFor, findWakePhrase } from '../src/wake.js';

test('findWakePhrase extracts command text after the phrase', () => {
  const match = findWakePhrase('Please Voicehook: remind Atlas to review', ['voicehook']);
  assert.equal(match?.phrase, 'voicehook');
  assert.equal(match?.commandText, 'remind Atlas to review');
});

test('findWakePhrase returns undefined without a wake phrase', () => {
  assert.equal(findWakePhrase('ordinary transcript', ['voicehook']), undefined);
});

test('findWakePhrase ignores embedded wake-phrase substrings', () => {
  assert.equal(findWakePhrase('The voicehooked handler failed', ['voicehook']), undefined);
  assert.equal(findWakePhrase('prevoicehook add a task', ['voicehook']), undefined);
});

test('findWakePhrase accepts punctuation boundaries case-insensitively', () => {
  const match = findWakePhrase('[VOICEHOOK], add a task', ['voicehook']);
  assert.equal(match?.phrase, 'voicehook');
  assert.equal(match?.commandText, 'add a task');
});

test('findWakePhrase selects the earliest and then longest valid phrase', () => {
  assert.equal(findWakePhrase('hey crew add a task', ['crew', 'hey crew'])?.phrase, 'hey crew');
  assert.equal(findWakePhrase('voicehooked, then voicehook add a task', ['voicehook'])?.index, 18);
});

test('commandTextFor preserves an empty command after a detected wake phrase', () => {
  const result = commandTextFor(' Voicehook: ; ', ['voicehook']);
  assert.equal(result.wake?.phrase, 'voicehook');
  assert.equal(result.commandText, '');
});
