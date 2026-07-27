import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

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

test('CLI rejects misspelled options before creating operational outputs', () => {
  const directory = mkdtempSync(join(tmpdir(), 'voicehook-cli-'));
  const configPath = join(directory, 'voicehook.config.json');
  const transcriptPath = join(directory, 'transcript.jsonl');
  const paths = {
    inboxPath: join(directory, 'inbox.md'),
    transcriptLogPath: join(directory, 'transcripts.jsonl'),
    eventLogPath: join(directory, 'events.jsonl'),
  };
  const fixture = JSON.parse(readFileSync('fixtures/voicehook.config.json', 'utf8'));
  writeFileSync(configPath, JSON.stringify({ ...fixture, ...paths }));
  writeFileSync(transcriptPath, '{"id":"1","text":"voicehook add a task"}\n');

  const run = spawnSync(process.execPath, [
    'dist/src/cli.js',
    'ingest',
    '--config',
    configPath,
    '--transcript',
    transcriptPath,
    '--dryrun',
    '--json',
  ], { encoding: 'utf8' });

  assert.equal(run.status, 1);
  assert.match(run.stderr, /Unknown option for ingest: --dryrun/);
  for (const outputPath of Object.values(paths)) {
    assert.throws(() => readFileSync(outputPath), { code: 'ENOENT' });
  }
});
