export const HELP = `voicehook — local-first safe voice-command hooks

Usage:
  voicehook init [--config voicehook.config.json] [--force] [--json]
  voicehook ingest --transcript file.jsonl [--config voicehook.config.json] [--dry-run] [--json]
  voicehook scan --transcript file.jsonl [--config voicehook.config.json] [--json]
  voicehook hooks [--config voicehook.config.json] [--json]
  voicehook doctor [--config voicehook.config.json] [--json]

Safety:
  - transcript fixtures/files are local inputs
  - commands are rendered to inbox/files/json only
  - unrestricted shell execution is intentionally not supported
`;
