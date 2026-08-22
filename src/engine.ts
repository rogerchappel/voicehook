import { randomUUID } from 'node:crypto';
import { appendJsonl, appendText } from './logs.js';
import { matchingHooks, renderHook } from './hooks.js';
import { resolveFromFile } from './paths.js';
import { commandTextFor } from './wake.js';
import type { HookResult, IngestOptions, IngestResult, TranscriptEntry, VoicehookConfig, VoicehookEvent } from './models.js';

export function buildEvents(entries: TranscriptEntry[], config: VoicehookConfig, now = () => new Date()): VoicehookEvent[] {
  return entries
    .map((transcript) => {
      const command = commandTextFor(transcript.text, config.wakePhrases);
      const timestamp = transcript.timestamp || now().toISOString();
      const event: VoicehookEvent = {
        id: randomUUID(),
        timestamp,
        transcript,
        ...(command.wake ? { wake: command.wake } : {}),
        commandText: command.commandText,
        matchedHookIds: []
      };
      if (command.wake && command.commandText === '') return event;
      event.matchedHookIds = matchingHooks(config.hooks, event).map((hook) => hook.id);
      return event;
    })
    .filter((event) => event.matchedHookIds.length > 0);
}

export async function ingestEntries(
  entries: TranscriptEntry[],
  config: VoicehookConfig,
  configPath: string,
  options: IngestOptions = {}
): Promise<IngestResult> {
  const events = buildEvents(entries, config, options.now);
  const hookResults: HookResult[] = [];
  for (const event of events) {
    for (const hook of matchingHooks(config.hooks, event)) hookResults.push(renderHook(hook, event));
  }
  const wrote: string[] = [];
  if (!options.dryRun) {
    const transcriptLog = resolveFromFile(configPath, config.transcriptLogPath);
    const eventLog = resolveFromFile(configPath, config.eventLogPath);
    await appendJsonl(transcriptLog, entries);
    await appendJsonl(eventLog, events);
    wrote.push(transcriptLog, eventLog);
    for (const result of hookResults) {
      const target = targetFor(result, config, configPath);
      if (result.action !== 'emit-json') {
        await appendText(target, result.rendered);
        wrote.push(target);
      }
    }
  }
  return { entries, events, hookResults, dryRun: options.dryRun ?? false, wrote: [...new Set(wrote)] };
}

function targetFor(result: HookResult, config: VoicehookConfig, configPath: string): string {
  return resolveFromFile(configPath, result.targetPath ?? config.inboxPath);
}
