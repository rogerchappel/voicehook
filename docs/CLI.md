# CLI reference

## `voicehook init`

Writes a default local-first config.

```bash
voicehook init --config voicehook.config.json
```

Use `--force` to overwrite an existing config.

## `voicehook ingest`

Reads transcript entries, matches wake phrases, renders hooks, and writes local logs unless `--dry-run` is set.

```bash
voicehook ingest --config voicehook.config.json --transcript transcript.jsonl --json
```

All relative output paths in the loaded config are based on the config file's
parent directory. This also applies when the config filename is extensionless
or does not end in `.json`; absolute output paths remain unchanged.

## `voicehook scan`

Dry-run alias for inspecting matched commands before writing files.

## `voicehook hooks`

Lists configured hooks and actions.

## `voicehook doctor`

Validates config and prints a short readiness summary.
