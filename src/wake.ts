import type { WakeMatch } from './models.js';

export function findWakePhrase(text: string, wakePhrases: string[]): WakeMatch | undefined {
  const haystack = text.toLocaleLowerCase();
  const candidates = wakePhrases
    .map((phrase) => ({ phrase, index: firstBoundaryMatch(haystack, phrase.toLocaleLowerCase()) }))
    .filter((candidate) => candidate.index >= 0)
    .sort((a, b) => a.index - b.index || b.phrase.length - a.phrase.length);
  const first = candidates[0];
  if (!first) return undefined;
  const commandText = text.slice(first.index + first.phrase.length).replace(/^[\s\p{P}\p{S}]+/u, '').trim();
  return { phrase: first.phrase, commandText, index: first.index };
}

export function commandTextFor(text: string, wakePhrases: string[]): { wake?: WakeMatch; commandText: string } {
  const wake = findWakePhrase(text, wakePhrases);
  return { ...(wake ? { wake } : {}), commandText: wake ? wake.commandText : text.trim() };
}

function firstBoundaryMatch(text: string, phrase: string): number {
  let fromIndex = 0;
  while (fromIndex <= text.length - phrase.length) {
    const index = text.indexOf(phrase, fromIndex);
    if (index < 0) return -1;
    const before = index > 0 ? text[index - 1] : undefined;
    const afterIndex = index + phrase.length;
    const after = afterIndex < text.length ? text[afterIndex] : undefined;
    if (!isWordCharacter(before) && !isWordCharacter(after)) return index;
    fromIndex = index + 1;
  }
  return -1;
}

function isWordCharacter(value: string | undefined): boolean {
  return value !== undefined && /[\p{L}\p{N}_]/u.test(value);
}
