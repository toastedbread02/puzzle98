import { levels, validateLevels } from './levels.js';
import { completeLevel, freshProgress, isCorrect, loadProgress, revealNextHint, saveProgress } from './engine.js';

const byId = id => document.getElementById(id);
const ui = {
  kicker: byId('level-kicker'), difficulty: byId('difficulty'), fill: byId('progress-fill'), title: byId('level-title'),
  copy: byId('puzzle-copy'), slot: byId('interaction-slot'), form: byId('answer-form'), input: byId('answer-input'),
  feedback: byId('feedback'), hint: byId('hint-button'), reset: byId('reset-button'), hintPanel: byId('hint-panel'), debug: byId('debug-panel')
};
const problems = validateLevels(levels);
if (problems.length) throw new Error(`Invalid puzzle data: ${problems.join(' ')}`);
let progress = loadProgress(localStorage);
const dev = window.__PUZZLE_DEV__ === true;

function levelFromAddress() {
  const requested = Number(new URLSearchParams(location.search).get('level'));
  const accessible = progress.completed;
  const level = levels.find(item => item.id === requested);
  if (level && (level.id === 1 || accessible.includes(level.id - 1) || dev)) return level;
  return levels.find(item => item.id === progress.current) || levels[0];
}
let active = levelFromAddress();

function setAddress(level) {
  const params = new URLSearchParams({ level: String(level.id), ...(level.query || {}) });
  history.replaceState(null, '', `?${params}`);
}

function paragraph(text) { const p = document.createElement('p'); p.textContent = text; return p; }
function render() {
  active = levels.find(item => item.id === active.id) || levels[0];
  setAddress(active);
  if (progress.completed.includes(levels.at(-1).id)) { showComplete(); return; }
  ui.kicker.textContent = `ENTRY ${String(active.id).padStart(2, '0')}`;
  ui.difficulty.textContent = active.difficulty;
  ui.fill.style.setProperty('--progress', `${(active.id / levels.length) * 100}%`);
  document.querySelector('.progress-track').setAttribute('aria-valuenow', String(active.id));
  ui.title.textContent = active.title;
  ui.copy.replaceChildren();
  active.paragraphs?.forEach(text => ui.copy.append(paragraph(text)));
  if (active.poem) { const poem = document.createElement('p'); poem.className = 'poem'; poem.textContent = active.poem; ui.copy.append(poem); }
  if (active.sequence) { const sequence = document.createElement('span'); sequence.className = 'sequence'; sequence.textContent = active.sequence; ui.copy.append(sequence); }
  if (active.word) { const word = document.createElement('p'); word.className = 'code-line'; word.textContent = active.word; ui.copy.append(word); }
  if (active.code) { const code = document.createElement('p'); code.className = 'code-line'; code.textContent = active.code; ui.copy.append(code); }
  if (active.visual === 'reverse') {
    const figure = document.createElement('figure'); figure.className = 'seal';
    figure.innerHTML = '<svg viewBox="0 0 54 54" role="img" aria-labelledby="seal-title" width="54" height="54"><title id="seal-title">Reverse the letters.</title><circle cx="27" cy="27" r="19" fill="none" stroke="#bbc68a" stroke-width="1" stroke-dasharray="72 48" transform="rotate(-42 27 27)"/><path d="M17 28h20m-7-7 7 7-7 7" fill="none" stroke="#bbc68a" stroke-width="1.2"/></svg><figcaption>the mark</figcaption>';
    ui.copy.append(figure);
  }
  if (active.sentence) { const sentence = paragraph(active.sentence); sentence.style.marginTop = '18px'; ui.copy.append(sentence); }
  ui.slot.replaceChildren();
  const clickLevel = active.kind === 'click';
  ui.form.hidden = clickLevel;
  if (clickLevel) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'special-button'; button.textContent = '.'; button.setAttribute('aria-label', active.buttonLabel);
    button.addEventListener('click', () => succeed()); ui.slot.append(button);
  }
  ui.input.value = '';
  ui.feedback.textContent = ''; ui.feedback.classList.remove('error');
  renderHints();
  if (dev) renderDebug();
}

