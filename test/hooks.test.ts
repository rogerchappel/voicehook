import test from 'node:test';
import assert from 'node:assert/strict';
import { hookMatches, renderHook } from '../src/hooks.js';
import type { VoicehookEvent } from '../src/models.js';

const event: VoicehookEvent = {
  id: 'evt',
  timestamp: '2026-01-01T00:00:00.000Z',
  transcript: { id: 't1', text: 'Voicehook ask Atlas', timestamp: '2026-01-01T00:00:00.000Z' },
  wake: { phrase: 'voicehook', commandText: 'ask Atlas', index: 0 },
  commandText: 'ask Atlas',
  matchedHookIds: []
};

test('includes hook matches command text', () => {
  assert.equal(hookMatches({ id: 'atlas', match: { type: 'includes', value: 'atlas' }, action: 'emit-json' }, event), true);
});

test('renderHook substitutes safe template variables', () => {
  const result = renderHook({ id: 'inbox', match: { type: 'always' }, action: 'inbox', template: '{{commandText}} @ {{wakePhrase}}' }, event);
  assert.equal(result.rendered, 'ask Atlas @ voicehook');
});
