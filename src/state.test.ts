import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KEY, initialState, loadState, reducer } from './state.ts';
import { suggestedFields } from './data.ts';

test('different choices change directions; mission reward is given once and reflection survives state updates', () => {
  const explored = reducer(reducer(initialState, { type: 'start', value: 'noidea' }), { type: 'answer', question: 'interests', values: ['Creating', 'Communicating'] });
  assert.equal(suggestedFields(explored)[0].id, 'marketing');
  const building = reducer(initialState, { type: 'answer', question: 'interests', values: ['Building', 'Analyzing'] });
  assert.equal(suggestedFields(building)[0].id, 'technology');
  const dream = reducer(reducer(initialState, { type: 'start', value: 'dream' }), { type: 'dreamField', id: 'design' });
  assert.equal(suggestedFields(dream)[0].id, 'design');
  const done = reducer(explored, { type: 'completeMission', id: 'campaign', xp: 100 });
  assert.equal(reducer(done, { type: 'completeMission', id: 'campaign', xp: 100 }).xp, 100);
  const reflected = reducer(done, { type: 'reflect', reflection: { mission: 'campaign', enjoyment: 'Loved it' } });
  assert.equal(reflected.reflections[0].enjoyment, 'Loved it');
  assert.equal(suggestedFields(reflected)[0].id, 'marketing');
  const disliked = reducer(explored, { type: 'reflect', reflection: { mission: 'campaign', enjoyment: 'Not for me' } });
  assert.notEqual(suggestedFields(disliked)[0].id, 'marketing');
});

test('restores exploration and mission progress after refresh', () => {
  const saved = reducer(reducer(initialState, { type: 'start', value: 'ideas' }), { type: 'missionStep', id: 'campaign', step: 0 });
  const original = globalThis.localStorage;
  globalThis.localStorage = { getItem: key => key === KEY ? JSON.stringify(saved) : null };
  try {
    assert.deepEqual(loadState(), saved);
  } finally {
    globalThis.localStorage = original;
  }
});
