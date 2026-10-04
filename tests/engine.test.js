import test from 'node:test';
import assert from 'node:assert/strict';
import { levels, validateLevels } from '../src/levels.js';
import { completeLevel, freshProgress, isCorrect, loadProgress, normalizeAnswer, revealNextHint, saveProgress, STORAGE_KEY } from '../src/engine.js';

function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}

test('all authored levels load with valid, consecutive metadata', () => {
  assert.deepEqual(validateLevels(levels), []);
  assert.equal(levels.length, 10);
});

test('malformed puzzle data is reported', () => {
  assert.ok(validateLevels([{ id: 1, title: '', kind: 'answer', answers: [], hints: [] }]).length > 0);
});

test('answer validation trims, normalizes case and spacing', () => {
  assert.equal(normalizeAnswer('  The   PAGE '), 'the page');
  assert.equal(isCorrect(levels[0], ' WHAT '), true);
  assert.equal(isCorrect(levels[0], 'where'), false);
  assert.equal(isCorrect(levels[8], 'period'), false);
});

test('progression records completion and advances one level', () => {
  const next = completeLevel(freshProgress(), levels[0], levels.at(-1).id);
  assert.equal(next.current, 2);
  assert.deepEqual(next.completed, [1]);
});

test('progress and hint counts persist; malformed saves reset cleanly', () => {
  const storage = memoryStorage();
  let state = revealNextHint(freshProgress(), levels[0]);
  state = completeLevel(state, levels[0], levels.at(-1).id);
  saveProgress(storage, state);
  assert.equal(loadProgress(storage).hints[1], 1);
  assert.equal(loadProgress(storage).current, 2);
  storage.setItem(STORAGE_KEY, '{bad json');
  assert.equal(loadProgress(storage).current, 1);
});

test('hint use is capped at the number of available hints', () => {
  let state = freshProgress();
  state = revealNextHint(state, levels[0]);
  state = revealNextHint(state, levels[0]);
  assert.equal(state.hints[1], levels[0].hints.length);
});

test('all referenced visual content is self-contained and needs no missing asset', () => {
  assert.equal(levels.filter(level => level.visual).every(level => level.visual === 'reverse'), true);
  assert.equal(levels.some(level => level.image || level.audio), false);
});
