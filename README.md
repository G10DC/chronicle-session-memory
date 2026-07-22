# chronicle

Trajectory compression and checkpoint memory manager. Chronicle provides secure, state-integrity checked checkpoints and logic for compressing conversational/execution logs to keep LLM context sizes minimal.

## Features
- **Integrity-Checked Checkpoints**: Hashes current session states (SHA-256) to ensure rollback states are not modified or corrupted.
- **Rollback System**: Restores the agent's memory or workspace state back to a previous checkpoint.
- **Log Compression**: Filters duplicate lines, command noises (`processing`, `loading`), and builds clean logs.

## Installation

```bash
npm install
```

## Usage

```javascript
import { Chronicle } from './lib/chronicle.js';

const chron = new Chronicle();

// 1. Checkpoint Current State
const state = { step: 'analysis', filesEdited: ['lib/index.js'] };
const hash = chron.createCheckpoint(state);
console.log(`Saved checkpoint: ${hash}`);

// 2. Perform actions and change state
// ...

// 3. Rollback (Restores the saved state and verifies its hash)
try {
  const previousState = chron.rollback();
  console.log('Rollback successful:', previousState);
} catch (error) {
  console.error('Integrity error:', error.message);
}

// 4. Compress Logs
const heavyLog = `
  loading database...
  node index.js
  node index.js
  processing input...
  processing input...
  done!
`;
const cleanLog = chron.compressLog(heavyLog);
console.log(cleanLog);
/*
  node index.js
  done!
*/
```

## API Reference

### `chron.createCheckpoint(state)`
Saves the object state as a JSON string, generates a SHA-256 checksum, and stores it in the checkpoint queue. Returns the hash string.

### `chron.rollback()`
Pops the latest checkpoint, recalculates its SHA-256 hash, and compares it to the original. If they match, returns the parsed state object. Throws an error on integrity mismatch or empty queue.

### `chron.compressLog(logText)`
Trims trailing/leading whitespace, filters contiguous duplicate lines, and removes generic loader/spinner lines. Returns clean log text.

## Running Tests

```bash
npm test
```

## License

MIT
