import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { completeMission, initial, level, recordVisit } from './model.ts';
test('mission XP is only awarded once and daily streak advances once', () => {
  const done = completeMission(initial, 'campaign', 100);
  assert.equal(completeMission(done, 'campaign', 100).xp, 100);
  assert.equal(level(500), 3);
  const day1 = recordVisit(initial, '2026-10-01');
  const day2 = recordVisit(day1, '2026-10-02');
  assert.equal(recordVisit(day2, '2026-10-02').streak, 2);
});
