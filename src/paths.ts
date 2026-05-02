import { dirname, isAbsolute, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

export function resolveFrom(baseFileOrDir: string, maybePath: string): string {
  const baseDir = baseFileOrDir.endsWith('.json') ? dirname(baseFileOrDir) : baseFileOrDir;
  return isAbsolute(maybePath) ? maybePath : resolve(baseDir, maybePath);
}

export async function ensureParent(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

export function defaultConfigPath(cwd = process.cwd()): string {
  return resolve(cwd, 'voicehook.config.json');
}
