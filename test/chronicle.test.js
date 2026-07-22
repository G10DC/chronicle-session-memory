import test from 'node:test';
import assert from 'node:assert';
import { Chronicle } from '../lib/chronicle.js';

test('Chronicle saves and rolls back state', () => {
  const chron = new Chronicle();
  const state = { step: 1, files: ['a.js'] };

  const hash = chron.createCheckpoint(state);
  assert.ok(hash);

  const restored = chron.rollback();
  assert.deepStrictEqual(restored, state);
});

test('Chronicle detects integrity corruption', () => {
  const chron = new Chronicle();
  const state = { step: 1 };
  
  chron.createCheckpoint(state);
  
  // Corrupt the checkpoint state manually
  chron.checkpoints[0].state = JSON.stringify({ step: 2 });

  assert.throws(
    () => chron.rollback(),
    /Integrity violation/
  );
});

test('Chronicle compresses logs correctly', () => {
  const chron = new Chronicle();
  const log = `
    processing...
    npm test
    npm test
    loading...
    done
  `;
  const expected = `
    npm test
    done
  `;

  const compressed = chron.compressLog(log);
  assert.strictEqual(compressed.replace(/\s+/g, ''), expected.replace(/\s+/g, ''));
});
