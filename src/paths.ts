import { dirname, isAbsolute, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

export function resolveFromDirectory(baseDir: string, maybePath: string): string {
  return isAbsolute(maybePath) ? maybePath : resolve(baseDir, maybePath);
}

export function resolveFromFile(baseFile: string, maybePath: string): string {
  return resolveFromDirectory(dirname(baseFile), maybePath);
}

export async function ensureParent(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

export function defaultConfigPath(cwd = process.cwd()): string {
  return resolve(cwd, 'voicehook.config.json');
}
