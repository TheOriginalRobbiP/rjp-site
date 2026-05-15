# Pilot acceptance test — `.theo/` convention on rjp.digital

> Purpose: validate that the per-project memory architecture actually fixes
> "Theo doesn't remember on resume" before rolling out to other projects.

## Prereqs (already done by the pilot install)

- [x] `/mnt/e/rjp.digital/.theo/` exists with STATUS, DECISIONS, LAYOUT, SESSIONS/, README
- [x] `.gitignore` excludes `.theo/SESSIONS/` and `.theo/_inspect.sh`
- [x] `/opt/data/SOUL.md` has the per-project context protocol section
- [x] `/opt/data/SOUL.md` has the session-start checklist
- [x] `/opt/data/projects.yaml` exists with rjp.digital + 4 other projects mapped
- [x] DB-level smoke test confirmed `tags LIKE '%project:rjp.digital%'` works

## Test 1 — Cold start identifies the project

In Discord `#dev` channel under `Project - Rjp.digital`, start a fresh
thread with: **"hey, give me a one-line status of rjp.digital"**.

**Pass criteria:**
- Theo's reply mentions content from `STATUS.md` (e.g. Astro 5.17.1, kraken
  mascot locked, GSC not yet wired) — NOT a guess from his head.
- He does NOT spend turns exploring the repo to figure out what the project
  is. `STATUS.md` should give him the answer in one read.

**Fail signs:**
- Generic "I'd need to look at the repo" reply.
- Hallucinated facts (e.g. "you're using Next.js" when the layout file
  clearly says Astro).
- Tries to read 10 source files before answering.

## Test 2 — Decision logging

In the same thread, ask: **"should we upgrade to Astro 6 now or later?"**

Have a short discussion. Land on a decision (either way).

**Pass criteria:**
- Theo appends a line to `.theo/DECISIONS.md` with date | decision | rationale.
- Theo writes a memory fact tagged `project:rjp.digital, decision`.
- Both happen WITHOUT being explicitly asked. The SOUL rule should fire.

**Fail signs:**
- Decision is made but DECISIONS.md is untouched.
- Memory fact is written but lacks the `project:rjp.digital` tag.

## Test 3 — Resume after a real gap

Wait at least 2 hours. Open a NEW thread in `#dev` (or DM Theo): **"hey, where
were we on rjp.digital?"**

**Pass criteria:**
- Theo reads `.theo/STATUS.md` first, references the most recent
  "## Session checkpoint" block (if one was written), and gives an answer
  grounded in actual prior state.
- He recalls the Astro 6 decision from Test 2 (via DECISIONS.md, semantic
  memory, or both — bonus if from both).

**Fail signs:**
- "We were working on Astro?" with no specifics.
- Doesn't acknowledge any prior session.
- Forgets the upgrade decision entirely.

## Test 4 — Writes only its own files

Edit `.theo/LAYOUT.md` yourself (add a fake gotcha line). In the next
session, ask Theo something that would touch the layout (e.g. "what's our
build command?").

**Pass criteria:**
- Theo's answer reflects YOUR edit to LAYOUT.md.
- Theo does NOT silently overwrite or "correct" your edit.

**Fail signs:**
- Theo rewrites LAYOUT.md without asking.
- Theo's answer ignores your edit and pulls from his own pretrained guess.

## Test 5 — Cross-project isolation

Start a brand new conversation about a DIFFERENT project (e.g. cryptoclub).
Ask something rjp.digital-shaped: **"what's our brand mascot?"**

**Pass criteria:**
- Theo identifies the project as cryptoclub (not rjp.digital), via
  channel id resolution or by asking.
- He does NOT confuse the kraken mascot with anything cryptoclub.
- If his memory recall returns rjp facts, he filters them out by project tag.

**Fail signs:**
- Tells you the cryptoclub mascot is a kraken (it isn't).
- Wrong STATUS.md gets read.
- A new memory fact gets tagged `project:rjp.digital` from inside a
  cryptoclub conversation.

## What to do with the results

- **All 5 pass:** roll out by creating `.theo/` skeletons in `cryptoclub`,
  `ebl`, `supercleanup`, etc. Add their channels to `projects.yaml`.
- **1-2 fail:** identify which link in the chain (read? write? tag?)
  broke and fix that specifically. Don't generalise the fix until the
  pilot is solid.
- **3+ fail:** the SOUL.md rules aren't being followed. May need to make
  them more prominent (move higher in SOUL.md, shorten, or convert to
  a hard tool-use enforcement somewhere).

## Quick rollback if needed

If anything goes sideways and you want to revert SOUL.md to pre-pilot:

```bash
wsl -d Ubuntu -- bash -lc "docker exec hermes cp /tmp/SOUL.md.bak /opt/data/SOUL.md"
```

(That backup will only survive until the container is recreated, so if
you wait too long it'll be gone — copy it to `/opt/data/SOUL.md.bak`
inside the persistent volume if you want it durable.)

To completely undo the pilot:
1. Delete `E:\rjp.digital\.theo\` on host.
2. Delete `/opt/data/projects.yaml` in container.
3. Remove the two appended sections from `/opt/data/SOUL.md`
   (everything after the original final `Don't fight `apt`` paragraph).
