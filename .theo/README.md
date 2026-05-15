# `.theo/` — per-project context for Theodore

This directory exists so Theodore (the Hermes agent) has a stable, reliable
place to read project state from on every session start, and to write it back
on session end / pre-compression.

## Why this exists

Theodore runs as a long-lived bot across multiple projects, surfaced through
Discord channels, the Hermes dashboard, Open WebUI, and CLI. Sessions are
ephemeral, threads die, conversations get split across channels, and context
window compression silently drops mid-task details.

The pre-`.theo` failure mode: ask Theo "where were we on rjp.digital" two days
later, get a generic answer because the actual state lived in a Discord thread
that's now archived or was compacted out of his context.

The fix: a tiny per-project filesystem state, read FIRST on every session
that touches this project.

## File responsibilities

| File | Owner | Cadence | Purpose |
|---|---|---|---|
| `STATUS.md` | **Theo** | Updated pre-compression and on session-end | Current focus, open tasks, where-we-left-off |
| `DECISIONS.md` | Theo (with human review) | Append-only when a non-trivial decision is made | "We chose X because Y" — the rationale log |
| `LAYOUT.md` | Human | Edited by Robbi when project structure changes | Paths, build commands, deploy targets, gotchas |
| `SESSIONS/<datetime>.md` | Theo | One per session that does substantive work | Detailed turn-by-turn record (verbose, archival) |

`SESSIONS/` is gitignored — it's noise in repo history. The other three
files ARE committed; they're real project documentation.

## How Theo uses these (encoded in SOUL.md)

On the **first turn** of a session whose working directory is under this
project root:
1. Read `STATUS.md` (current state).
2. Read `LAYOUT.md` (where things live).
3. Skim `DECISIONS.md` (recent decisions).
4. Tag every fact written to `semantic_memory` this session with `project:rjp.digital`.

When **compression is about to fire** (~70% context):
1. Append a `## Session checkpoint <ISO datetime>` block to `STATUS.md`
   with current focus + what's next.
2. Write 3–5 anchor facts to `semantic_memory`, tagged with `project:rjp.digital`.

When the **session ends** (user signs off, or auto via cron):
1. Update the `## Current state` snapshot in `STATUS.md`.
2. Move detailed turn-by-turn notes to `SESSIONS/<datetime>.md`.

When a **non-trivial decision** is made (Robbi agrees to a meaningful choice):
1. Append `<date> | <decision> | <rationale>` to `DECISIONS.md`.

## Convention: project slug

This project's slug is **`rjp.digital`**. Used as:
- Directory name: `/mnt/e/rjp.digital/`
- Memory tag: `project:rjp.digital` on every fact
- Discord category: `Project - Rjp.digital`

## For humans

Don't be afraid to edit `STATUS.md` or `DECISIONS.md` directly if Theo gets
something wrong. Theo will read your edits on his next turn. He won't
silently revert them — he treats these files as authoritative.

`LAYOUT.md` is human-owned. Theo may suggest edits but will not write to it
without explicit confirmation.
