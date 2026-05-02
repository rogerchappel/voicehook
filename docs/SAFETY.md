# Safety model

`voicehook` is intentionally boring where it matters:

- Input is a local transcript file in the MVP.
- Wake phrases gate the default hook.
- Hook actions are limited to inbox markdown, append-only local files, or emitted JSON.
- There is no unrestricted shell execution action.
- There is no hidden telemetry, credential discovery, daemon install, or network call.
- JSON output is for agents and automation to inspect before doing anything else.

If a future hook can touch the network or run a command, it should live outside core, be opt-in, name its risk in config, and require tests that prove safe defaults remain safe.
