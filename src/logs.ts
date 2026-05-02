import { appendFile } from 'node:fs/promises';
import { ensureParent } from './paths.js';

export async function appendJsonl(filePath: string, rows: unknown[]): Promise<void> {
  if (rows.length === 0) return;
  await ensureParent(filePath);
  await appendFile(filePath, rows.map((row) => JSON.stringify(row)).join('\n') + '\n', 'utf8');
}

export async function appendText(filePath: string, text: string): Promise<void> {
  await ensureParent(filePath);
  await appendFile(filePath, text.endsWith('\n') ? text : `${text}\n`, 'utf8');
}