function renderHints() {
  const count = progress.hints[active.id] || 0;
  ui.hintPanel.replaceChildren();
  ui.hint.hidden = false;
  ui.hint.disabled = count >= active.hints.length;
  ui.hint.textContent = active.hints.length === 0 ? 'No hints for this entry' : count >= active.hints.length ? 'All nudges revealed' : count ? 'Reveal another nudge' : 'Need a nudge?';
  if (count) {
    for (const hint of active.hints.slice(0, count)) { const p = document.createElement('p'); p.textContent = hint; ui.hintPanel.append(p); }
    ui.hintPanel.hidden = false;
  } else ui.hintPanel.hidden = true;
}

function succeed() {
  progress = completeLevel(progress, active, levels.at(-1).id);
  saveProgress(localStorage, progress);
  ui.feedback.classList.remove('error');
  if (active.id === levels.at(-1).id) {
    showComplete();
    return;
  }
  ui.feedback.textContent = ['That is it.', 'The edge was there all along.', 'A useful rule to keep.'][active.id % 3];
  window.setTimeout(() => { active = levels.find(level => level.id === active.id + 1); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 700);
}

function showComplete() {
  ui.kicker.textContent = `ENTRY ${String(levels.length).padStart(2, '0')} · COMPLETE`;
  ui.difficulty.textContent = 'The page was the final instrument';
  ui.fill.style.setProperty('--progress', '100%');
  document.querySelector('.progress-track').setAttribute('aria-valuenow', String(levels.length));
  ui.title.textContent = 'You found the margin.';
  ui.copy.replaceChildren(paragraph('The address gave you two operations. The line edges carried the answer. Every surface of the page had been available from the beginning.'));
  ui.slot.innerHTML = '<div class="complete-mark" aria-hidden="true">✓</div>';
  ui.form.hidden = true;
  ui.feedback.textContent = 'Run complete.';
  ui.hint.hidden = true;
  ui.reset.hidden = false;
}

ui.form.addEventListener('submit', event => {
  event.preventDefault();
  progress = { ...progress, attempts: progress.attempts + 1 };
  if (isCorrect(active, ui.input.value)) { succeed(); return; }
  const responses = active.wrong || ['Not quite.'];
  ui.feedback.textContent = responses[Math.floor(Math.random() * responses.length)];
  ui.feedback.classList.add('error');
  ui.input.select();
  saveProgress(localStorage, progress);
});

ui.hint.addEventListener('click', () => {
  if (ui.hint.disabled) return;
  progress = revealNextHint(progress, active); saveProgress(localStorage, progress); renderHints();
});

ui.reset.addEventListener('click', () => {
  if (!window.confirm('Reset all local progress and return to entry 01?')) return;
  progress = freshProgress(); saveProgress(localStorage, progress); active = levels[0]; render();
});

function renderDebug() {
  ui.debug.hidden = false;
  const answer = active.answers?.join(' / ') || 'button interaction';
  ui.debug.replaceChildren();
  const summary = document.createElement('p');
  summary.textContent = `LOCAL DEBUG · ${active.id} · intended answer: ${answer} · clue / solution: ${active.solution}`;
  ui.debug.append(summary);
  const metadata = document.createElement('pre');
  metadata.textContent = JSON.stringify({ kind: active.kind, query: active.query || {}, hints: active.hints, difficulty: active.difficulty }, null, 2);
  ui.debug.append(metadata);
  for (const level of levels) {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = `#${level.id}`;
    button.addEventListener('click', () => { active = level; render(); }); ui.debug.append(button);
  }
  const skip = document.createElement('button'); skip.type = 'button'; skip.textContent = 'skip';
  skip.addEventListener('click', () => succeed()); ui.debug.append(skip);
  const clear = document.createElement('button'); clear.type = 'button'; clear.textContent = 'clear save';
  clear.addEventListener('click', () => { progress = freshProgress(); saveProgress(localStorage, progress); render(); }); ui.debug.append(clear);
}

render();
