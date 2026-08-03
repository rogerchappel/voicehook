import test from 'node:test';
import assert from 'node:assert/strict';
import { ConfigError, createDefaultConfig, validateConfig } from '../src/index.js';

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

test('validateConfig rejects an empty wakePhrases array', () => {
  const config = createDefaultConfig();
  config.wakePhrases = [];

  assert.throws(
    () => validateConfig(config),
    (error: unknown) => error instanceof ConfigError
      && error.message === 'Config wakePhrases must be a non-empty string array.'
  );
});

test('validateConfig rejects malformed regex matchers', () => {
  const config = createDefaultConfig();
  config.hooks = [{ id: 'broken-regex', match: { type: 'regex', value: '[' }, action: 'emit-json' }];

  assert.throws(
    () => validateConfig(config),
    (error: unknown) => error instanceof ConfigError
      && error.message === 'Hook broken-regex regex matcher has an invalid pattern.'
  );
});

test('validateConfig accepts valid matcher configurations', () => {
  const config = createDefaultConfig();
  config.hooks = [
    { id: 'includes', match: { type: 'includes', value: 'task' }, action: 'inbox' },
    { id: 'regex', match: { type: 'regex', value: '^task\\s+\\d+$' }, action: 'emit-json' },
    { id: 'always', match: { type: 'always' }, action: 'inbox' }
  ];

  assert.equal(validateConfig(config), config);
});
