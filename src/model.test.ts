import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { completeDemoOnboarding, completeMission, demoReflection, initial, level, recordVisit, startMission } from './model.ts';
test('mission XP is only awarded once and daily streak advances once', () => {
  const done = completeMission(initial, 'campaign', 100);
  assert.equal(completeMission(done, 'campaign', 100).xp, 100);
  assert.equal(level(500), 3);
  const day1 = recordVisit(initial, '2026-10-01');
  const day2 = recordVisit(day1, '2026-10-02');
  assert.equal(recordVisit(day2, '2026-10-02').streak, 2);
});
test('one onboarding answer seeds a Marketing demo for all three starts', () => {
  for (const start of ['dream', 'ideas', 'none'] as const) {
    const profile = completeDemoOnboarding({ ...initial, start, dream: 'technology', answers: [['Creating'], ...initial.answers.slice(1)] });
    assert.equal(profile.start, start);
    assert.equal(profile.dream, 'marketing');
    assert.deepEqual(profile.answers[0], ['Creating']);
    assert.equal(profile.answers.length, 10);
    assert.ok(profile.answers.every(answer => answer.length > 0));
    assert.deepEqual(profile.answers[9], ['Create a campaign']);
  }
});
test('demo reflections fill every mission and empty saved drafts while preserving student edits', () => {
  for (const id of ['campaign', 'product', 'dataset', 'business', 'website', 'lesson', 'event', 'prototype']) {
    const template = demoReflection(initial, id);
    assert.equal(template.mission, id);
    assert.equal(template.feeling, 'Liked it');
    assert.ok(template.enjoyed.trim());
    assert.ok(template.challenge.trim());
    const empty = demoReflection({ ...initial, reflectionDraft: { ...template, enjoyed: '', challenge: ' ' } }, id);
    assert.equal(empty.enjoyed, template.enjoyed);
    assert.equal(empty.challenge, template.challenge);
    const edited = { ...template, enjoyed: 'My own experience', challenge: 'My own challenge', feeling: 'Not for me', again: 'No, Explore Again' };
    assert.deepEqual(demoReflection({ ...initial, reflectionDraft: edited }, id), edited);
    assert.deepEqual(demoReflection({ ...initial, reflections: [edited] }, id), edited);
  }
});
test('mission preview does not create progress; start and resume share the same checklist', () => {
  assert.equal(initial.activeMission, undefined);
  const active = startMission(initial, 'campaign');
  assert.equal(active.activeMission, 'campaign');
  assert.deepEqual(active.steps.campaign, [0, 1]);
  const changed = { ...active, steps: { campaign: [0, 1, 2] } };
  const resumed = startMission(changed, 'campaign');
  assert.deepEqual(resumed.steps.campaign, [0, 1, 2]);
  assert.equal(resumed.xp, 0);
  const other = startMission(resumed, 'product');
  assert.deepEqual(other.steps.product, []);
  assert.deepEqual(other.steps.campaign, [0, 1, 2]);
});
