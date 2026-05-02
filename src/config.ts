import { readFile, writeFile } from 'node:fs/promises';
import { ConfigError } from './errors.js';
import { createDefaultConfig } from './defaults.js';
import { ensureParent } from './paths.js';
import type { HookDefinition, VoicehookConfig } from './models.js';

const hookActions = new Set(['inbox', 'append-file', 'emit-json']);
const matcherTypes = new Set(['includes', 'regex', 'always']);

export function validateConfig(input: unknown): VoicehookConfig {
  if (!input || typeof input !== 'object') throw new ConfigError('Config must be a JSON object.');
  const value = input as Partial<VoicehookConfig>;
  if (!Array.isArray(value.wakePhrases) || value.wakePhrases.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new ConfigError('Config wakePhrases must be a non-empty string array.');
  }
  for (const key of ['inboxPath', 'transcriptLogPath', 'eventLogPath'] as const) {
    if (typeof value[key] !== 'string' || value[key]?.trim() === '') throw new ConfigError(`Config ${key} must be a path string.`);
  }
  if (!Array.isArray(value.hooks)) throw new ConfigError('Config hooks must be an array.');
  value.hooks.forEach(validateHook);
  return value as VoicehookConfig;
}

function validateHook(hook: HookDefinition, index: number): void {
  if (!hook || typeof hook !== 'object') throw new ConfigError(`Hook ${index} must be an object.`);
  if (!hook.id || typeof hook.id !== 'string') throw new ConfigError(`Hook ${index} needs a string id.`);
  if (!hook.match || !matcherTypes.has(hook.match.type)) throw new ConfigError(`Hook ${hook.id} has an invalid matcher type.`);
  if (hook.match.type !== 'always' && (!hook.match.value || typeof hook.match.value !== 'string')) {
    throw new ConfigError(`Hook ${hook.id} matcher needs a value.`);
  }
  if (!hookActions.has(hook.action)) throw new ConfigError(`Hook ${hook.id} has an invalid action.`);
  if (hook.action === 'append-file' && !hook.targetPath) throw new ConfigError(`Hook ${hook.id} append-file action needs targetPath.`);
}

export async function loadConfig(configPath: string): Promise<VoicehookConfig> {
  const raw = await readFile(configPath, 'utf8');
  return validateConfig(JSON.parse(raw));
}

export async function writeDefaultConfig(configPath: string, force = false): Promise<VoicehookConfig> {
  const config = createDefaultConfig();
  await ensureParent(configPath);
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, { flag: force ? 'w' : 'wx' });
  return config;
}
