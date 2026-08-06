# Chronicle Checkpoint Memory Cryptographic Honesty Layer

The honesty layer is the operational expression of the **G10DC Trellis Standard**: **the processing engine reasons over verified evidence with stated confidence, never hallucinates capabilities or impact.**

## Domain & Scope
**Domain**: Session State Checkpoints & Hashing

## Core Epistemic Rules

1. **State Integrity: Every checkpoint is SHA-256 hash-chained to guarantee tamper-evident history.**
2. **Semantic Retention: Compression prunes transient turns while freezing architecturally binding decisions.**
3. **Confidence Rating: High (hash-verified state chain), Medium (unhashed snapshot), Low (partial turn log).**

## Three-Tier Confidence Model

- **High Confidence**: Full AST/schema validation passing, deterministic evidence available, verified state.
- **Medium Confidence**: Heuristic analysis or partial indexing; requires agent verification step.
- **Low Confidence**: Inferred or unindexed target; candidate output ONLY, never auto-committed.

## Epistemic Invariant

> Absence of evidence is not evidence of absence. Output is presented as a structured candidate set with confidence scores so caveats cannot be silently dropped downstream.
