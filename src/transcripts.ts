import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { TranscriptError } from './errors.js';
import type { TranscriptEntry } from './models.js';

export function parseTranscriptText(text: string, source = 'inline'): TranscriptEntry[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({ id: `${basename(source)}:${index + 1}`, text: line, timestamp: new Date(0).toISOString(), source }));
}

export function parseTranscriptJsonl(text: string, source = 'inline'): TranscriptEntry[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => normalizeTranscriptJsonLine(line, index, source));
}

function normalizeTranscriptJsonLine(line: string, index: number, source: string): TranscriptEntry {
  let parsed: unknown;
  try {
    parsed = JSON.parse(line);
  } catch (error) {
    throw new TranscriptError(`Invalid JSONL transcript at ${source}:${index + 1}: ${(error as Error).message}`);
  }
  if (!parsed || typeof parsed !== 'object') throw new TranscriptError(`Transcript line ${index + 1} must be an object.`);
  const row = parsed as Record<string, unknown>;
  if (typeof row.text !== 'string' || row.text.trim() === '') throw new TranscriptError(`Transcript line ${index + 1} needs text.`);
  return {
    id: typeof row.id === 'string' ? row.id : `${basename(source)}:${index + 1}`,
    text: row.text,
    timestamp: typeof row.timestamp === 'string' ? row.timestamp : new Date(0).toISOString(),
    ...(typeof row.speaker === 'string' ? { speaker: row.speaker } : {}),
    source,
    ...(typeof row.confidence === 'number' ? { confidence: row.confidence } : {})
  };
}

export async function readTranscriptFile(filePath: string): Promise<TranscriptEntry[]> {
  const raw = await readFile(filePath, 'utf8');
  return filePath.endsWith('.jsonl') ? parseTranscriptJsonl(raw, filePath) : parseTranscriptText(raw, filePath);
}
