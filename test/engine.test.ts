import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join } from 'node:path';
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

for (const configName of ['settings', 'voicehook.JSON']) {
  test(`ingestEntries resolves every relative output from ${configName} parent`, async () => {
    const dir = await mkdtemp(join(tmpdir(), 'voicehook-'));
    try {
      const config = createDefaultConfig();
      config.inboxPath = 'output/inbox.md';
      config.transcriptLogPath = 'output/transcripts.jsonl';
      config.eventLogPath = 'output/events.jsonl';
      config.hooks.push({
        id: 'append-audit',
        requireWake: true,
        match: { type: 'always' },
        action: 'append-file',
        targetPath: 'output/audit.md'
      });

      const result = await ingestEntries(
        [{ id: 't', text: 'Voicehook resolve every output', timestamp: '2026-01-01T00:00:00.000Z' }],
        config,
        join(dir, configName)
      );

      assert.deepEqual(result.wrote, [
        join(dir, 'output/transcripts.jsonl'),
        join(dir, 'output/events.jsonl'),
        join(dir, 'output/inbox.md'),
        join(dir, 'output/audit.md')
      ]);
      await Promise.all(result.wrote.map((path) => readFile(path, 'utf8')));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
}

test('ingestEntries retains absolute configured output paths', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'voicehook-'));
  try {
    const config = createDefaultConfig();
    config.inboxPath = join(dir, 'absolute-inbox.md');
    config.transcriptLogPath = join(dir, 'absolute-transcripts.jsonl');
    config.eventLogPath = join(dir, 'absolute-events.jsonl');
    const result = await ingestEntries(
      [{ id: 't', text: 'Voicehook retain absolute paths', timestamp: '2026-01-01T00:00:00.000Z' }],
      config,
      join(dir, 'nested', 'settings')
    );

    assert.equal(result.wrote.every(isAbsolute), true);
    assert.deepEqual(result.wrote, [config.transcriptLogPath, config.eventLogPath, config.inboxPath]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
