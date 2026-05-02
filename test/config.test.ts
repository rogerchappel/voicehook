import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultConfig, validateConfig } from '../src/index.js';

test('default config is valid and safe', () => {
  const config = validateConfig(createDefaultConfig());
  assert.equal(config.hooks[0]?.action, 'inbox');
  assert.equal(config.hooks[0]?.requireWake, true);
});

test('validateConfig rejects append-file hooks without a target', () => {
  const config = createDefaultConfig();
  config.hooks = [{ id: 'bad', match: { type: 'always' }, action: 'append-file' }];
  assert.throws(() => validateConfig(config), /targetPath/);
});
