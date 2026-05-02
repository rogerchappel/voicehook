# Contributing

Thanks for helping make `voicehook` safer and more useful.

## Development loop

```bash
npm install
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

## Contribution rules

- Keep the default path local-first.
- Add fixture-backed tests for parsing, routing, or CLI changes.
- Do not add telemetry, credential discovery, or hidden network calls.
- Do not add unrestricted shell execution to core.
- Document any new adapter boundary and privacy tradeoff.
- Link changes to an issue or PR description with a clear safety note.
