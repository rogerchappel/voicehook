import type { IngestResult, VoicehookConfig } from './models.js';

export function formatIngestMarkdown(result: IngestResult): string {
  const lines = [
    `Processed ${result.entries.length} transcript entr${result.entries.length === 1 ? 'y' : 'ies'}.`,
    `Matched ${result.events.length} command event${result.events.length === 1 ? '' : 's'}.`,
    `Rendered ${result.hookResults.length} hook result${result.hookResults.length === 1 ? '' : 's'}.`
  ];
  if (result.dryRun) lines.push('Dry run: no files were written.');
  if (result.wrote.length > 0) lines.push('', 'Wrote:', ...result.wrote.map((file) => `- ${file}`));
  if (result.events.length > 0) {
    lines.push('', 'Commands:', ...result.events.map((event) => `- ${event.commandText} (${event.matchedHookIds.join(', ')})`));
  }
  return `${lines.join('\n')}\n`;
}

export function formatHooks(config: VoicehookConfig): string {
  if (config.hooks.length === 0) return 'No hooks configured.\n';
  const rows = config.hooks.map((hook) => `- ${hook.id}: ${hook.enabled === false ? 'disabled' : 'enabled'} ${hook.match.type} -> ${hook.action}`);
  return `${rows.join('\n')}\n`;
}
