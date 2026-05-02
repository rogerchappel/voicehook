import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTranscriptJsonl, parseTranscriptText } from '../src/transcripts.js';

test('parseTranscriptJsonl normalizes entries', () => {
  const entries = parseTranscriptJsonl('{"id":"a","timestamp":"2026-01-01T00:00:00.000Z","text":"Voicehook hello"}\n', 'demo.jsonl');
  assert.equal(entries.length, 1);
  assert.equal(entries[0]?.id, 'a');
  assert.equal(entries[0]?.text, 'Voicehook hello');
});

test('parseTranscriptText creates deterministic ids', () => {
  const entries = parseTranscriptText('one\n\ntwo\n', 'plain.txt');
  assert.deepEqual(entries.map((entry) => entry.id), ['plain.txt:1', 'plain.txt:2']);
});
