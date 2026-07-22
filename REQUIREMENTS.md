# Chronicle — Requirements

## Functional
- Serialize and deserialize arbitrary JSON-serializable states.
- Compute SHA-256 integrity checksums for checkpoints.
- Prune redundant log sequences (like repeat lines and terminal output noise).

## Non-Functional
- Hashing and storage overhead < 5ms.
- Compress logs in a single pass ($O(N)$ complexity).
- Zero external package dependencies.
