# voicehook

Status: in-progress

## Scorecard

Total: 74/100
Band: promising
Last scored: 2026-04-29
Scored by: Neo

| Criterion | Points | Notes |
|---|---:|---|
| Problem pain | 15/20 | Useful pain, but scope/daily frequency needs more evidence. |
| Demand signal | 14/20 | Some signal, but needs more external validation. |
| V1 buildability | 14/20 | Feasible, but platform/integration risk remains. |
| Differentiation | 12/15 | Clear wedge versus adjacent tools. |
| Agentic workflow leverage | 13/15 | Indirectly useful for agent workflows. |
| Distribution potential | 6/10 | Has demo/content potential. |

## Pitch

A local voice-command bridge for agent teams: wake word, transcript, command routing, and safe hooks into OpenClaw/CrewCmd.

## Why It Matters

Voice is useful when Roger is mobile or context-switching. It is more app-like and demo-friendly than another CLI, but has hardware/privacy complexity.

## Qualification

Brabble validates local voice hook interest. Internal demand is plausible because Roger uses Slack/OpenClaw and wants low-friction capture, but V1 risk is higher due audio stack complexity.

Source / adjacent research: Inspired by steipete/brabble, local-only voice daemon with 136 stars / 20 forks checked 2026-04-29.

Decision: promising

## V1 Scope

- Local microphone capture
- Wake phrase and transcript logs
- Configurable safe command hooks
- CrewCmd/OpenClaw inbox capture

## Out of Scope

- Cloud always-on assistant
- Sending commands externally by default
- Unrestricted shell execution

## Verification

- Unit or fixture tests for core parsing/generation behavior.
- README with install, quickstart, and safety notes.
- Local-first behavior documented clearly.
- No hidden network, credential, or publish behavior.

## Agent Prompt

Build `voicehook` as local-only, opt-in, privacy-first voice capture that routes text into a safe inbox by default.
