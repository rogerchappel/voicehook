# Adapter boundary

`voicehook` deliberately starts with transcript files and fixtures. Live microphone capture belongs behind an adapter that yields `TranscriptEntry` objects.

```ts
export interface TranscriptAdapter {
  name: string;
  read(): AsyncIterable<TranscriptEntry>;
}
```

Adapter requirements:

- local process only by default;
- no network calls unless the user selects an adapter that documents them;
- no shell execution adapter in core;
- deterministic transcript entries with timestamps and source names;
- tests must be runnable without audio hardware.

The current MVP ships a file adapter via `readTranscriptFile()`. That keeps the hook routing, wake phrase matching, and logs testable before any platform-specific audio work lands.
