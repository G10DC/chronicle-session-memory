# AGENT.md — Chronicle Trajectory Rules

Rules for trajectory compression and rollback checkpoint creation.

## Execution
- Create a checkpoint before executing complex refactors or structural codebase updates.
- Compress logs when chat/terminal outputs grow large to preserve the model's context window.

## Integrity Warnings
- If rollback fails with an integrity mismatch error, check if local workspace files have been modified outside of the transaction queue.
