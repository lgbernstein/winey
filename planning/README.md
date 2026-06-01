# Winey Planning Workflow

This folder is the handoff layer between planning and implementation.

## Files

- `Winey_PBs.xlsx` - push blocks. Planning writes numbered PBs here: `pb-1`, `pb-2`, etc.
- `Winey_Tracker_Tasks.xlsx` - implementation tracker, deployed PB log, parking lot, and quick context.

## Workflow

1. Planning discusses the app with Larry and writes the next buildable PB in `Winey_PBs.xlsx`.
2. Codex reads the next PB marked `Ready`.
3. Codex implements the PB, tests it, and deploys or commits when requested.
4. Codex updates `Winey_Tracker_Tasks.xlsx` with what actually happened.
5. Codex reports the PB number, purpose, files changed, test/deploy result, commit hash if committed, and the last five completed PBs.

Do not mark a PB as done until the implementation, verification, and deployment/commit status are known.
