# Chronicle — Risks and Mitigations

## Risks
- **Hash Collisions**: Extremely rare with SHA-256; not a risk for memory states.
- **Reference Corruption**: Mutating active state references after checkpointing.
  * *Mitigation*: The state is serialized to JSON string format upon saving, creating a deep copy.
- **Context Loss**: Over-aggressive log compression removing critical error trace.
  * *Mitigation*: The compression rules skip lines containing syntax error keys.
