# Security Policy

## Supported versions

`voicehook` is pre-1.0. Security fixes target `main` until tagged releases begin.

## Reporting a vulnerability

Please open a private GitHub security advisory or contact the maintainer with:

- the affected version/commit;
- reproduction steps;
- expected impact;
- any suggested fix.

## Project safety posture

`voicehook` is local-first and privacy-first:

- no hidden telemetry;
- no background daemon install;
- no credential scraping;
- no network calls in core runtime;
- no unrestricted shell execution hook.

The intended failure mode is “capture text for review,” not “perform an irreversible action.” Any future integration that can leave the machine must be explicit, opt-in, documented, and testable with safe defaults.
