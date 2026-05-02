export type TranscriptFormat = 'text' | 'jsonl';

export interface TranscriptEntry {
  id: string;
  text: string;
  timestamp: string;
  speaker?: string;
  source?: string;
  confidence?: number;
}

export interface WakeMatch {
  phrase: string;
  commandText: string;
  index: number;
}

export type HookMatcherType = 'includes' | 'regex' | 'always';
export type HookAction = 'inbox' | 'append-file' | 'emit-json';

export interface HookDefinition {
  id: string;
  description?: string;
  enabled?: boolean;
  requireWake?: boolean;
  match: {
    type: HookMatcherType;
    value?: string;
    caseSensitive?: boolean;
  };
  action: HookAction;
  targetPath?: string;
  template?: string;
}

export interface VoicehookConfig {
  wakePhrases: string[];
  inboxPath: string;
  transcriptLogPath: string;
  eventLogPath: string;
  hooks: HookDefinition[];
}

export interface VoicehookEvent {
  id: string;
  timestamp: string;
  transcript: TranscriptEntry;
  wake?: WakeMatch;
  commandText: string;
  matchedHookIds: string[];
}

export interface HookResult {
  hookId: string;
  action: HookAction;
  targetPath?: string;
  rendered: string;
  skipped?: boolean;
  reason?: string;
}

export interface IngestOptions {
  dryRun?: boolean;
  now?: () => Date;
}

export interface IngestResult {
  entries: TranscriptEntry[];
  events: VoicehookEvent[];
  hookResults: HookResult[];
  dryRun: boolean;
  wrote: string[];
}
