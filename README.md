# voicehook

Local-first safe voice-command hooks for transcript files, wake phrases, and agent inbox capture.

`voicehook` turns local transcript text into reviewable hooks. The MVP uses fixture/transcript files instead of a live microphone, with a clean adapter boundary for future local audio capture. It is built for CrewCmd/OpenClaw-style workflows where voice should capture intent, not secretly execute commands.

## Install

```bash
npm install
npm run build
```

From a checkout you can run:

```bash
node dist/src/cli.js help
```

## Quickstart

```bash
node dist/src/cli.js init --config voicehook.config.json
node dist/src/cli.js ingest \
  --config fixtures/voicehook.config.json \
  --transcript fixtures/transcripts/demo.jsonl \
  --dry-run \
  --json
```

Remove `--dry-run` when you want local logs and inbox files written.

## Commands

- `voicehook init` writes a safe default config.
- `voicehook ingest --transcript file.jsonl` parses transcript entries, matches wake phrases, and renders hooks.
- `voicehook scan --transcript file.jsonl` is a dry-run ingest alias for inspection.
- `voicehook hooks` lists configured hooks.
- `voicehook doctor` validates the config.

Every command supports `--json` where automation needs structured output.
Options are command-specific: unknown or misspelled options exit with an error
before Voicehook reads a config or transcript or writes operational output.

## Config shape

```json
{
  "wakePhrases": ["voicehook", "hey crew"],
  "inboxPath": ".voicehook/inbox.md",
  "transcriptLogPath": ".voicehook/transcripts.jsonl",
  "eventLogPath": ".voicehook/events.jsonl",
  "hooks": [
    {
      "id": "capture-inbox",
      "enabled": true,
      "requireWake": true,
      "match": { "type": "always" },
      "action": "inbox"
    }
  ]
}
```

`wakePhrases` must contain at least one non-empty string. Hook matchers support
`always`, `includes`, and `regex`; `includes` and `regex` require a non-empty
`value`, and regex values must be valid JavaScript regular-expression patterns.
Invalid configuration is rejected by `voicehook doctor` and before ingestion.

Supported hook actions are intentionally constrained:

- `inbox` — append markdown to the configured local inbox;
- `append-file` — append rendered text to an explicit local file;
- `emit-json` — return structured data without writing side effects.

There is no shell-execution hook in core.

## Transcript formats

JSONL:

```jsonl
{"id":"demo-1","timestamp":"2026-05-02T08:01:00.000Z","speaker":"roger","text":"Voicehook remind Atlas to review the inbox capture flow"}
```

Plain text files are also accepted; each non-empty line becomes a transcript entry.

## Local-first guarantees

- No hidden network calls.
- No telemetry.
- No credential lookup.
- No unrestricted shell execution.
- Logs and inbox output stay under local paths chosen by config.
- Fixture-backed tests run without audio hardware.

## Development

```bash
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

See `docs/SAFETY.md` and `docs/ADAPTERS.md` for the safety model and microphone adapter boundary.
