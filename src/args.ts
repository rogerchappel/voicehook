import { VoicehookError } from './errors.js';

export interface ParsedArgs {
  command: string;
  flags: Record<string, string | boolean>;
  positionals: string[];
}

type FlagKind = 'boolean' | 'value';

const commonFlags: Record<string, FlagKind> = {
  help: 'boolean',
};

const commandFlags: Record<string, Record<string, FlagKind>> = {
  help: {},
  init: { config: 'value', force: 'boolean', json: 'boolean' },
  ingest: { config: 'value', transcript: 'value', 'dry-run': 'boolean', json: 'boolean' },
  scan: { config: 'value', transcript: 'value', json: 'boolean' },
  hooks: { config: 'value', json: 'boolean' },
  doctor: { config: 'value', json: 'boolean' },
};

export function parseArgs(argv: string[]): ParsedArgs {
  const [command = 'help', ...rest] = argv;
  const allowedFlags = commandFlags[command];
  if (!allowedFlags) throw new VoicehookError(`Unknown command: ${command}`, 'ARGS_ERROR');
  const flags: Record<string, string | boolean> = {};
  const positionals: string[] = [];
  for (let index = 0; index < rest.length; index += 1) {
    const item = rest[index];
    if (!item) continue;
    if (!item.startsWith('--')) {
      positionals.push(item);
      continue;
    }
    const [rawKey, inlineValue] = item.slice(2).split('=', 2);
    if (!rawKey) throw new VoicehookError('Empty flag name.', 'ARGS_ERROR');
    const kind = allowedFlags[rawKey] ?? commonFlags[rawKey];
    if (!kind) throw new VoicehookError(`Unknown option for ${command}: --${rawKey}`, 'ARGS_ERROR');
    if (inlineValue !== undefined) {
      if (kind === 'boolean') {
        throw new VoicehookError(`Option --${rawKey} does not accept a value.`, 'ARGS_ERROR');
      }
      if (inlineValue === '') throw new VoicehookError(`Option --${rawKey} requires a value.`, 'ARGS_ERROR');
      flags[rawKey] = inlineValue;
      continue;
    }
    const next = rest[index + 1];
    if (kind === 'value' && next && !next.startsWith('--')) {
      flags[rawKey] = next;
      index += 1;
    } else if (kind === 'boolean') {
      flags[rawKey] = true;
    } else {
      throw new VoicehookError(`Option --${rawKey} requires a value.`, 'ARGS_ERROR');
    }
  }
  return { command, flags, positionals };
}

export function stringFlag(flags: Record<string, string | boolean>, name: string): string | undefined {
  const value = flags[name];
  return typeof value === 'string' ? value : undefined;
}

export function boolFlag(flags: Record<string, string | boolean>, name: string): boolean {
  return flags[name] === true;
}
