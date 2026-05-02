#!/usr/bin/env node
import { resolve } from 'node:path';
import { boolFlag, parseArgs, stringFlag } from './args.js';
import { loadConfig, writeDefaultConfig } from './config.js';
import { ingestEntries } from './engine.js';
import { VoicehookError } from './errors.js';
import { formatHooks, formatIngestMarkdown } from './format.js';
import { HELP } from './help.js';
import { defaultConfigPath } from './paths.js';
import { readTranscriptFile } from './transcripts.js';

async function main(argv: string[]): Promise<number> {
  const parsed = parseArgs(argv);
  if (parsed.command === 'help' || boolFlag(parsed.flags, 'help')) {
    process.stdout.write(HELP);
    return 0;
  }
  const configPath = resolve(stringFlag(parsed.flags, 'config') ?? defaultConfigPath());
  const json = boolFlag(parsed.flags, 'json');
  if (parsed.command === 'init') {
    const config = await writeDefaultConfig(configPath, boolFlag(parsed.flags, 'force'));
    output(json, { configPath, config }, `Created ${configPath}\n`);
    return 0;
  }
  if (parsed.command === 'hooks') {
    const config = await loadConfig(configPath);
    output(json, config.hooks, formatHooks(config));
    return 0;
  }
  if (parsed.command === 'doctor') {
    const config = await loadConfig(configPath);
    output(json, { ok: true, configPath, hooks: config.hooks.length, wakePhrases: config.wakePhrases }, `OK: ${configPath}\nHooks: ${config.hooks.length}\nWake phrases: ${config.wakePhrases.join(', ')}\n`);
    return 0;
  }
  if (parsed.command === 'ingest' || parsed.command === 'scan') {
    const transcriptPath = stringFlag(parsed.flags, 'transcript') ?? parsed.positionals[0];
    if (!transcriptPath) throw new VoicehookError('Missing --transcript file.', 'ARGS_ERROR');
    const config = await loadConfig(configPath);
    const entries = await readTranscriptFile(resolve(transcriptPath));
    const dryRun = parsed.command === 'scan' ? true : boolFlag(parsed.flags, 'dry-run');
    const result = await ingestEntries(entries, config, configPath, { dryRun });
    output(json, result, formatIngestMarkdown(result));
    return 0;
  }
  throw new VoicehookError(`Unknown command: ${parsed.command}`, 'ARGS_ERROR');
}

function output(json: boolean, value: unknown, markdown: string): void {
  process.stdout.write(json ? `${JSON.stringify(value, null, 2)}\n` : markdown);
}

main(process.argv.slice(2)).then((code) => {
  process.exitCode = code;
}).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`voicehook: ${message}\n`);
  process.exitCode = 1;
});
