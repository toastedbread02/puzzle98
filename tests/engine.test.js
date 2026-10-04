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
  assert.equal(levels.length, 50);
  assert.deepEqual(levels.map(level => level.id), Array.from({ length: 50 }, (_, index) => index + 1));
  assert.ok(levels.every(level => level.paragraphs.length > 0 && level.hints.length >= 2 && level.solution));
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

test('every authored answer is accepted by its level validator', () => {
  for (const level of levels.filter(item => item.kind === 'answer')) {
    for (const answer of level.answers) assert.equal(isCorrect(level, answer), true, `level ${level.id} should accept ${answer}`);
  }
});

test('progression records completion and advances one level', () => {
  const next = completeLevel(freshProgress(), levels[0], levels.at(-1).id);
  assert.equal(next.current, 2);
  assert.deepEqual(next.completed, [1]);
});

test('the complete fifty-entry run advances sequentially to its ending', () => {
  let state = freshProgress();
  for (const [index, level] of levels.entries()) {
    state = completeLevel(state, level, levels.at(-1).id);
    assert.equal(state.current, Math.min(index + 2, levels.length));
  }
  assert.equal(state.completed.length, 50);
  assert.ok(state.completed.includes(50));
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

test('the later run uses real data, code, inspection, SVG, and waveform artifacts', () => {
  assert.ok(levels.some(level => level.json));
  assert.ok(levels.some(level => level.code));
  assert.ok(levels.some(level => level.inspector));
  assert.ok(levels.some(level => level.vector));
  const waveformTypes = new Set(levels.filter(level => level.waveform).map(level => level.waveform.type));
  assert.deepEqual([...waveformTypes].sort(), ['bits', 'manchester', 'morse', 'runs']);
});

test('waveform frames have valid signal data and complete groups', () => {
  for (const { waveform } of levels.filter(level => level.waveform)) {
    if (waveform.type === 'bits' || waveform.type === 'manchester') {
      const bits = waveform.bits.replace(/\s/g, '');
      assert.match(bits, /^[01]+$/);
      assert.equal(bits.length % waveform.group, 0);
    }
    if (waveform.type === 'runs') assert.ok(waveform.runs.every(run => Number.isInteger(run) && run > 0));
    if (waveform.type === 'morse') assert.match(waveform.code, /^[.-]+( [.-]+)*$/);
  }
  const parityFrames = levels.find(level => level.id === 36).waveform.bits.split(/\s+/);
  assert.ok(parityFrames.every(frame => frame.replaceAll('0', '').length % 2 === 0));
});
