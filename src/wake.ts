import type { WakeMatch } from './models.js';

export function findWakePhrase(text: string, wakePhrases: string[]): WakeMatch | undefined {
  const haystack = text.toLocaleLowerCase();
  const candidates = wakePhrases
    .map((phrase) => ({ phrase, index: haystack.indexOf(phrase.toLocaleLowerCase()) }))
    .filter((candidate) => candidate.index >= 0)
    .sort((a, b) => a.index - b.index || b.phrase.length - a.phrase.length);
  const first = candidates[0];
  if (!first) return undefined;
  const commandText = text.slice(first.index + first.phrase.length).replace(/^[\s,.:;-]+/, '').trim();
  return { phrase: first.phrase, commandText, index: first.index };
}

export function commandTextFor(text: string, wakePhrases: string[]): { wake?: WakeMatch; commandText: string } {
  const wake = findWakePhrase(text, wakePhrases);
  return { ...(wake ? { wake } : {}), commandText: wake?.commandText || text.trim() };
}
