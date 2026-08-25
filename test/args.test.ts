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

test('parseArgs enforces commands without positional arguments', () => {
  for (const command of ['help', 'init', 'hooks', 'doctor']) {
    assert.throws(
      () => parseArgs([command, 'unexpected']),
      new RegExp(`${command} does not accept positional arguments`),
    );
  }
});

test('parseArgs accepts exactly one transcript source for ingest and scan', () => {
  for (const command of ['ingest', 'scan']) {
    assert.equal(parseArgs([command, 'transcript.jsonl']).positionals[0], 'transcript.jsonl');
    assert.equal(parseArgs([command, '--transcript', 'transcript.jsonl']).flags.transcript, 'transcript.jsonl');
    assert.throws(
      () => parseArgs([command]),
      new RegExp(`${command} requires one transcript file`),
    );
    assert.throws(
      () => parseArgs([command, 'one.jsonl', 'two.jsonl']),
      new RegExp(`${command} accepts exactly one transcript file`),
    );
    assert.throws(
      () => parseArgs([command, 'one.jsonl', '--transcript', 'two.jsonl']),
      new RegExp(`${command} transcript must be supplied either positionally or with --transcript, not both`),
    );
  }
});
