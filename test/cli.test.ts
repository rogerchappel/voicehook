import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('CLI help prints safety guidance', () => {
  const run = spawnSync(process.execPath, ['dist/src/cli.js', 'help'], { encoding: 'utf8' });
  assert.equal(run.status, 0);
  assert.match(run.stdout, /unrestricted shell execution is intentionally not supported/);
});

test('CLI smoke fixture emits JSON events', () => {
  const run = spawnSync(process.execPath, ['dist/src/cli.js', 'ingest', '--config', 'fixtures/voicehook.config.json', '--transcript', 'fixtures/transcripts/demo.jsonl', '--dry-run', '--json'], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  const parsed = JSON.parse(run.stdout);
  assert.equal(parsed.events.length, 2);
  assert.equal(parsed.dryRun, true);
});
