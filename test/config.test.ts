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

test('validateConfig rejects malformed optional hook fields', () => {
  const malformedHooks = [
    { id: 'enabled', enabled: 'yes', match: { type: 'always' }, action: 'inbox' },
    { id: 'wake', requireWake: 1, match: { type: 'always' }, action: 'inbox' },
    { id: 'case', match: { type: 'always', caseSensitive: 'no' }, action: 'inbox' },
    { id: 'template', match: { type: 'always' }, action: 'inbox', template: 42 },
    { id: 'empty-template', match: { type: 'always' }, action: 'inbox', template: '  ' },
    { id: 'target', match: { type: 'always' }, action: 'inbox', targetPath: 42 },
    { id: 'empty-target', match: { type: 'always' }, action: 'inbox', targetPath: '  ' }
  ];

  for (const hook of malformedHooks) {
    const config = { ...createDefaultConfig(), hooks: [hook] };
    assert.throws(
      () => validateConfig(config),
      (error: unknown) => error instanceof ConfigError,
      `expected hook ${hook.id} to be rejected`
    );
  }
});

test('validateConfig rejects malformed append-file target paths', () => {
  for (const targetPath of [undefined, 42, '  ']) {
    const config = {
      ...createDefaultConfig(),
      hooks: [{ id: 'append', match: { type: 'always' }, action: 'append-file', targetPath }]
    };
    assert.throws(
      () => validateConfig(config),
      (error: unknown) => error instanceof ConfigError
    );
  }
});

test('validateConfig rejects empty and duplicate hook ids', () => {
  const emptyIdConfig = {
    ...createDefaultConfig(),
    hooks: [{ id: '  ', match: { type: 'always' }, action: 'inbox' }]
  };
  assert.throws(() => validateConfig(emptyIdConfig), (error: unknown) => error instanceof ConfigError);

  const duplicateIdConfig = {
    ...createDefaultConfig(),
    hooks: [
      { id: 'same', match: { type: 'always' }, action: 'inbox' },
      { id: 'same', match: { type: 'always' }, action: 'emit-json' }
    ]
  };
  assert.throws(() => validateConfig(duplicateIdConfig), (error: unknown) => error instanceof ConfigError);
});

test('validateConfig accepts omitted optional hook fields', () => {
  const config = {
    ...createDefaultConfig(),
    hooks: [{ id: 'minimal', match: { type: 'always' }, action: 'inbox' }]
  };

  assert.equal(validateConfig(config), config);
});
