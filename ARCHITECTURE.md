# Chronicle — Architecture

## Component Design

```
                     ┌──────────────────┐
                     │   State Object   │
                     └────────┬─────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────┐
│                   Chronicle Core                       │
│                                                        │
│  ┌────────────────────┐      ┌──────────────────────┐  │
│  │ Checkpoint Manager │      │    Log Compressor    │  │
│  │ - SHA-256 Hashing  │      │ - Duplication Prune  │  │
│  │ - Rollback Queue   │      │ - Noise Filter       │  │
│  └────────────────────┘      └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```
- **Security Check**: Hashing the serialised state prevents tampered restore points.
- **Log Processing**: Uses a single-pass filter to clean up contiguous lines and framework log prefixes.
