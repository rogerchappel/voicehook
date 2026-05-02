import type { VoicehookConfig } from './models.js';

export const DEFAULT_WAKE_PHRASES = ['voicehook', 'hey crew', 'crew command'];

export function createDefaultConfig(): VoicehookConfig {
  return {
    wakePhrases: [...DEFAULT_WAKE_PHRASES],
    inboxPath: '.voicehook/inbox.md',
    transcriptLogPath: '.voicehook/transcripts.jsonl',
    eventLogPath: '.voicehook/events.jsonl',
    hooks: [
      {
        id: 'capture-inbox',
        description: 'Capture every wake-phrase command into the local inbox.',
        enabled: true,
        requireWake: true,
        match: { type: 'always' },
        action: 'inbox',
        template: '- [ ] {{commandText}}\n  - heard: {{timestamp}}\n  - transcript: {{transcriptId}}\n'
      }
    ]
  };
}
