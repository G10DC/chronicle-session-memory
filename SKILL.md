---
name: chronicle
status: implemented
description: >-
  In-memory checkpoint stack: snapshots a JSON-serializable state with a
  SHA-256 hash, and pops the most recent one back on rollback after verifying
  the hash matches. Also a duplicate-line/noise-line log compressor. Lives
  entirely in one process's memory -- nothing is written to disk. Never use
  for in-flight token compression -- use chisel; never expect filesystem
  rollback or keel audit-log integration -- neither exists here.
---

# Chronicle

**In-memory checkpoint stack with hash-verified pop, plus a log-line deduplicator.** Holds a JS array of checkpoints in process memory. Doesn't touch the filesystem or integrate with any other skill.

## What it actually does
`createCheckpoint(state)` hashes and pushes `{ timestamp, state, hash }` onto an in-memory array,
returns the hash. `rollback()` pops the latest, recomputes its hash, throws on mismatch (a
corruption check, not a security boundary), returns the parsed state. `compressLog(logText)` drops
consecutive duplicate lines and a fixed set of noise prefixes (`...`/`loading`/`waiting`/`processing`).

## What it does not do (despite "tamper-evident checkpointing")
- **Nothing persists.** Checkpoints die with the process — this is "get back what you saved
  earlier in this run," not workspace rollback.
- **No `keel` integration.** The hash only detects accidental in-memory corruption, not tampering.
- **No token-aware auto-triggering** — you decide when to checkpoint.
- **`compressLog` is a duplicate/noise filter**, not semantic compression of decisions or constraints.

## Usage (library, not a CLI)

```js
import { Chronicle } from './lib/chronicle.js';

const chronicle = new Chronicle();
const hash = chronicle.createCheckpoint({ step: 'before-refactor', files: [...] });
const restored = chronicle.rollback(); // throws if the in-memory record was corrupted
```

## When to use

- A lightweight, same-process undo stack for one script/session run, with a corruption check on pop.
- A quick duplicate-line/noise filter on log text.

## When NOT to use

- **State surviving past the process, or real filesystem rollback** — nothing here persists.
- **In-flight token compression** → use `chisel`. **Deciding what to load** → use `portage`.
- **Relying on the hash as a security boundary** — it only catches accidental corruption.
