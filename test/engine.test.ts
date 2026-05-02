import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createDefaultConfig, ingestEntries } from '../src/index.js';

test('ingestEntries dry-run renders inbox without writing files', async () => {
  const config = createDefaultConfig();
  const result = await ingestEntries([{ id: 't', text: 'Voicehook add a task', timestamp: '2026-01-01T00:00:00.000Z' }], config, join(process.cwd(), 'voicehook.config.json'), { dryRun: true });
  assert.equal(result.events.length, 1);
  assert.equal(result.hookResults[0]?.rendered.includes('add a task'), true);
  assert.deepEqual(result.wrote, []);
});

test('ingestEntries appends local inbox and logs', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'voicehook-'));
  try {
    const config = createDefaultConfig();
    const result = await ingestEntries([{ id: 't', text: 'Voicehook write inbox', timestamp: '2026-01-01T00:00:00.000Z' }], config, join(dir, 'voicehook.config.json'));
    assert.equal(result.wrote.length, 3);
    const inbox = await readFile(join(dir, '.voicehook/inbox.md'), 'utf8');
    assert.match(inbox, /write inbox/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
