import test from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs } from '../src/args.js';

test('parseArgs accepts documented boolean and valued options', () => {
  assert.deepEqual(
    parseArgs(['ingest', '--transcript=input.jsonl', '--config', 'voicehook.json', '--dry-run', '--json']),
    {
      command: 'ingest',
      flags: {
        transcript: 'input.jsonl',
        config: 'voicehook.json',
        'dry-run': true,
        json: true,
      },
      positionals: [],
    },
  );
});

test('parseArgs rejects unknown and command-specific options', () => {
  assert.throws(() => parseArgs(['ingest', '--dryrun']), /Unknown option for ingest: --dryrun/);
  assert.throws(() => parseArgs(['hooks', '--force']), /Unknown option for hooks: --force/);
  assert.throws(() => parseArgs(['scan', '--dry-run']), /Unknown option for scan: --dry-run/);
});

test('parseArgs enforces boolean and valued option forms', () => {
  assert.throws(() => parseArgs(['ingest', '--json=true']), /--json does not accept a value/);
  assert.throws(() => parseArgs(['ingest', '--config']), /--config requires a value/);
  assert.throws(() => parseArgs(['ingest', '--transcript=']), /--transcript requires a value/);
});
