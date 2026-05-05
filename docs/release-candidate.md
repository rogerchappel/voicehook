# Release candidate readiness

Status: **READY**

Generated: 2026-05-05 21:25:33 UTC

## Scope

Release-candidate readiness pass for `rogerchappel/voicehook` against `origin/main`.

## Local verification

- npm ci:pass
- release:check:pass
- validate.sh:pass
- releasebox:pass

## Blockers

- None found in local readiness gates.

## ReleaseBox check / command log

```text
npm notice 1.5kB dist/src/args.js.map
npm notice 64B dist/src/cli.d.ts
npm notice 103B dist/src/cli.d.ts.map
npm notice 2.7kB dist/src/cli.js
npm notice 3.1kB dist/src/cli.js.map
npm notice 350B dist/src/config.d.ts
npm notice 361B dist/src/config.d.ts.map
npm notice 2.4kB dist/src/config.js
npm notice 2.6kB dist/src/config.js.map
npm notice 207B dist/src/defaults.d.ts
npm notice 228B dist/src/defaults.d.ts.map
npm notice 809B dist/src/defaults.js
npm notice 551B dist/src/defaults.js.map
npm notice 436B dist/src/engine.d.ts
npm notice 434B dist/src/engine.d.ts.map
npm notice 2.2kB dist/src/engine.js
npm notice 2.4kB dist/src/engine.js.map
npm notice 358B dist/src/errors.d.ts
npm notice 307B dist/src/errors.d.ts.map
npm notice 569B dist/src/errors.js
npm notice 569B dist/src/errors.js.map
npm notice 248B dist/src/format.d.ts
npm notice 272B dist/src/format.d.ts.map
npm notice 1.1kB dist/src/format.js
npm notice 1.5kB dist/src/format.js.map
npm notice 682B dist/src/help.d.ts
npm notice 137B dist/src/help.d.ts.map
npm notice 656B dist/src/help.js
npm notice 155B dist/src/help.js.map
npm notice 403B dist/src/hooks.d.ts
npm notice 401B dist/src/hooks.d.ts.map
npm notice 1.8kB dist/src/hooks.js
npm notice 2.2kB dist/src/hooks.js.map
npm notice 328B dist/src/index.d.ts
npm notice 317B dist/src/index.d.ts.map
npm notice 326B dist/src/index.js
npm notice 315B dist/src/index.js.map
npm notice 204B dist/src/logs.d.ts
npm notice 285B dist/src/logs.d.ts.map
npm notice 520B dist/src/logs.js
npm notice 725B dist/src/logs.js.map
npm notice 1.6kB dist/src/models.d.ts
npm notice 1.7kB dist/src/models.d.ts.map
npm notice 45B dist/src/models.js
npm notice 107B dist/src/models.js.map
npm notice 258B dist/src/paths.d.ts
npm notice 298B dist/src/paths.d.ts.map
npm notice 576B dist/src/paths.js
npm notice 722B dist/src/paths.js.map
npm notice 374B dist/src/transcripts.d.ts
npm notice 390B dist/src/transcripts.d.ts.map
npm notice 1.9kB dist/src/transcripts.js
npm notice 2.4kB dist/src/transcripts.js.map
npm notice 309B dist/src/wake.d.ts
npm notice 371B dist/src/wake.d.ts.map
npm notice 839B dist/src/wake.js
npm notice 1.2kB dist/src/wake.js.map
npm notice 49B dist/test/cli.test.d.ts
npm notice 114B dist/test/cli.test.d.ts.map
npm notice 873B dist/test/cli.test.js
npm notice 1.0kB dist/test/cli.test.js.map
npm notice 52B dist/test/config.test.d.ts
npm notice 120B dist/test/config.test.d.ts.map
npm notice 667B dist/test/config.test.js
npm notice 822B dist/test/config.test.js.map
npm notice 52B dist/test/engine.test.d.ts
npm notice 120B dist/test/engine.test.d.ts.map
npm notice 1.4kB dist/test/engine.test.js
npm notice 1.6kB dist/test/engine.test.js.map
npm notice 51B dist/test/hooks.test.d.ts
npm notice 118B dist/test/hooks.test.d.ts.map
npm notice 921B dist/test/hooks.test.js
npm notice 1.0kB dist/test/hooks.test.js.map
npm notice 57B dist/test/transcripts.test.d.ts
npm notice 130B dist/test/transcripts.test.d.ts.map
npm notice 749B dist/test/transcripts.test.js
npm notice 828B dist/test/transcripts.test.js.map
npm notice 50B dist/test/wake.test.d.ts
npm notice 116B dist/test/wake.test.d.ts.map
npm notice 592B dist/test/wake.test.js
npm notice 616B dist/test/wake.test.js.map
npm notice 430B examples/capture-inbox.config.json
npm notice 588B examples/opencLaw-inbox.config.json
npm notice 392B fixtures/transcripts/demo.jsonl
npm notice 108B fixtures/transcripts/plain.txt
npm notice 806B fixtures/voicehook.config.json
npm notice 1.6kB package.json
npm notice Tarball Details
npm notice name: voicehook
npm notice version: 0.1.0
npm notice filename: voicehook-0.1.0.tgz
npm notice package size: 18.9 kB
npm notice unpacked size: 70.6 kB
npm notice shasum: a460388a4553d36e347c898d32005793d70e55bc
npm notice integrity: sha512-jTzo5KaMGG4S7[...]qbXKqNAb7U/Eg==
npm notice total files: 93
npm notice
voicehook-0.1.0.tgz
EXIT_CODE=0
\n===== bash scripts/validate.sh =====
+ bash -lc cd '/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness' && bash scripts/validate.sh
Checking voicehook required files...
PASS: required file exists: README.md
PASS: required file exists: AGENTS.md
PASS: required file exists: CONTRIBUTING.md
PASS: required file exists: SECURITY.md
PASS: required file exists: .github/pull_request_template.md
PASS: required file exists: scripts/validate.sh

Checking voicehook required directories...
PASS: required directory exists: .github
PASS: required directory exists: docs
PASS: required directory exists: scripts

Running local project checks where present...
NOTE: using package manager: npm

> voicehook@0.1.0 check
> tsc --noEmit

PASS: package script: check

> voicehook@0.1.0 test
> npm run build --silent && node --test dist/test/*.test.js

✔ CLI help prints safety guidance (63.398333ms)
✔ CLI smoke fixture emits JSON events (65.684208ms)
✔ default config is valid and safe (0.725375ms)
✔ validateConfig rejects append-file hooks without a target (0.209083ms)
✔ ingestEntries dry-run renders inbox without writing files (2.293375ms)
✔ ingestEntries appends local inbox and logs (4.432ms)
✔ includes hook matches command text (0.705208ms)
✔ renderHook substitutes safe template variables (0.148375ms)
✔ parseTranscriptJsonl normalizes entries (0.697375ms)
✔ parseTranscriptText creates deterministic ids (2.32275ms)
✔ findWakePhrase extracts command text after the phrase (1.659333ms)
✔ findWakePhrase returns undefined without a wake phrase (0.089791ms)
ℹ tests 12
ℹ suites 0
ℹ pass 12
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 242.078125
PASS: package script: test

> voicehook@0.1.0 build
> tsc -p tsconfig.json && node scripts/make-cli-executable.mjs

PASS: package script: build

> voicehook@0.1.0 smoke
> npm run build --silent && node dist/src/cli.js ingest --config fixtures/voicehook.config.json --transcript fixtures/transcripts/demo.jsonl --dry-run --json

{
  "entries": [
    {
      "id": "demo-1",
      "text": "background chatter with no wake phrase",
      "timestamp": "2026-05-02T08:00:00.000Z",
      "speaker": "roger",
      "source": "/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness/fixtures/transcripts/demo.jsonl"
    },
    {
      "id": "demo-2",
      "text": "Voicehook remind Atlas to review the inbox capture flow",
      "timestamp": "2026-05-02T08:01:00.000Z",
      "speaker": "roger",
      "source": "/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness/fixtures/transcripts/demo.jsonl"
    },
    {
      "id": "demo-3",
      "text": "hey crew add buy coffee filters to the local inbox",
      "timestamp": "2026-05-02T08:02:00.000Z",
      "speaker": "roger",
      "source": "/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness/fixtures/transcripts/demo.jsonl"
    }
  ],
  "events": [
    {
      "id": "723c0509-eef7-4a38-9f29-fe5a529e8437",
      "timestamp": "2026-05-02T08:01:00.000Z",
      "transcript": {
        "id": "demo-2",
        "text": "Voicehook remind Atlas to review the inbox capture flow",
        "timestamp": "2026-05-02T08:01:00.000Z",
        "speaker": "roger",
        "source": "/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness/fixtures/transcripts/demo.jsonl"
      },
      "wake": {
        "phrase": "voicehook",
        "commandText": "remind Atlas to review the inbox capture flow",
        "index": 0
      },
      "commandText": "remind Atlas to review the inbox capture flow",
      "matchedHookIds": [
        "capture-inbox",
        "agent-handoff"
      ]
    },
    {
      "id": "decebc71-5bcf-407d-b7ac-bde6de9008fa",
      "timestamp": "2026-05-02T08:02:00.000Z",
      "transcript": {
        "id": "demo-3",
        "text": "hey crew add buy coffee filters to the local inbox",
        "timestamp": "2026-05-02T08:02:00.000Z",
        "speaker": "roger",
        "source": "/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness/fixtures/transcripts/demo.jsonl"
      },
      "wake": {
        "phrase": "hey crew",
        "commandText": "add buy coffee filters to the local inbox",
        "index": 0
      },
      "commandText": "add buy coffee filters to the local inbox",
      "matchedHookIds": [
        "capture-inbox"
      ]
    }
  ],
  "hookResults": [
    {
      "hookId": "capture-inbox",
      "action": "inbox",
      "rendered": "- [ ] remind Atlas to review the inbox capture flow\n  - heard: 2026-05-02T08:01:00.000Z\n  - wake: voicehook\n"
    },
    {
      "hookId": "agent-handoff",
      "action": "emit-json",
      "rendered": "{\"id\":\"723c0509-eef7-4a38-9f29-fe5a529e8437\",\"timestamp\":\"2026-05-02T08:01:00.000Z\",\"transcript\":{\"id\":\"demo-2\",\"text\":\"Voicehook remind Atlas to review the inbox capture flow\",\"timestamp\":\"2026-05-02T08:01:00.000Z\",\"speaker\":\"roger\",\"source\":\"/Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness/fixtures/transcripts/demo.jsonl\"},\"wake\":{\"phrase\":\"voicehook\",\"commandText\":\"remind Atlas to review the inbox capture flow\",\"index\":0},\"commandText\":\"remind Atlas to review the inbox capture flow\",\"matchedHookIds\":[\"capture-inbox\",\"agent-handoff\"]}"
    },
    {
      "hookId": "capture-inbox",
      "action": "inbox",
      "rendered": "- [ ] add buy coffee filters to the local inbox\n  - heard: 2026-05-02T08:02:00.000Z\n  - wake: hey crew\n"
    }
  ],
  "dryRun": true,
  "wrote": []
}
PASS: package script: smoke
NOTE: agent-qc not installed; skipping optional agent check

Validation passed.
EXIT_CODE=0
\n===== releasebox check =====
+ node /Users/roger/Developer/my-opensource/releasebox/bin/releasebox.js check /Users/roger/Developer/my-opensource/_worktrees/voicehook-release-candidate-readiness
✅ releasebox config: node-cli
✅ ci workflow: .github/workflows/ci.yml
✅ release dry run workflow: .github/workflows/release-dry-run.yml
✅ task breakdown: docs/TASKS.md
✅ orchestration plan: docs/ORCHESTRATION.md
✅ dependabot config: .github/dependabot.yml
✅ npm test script: npm run build --silent && node --test dist/test/*.test.js
✅ build script: tsc -p tsconfig.json && node scripts/make-cli-executable.mjs
✅ smoke script: npm run build --silent && node dist/src/cli.js ingest --config fixtures/voicehook.config.json --transcript fixtures/transcripts/demo.jsonl --dry-run --json
✅ bin entry: {"voicehook":"./dist/src/cli.js"}
EXIT_CODE=0
```
