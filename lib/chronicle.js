import crypto from 'node:crypto';

/**
 * Checkpoint memory manager and log compressor.
 */
export class Chronicle {
  constructor() {
    this.checkpoints = [];
  }

  /**
   * Creates a secure checkpoint of the current state.
   */
  createCheckpoint(state) {
    const data = JSON.stringify(state);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    
    const checkpoint = {
      timestamp: Date.now(),
      state: data,
      hash
    };
    
    this.checkpoints.push(checkpoint);
    return hash;
  }

  /**
   * Retrieves the last valid checkpoint and verifies its integrity.
   */
  rollback() {
    if (this.checkpoints.length === 0) {
      throw new Error('No checkpoints available for rollback.');
    }

    const checkpoint = this.checkpoints.pop();
    const currentHash = crypto.createHash('sha256').update(checkpoint.state).digest('hex');
    
    if (currentHash !== checkpoint.hash) {
      throw new Error('Integrity violation: Checkpoint hash does not match.');
    }

    return JSON.parse(checkpoint.state);
  }

  /**
   * Compresses session logs by removing redundant lines.
   */
  compressLog(logText) {
    if (!logText) return '';
    const lines = logText.split('\n');
    const result = [];
    let lastLine = null;

    for (const line of lines) {
      const trimmed = line.trim();
      // Skip contiguous duplicates
      if (trimmed === lastLine) continue;
      // Skip typical noise lines
      if (/^(\.\.\.|loading|waiting|processing)/i.test(trimmed)) continue;
      
      result.push(line);
      lastLine = trimmed;
    }

    return result.join('\n');
  }
}
