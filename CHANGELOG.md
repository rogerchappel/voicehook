# Changelog

## Unreleased

## 0.1.1 - 2026-08-17

- Excluded compiled test artifacts from the published npm package and added package-surface verification.
- Added trusted npm publishing with provenance for new version tags.
- Corrected installation guidance while the package is unpublished and added an installed-package documentation smoke check.

## 0.1.0 - 2026-05-02

- Added local transcript ingestion for JSONL and plain text fixtures.
- Added wake phrase detection and command extraction.
- Added safe hook routing for inbox markdown, append-only local files, and emitted JSON.
- Added CLI commands: `init`, `ingest`, `scan`, `hooks`, and `doctor`.
- Added fixture-backed tests, smoke script, examples, and safety docs.
