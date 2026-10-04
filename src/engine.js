export const STORAGE_KEY = 'the-margin-progress-v1';

export function normalizeAnswer(value) {
  return String(value ?? '').trim().normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ');
}

export function isCorrect(level, value) {
  if (level.kind !== 'answer') return false;
  const submitted = normalizeAnswer(value);
  return submitted.length > 0 && level.answers.some(answer => normalizeAnswer(answer) === submitted);
}

export function freshProgress() {
  return { current: 1, completed: [], hints: {}, attempts: 0 };
}

export function loadProgress(storage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!saved || !Number.isInteger(saved.current) || !Array.isArray(saved.completed) || typeof saved.hints !== 'object') return freshProgress();
    return { current: Math.max(1, saved.current), completed: [...new Set(saved.completed.filter(Number.isInteger))], hints: saved.hints || {}, attempts: Number.isInteger(saved.attempts) ? saved.attempts : 0 };
  } catch { return freshProgress(); }
}

export function saveProgress(storage, progress) {
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function revealNextHint(progress, level) {
  const count = Math.min(level.hints.length, (progress.hints[level.id] || 0) + 1);
  return { ...progress, hints: { ...progress.hints, [level.id]: count } };
}

export function completeLevel(progress, level, lastLevelId) {
  const completed = [...new Set([...progress.completed, level.id])];
  return { ...progress, completed, current: Math.min(level.id + 1, lastLevelId) };
}
