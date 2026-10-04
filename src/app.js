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
  const fragment = level.hash ? `#${level.hash}` : '';
  history.replaceState(null, '', `?${params}${fragment}`);
}

function paragraph(text) { const p = document.createElement('p'); p.textContent = text; return p; }

function appendCode(text, className = 'code-block') {
  const pre = document.createElement('pre'); pre.className = className; pre.textContent = text; ui.copy.append(pre);
}

function appendJson(value) {
  appendCode(JSON.stringify(value, null, 2), 'code-block json-artifact');
}

function appendGrid(rows) {
  const table = document.createElement('table'); table.className = 'letter-grid';
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const value of row) { const td = document.createElement('td'); td.textContent = String(value); tr.append(td); }
    table.append(tr);
  }
  ui.copy.append(table);
}

function appendInspector(specimen) {
  const sample = document.createElement('div'); sample.className = 'inspect-sample';
  for (const [name, value] of Object.entries(specimen.attributes || {})) sample.setAttribute(`data-${name}`, String(value));
  const label = document.createElement('span'); label.textContent = specimen.text; sample.append(label);
  if (specimen.comment) sample.append(document.createComment(specimen.comment));
  ui.copy.append(sample);
}

function appendTiles(tiles, direction = 'row') {
  const row = document.createElement('div'); row.className = 'tile-row';
  row.style.flexDirection = direction;
  for (const tile of tiles) {
    const item = document.createElement('span'); item.className = 'order-tile';
    if (tile.order !== undefined) item.style.order = String(tile.order);
    if (tile.read) item.dataset.read = tile.read;
    item.textContent = tile.text; row.append(item);
  }
  ui.copy.append(row);
}

function appendVector(vector) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 112 88'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Connected labeled points in a line'); svg.classList.add('vector-artifact');
  const points = vector.points;
  const path = document.createElementNS(ns, 'polyline');
  path.setAttribute('points', vector.path.map(index => `${points[index].x},${points[index].y}`).join(' '));
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', '#a00000'); path.setAttribute('stroke-width', '1.5'); path.setAttribute('marker-end', 'url(#vector-arrow)');
  const defs = document.createElementNS(ns, 'defs');
  const marker = document.createElementNS(ns, 'marker'); marker.setAttribute('id', 'vector-arrow'); marker.setAttribute('markerWidth', '6'); marker.setAttribute('markerHeight', '6'); marker.setAttribute('refX', '5'); marker.setAttribute('refY', '3'); marker.setAttribute('orient', 'auto');
  const arrow = document.createElementNS(ns, 'path'); arrow.setAttribute('d', 'M0,0 L6,3 L0,6 Z'); arrow.setAttribute('fill', '#a00000'); marker.append(arrow); defs.append(marker); svg.append(defs);
  svg.append(path);
  points.forEach((point, index) => {
    const circle = document.createElementNS(ns, 'circle'); circle.setAttribute('cx', point.x); circle.setAttribute('cy', point.y); circle.setAttribute('r', '9'); circle.setAttribute('fill', '#ffff8a'); circle.setAttribute('stroke', '#000080'); svg.append(circle);
    const label = document.createElementNS(ns, 'text'); label.setAttribute('x', point.x); label.setAttribute('y', point.y + 3); label.setAttribute('text-anchor', 'middle'); label.textContent = point.ch; svg.append(label);
    const number = document.createElementNS(ns, 'text'); number.setAttribute('x', point.x); number.setAttribute('y', point.y + 17); number.setAttribute('text-anchor', 'middle'); number.setAttribute('class', 'point-number'); number.textContent = point.n || String(index + 1); svg.append(number);
    circle.setAttribute('aria-label', `Point ${point.n || index + 1}: ${point.ch}`);
  });
  ui.copy.append(svg);
}

function appendWaveform(waveform) {
  const unit = 16, top = 20, bottom = 65, left = 24;
  let runs = [];
  let groupSize = waveform.group || 1;
  if (waveform.type === 'bits' || waveform.type === 'manchester') {
    let bits = waveform.bits.replace(/\s/g, '');
    if (waveform.type === 'manchester') bits = [...bits].map(bit => bit === '0' ? '01' : '10').join('');
    runs = [...bits].map(bit => ({ state: bit === '1' ? 1 : 0, duration: 1 }));
    if (waveform.type === 'manchester') groupSize *= 2;
  } else if (waveform.type === 'runs') {
    for (const [index, duration] of waveform.runs.entries()) runs.push({ state: 1, duration }, ...(index < waveform.runs.length - 1 ? [{ state: 0, duration: 1 }] : []));
    groupSize = 1;
  } else if (waveform.type === 'morse') {
    const letters = waveform.code.trim().split(/\s+/);
    for (const [li, letter] of letters.entries()) {
      [...letter].forEach((mark, mi) => runs.push({ state: 1, duration: mark === '-' ? 3 : 1 }, ...(mi < letter.length - 1 ? [{ state: 0, duration: 1 }] : [])));
      if (li < letters.length - 1) runs.push({ state: 0, duration: 3 });
    }
    groupSize = 1;
  }
  const total = runs.reduce((sum, run) => sum + run.duration, 0);
  const width = left + total * unit + 12;
  const ns = 'http://www.w3.org/2000/svg';
  const figure = document.createElement('figure'); figure.className = 'waveform-frame';
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', `0 0 ${width} 88`); svg.setAttribute('width', String(width)); svg.setAttribute('height', '88'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', waveform.caption || 'Signal waveform'); svg.classList.add('waveform-svg');
  const baseline = document.createElementNS(ns, 'line'); baseline.setAttribute('x1', left); baseline.setAttribute('x2', width - 8); baseline.setAttribute('y1', bottom); baseline.setAttribute('y2', bottom); baseline.setAttribute('stroke', '#555'); baseline.setAttribute('stroke-width', '1'); svg.append(baseline);
  for (let i = 0; i <= total; i++) {
    const tick = document.createElementNS(ns, 'line'); const x = left + i * unit;
    tick.setAttribute('x1', x); tick.setAttribute('x2', x); tick.setAttribute('y1', '12'); tick.setAttribute('y2', '72');
    const major = waveform.type === 'bits' || waveform.type === 'manchester' ? i % groupSize === 0 : false;
    tick.setAttribute('stroke', major ? '#777' : '#cccccc'); tick.setAttribute('stroke-width', major ? '1.3' : '.6');
    if (major && i !== total) tick.setAttribute('stroke-dasharray', '2 2');
    svg.append(tick);
  }
  const high = document.createElementNS(ns, 'text'); high.setAttribute('x', '2'); high.setAttribute('y', String(top + 3)); high.textContent = '1'; svg.append(high);
  const low = document.createElementNS(ns, 'text'); low.setAttribute('x', '2'); low.setAttribute('y', String(bottom + 3)); low.textContent = '0'; svg.append(low);
  let x = left, y = bottom, d = `M ${x} ${y}`;
  for (const run of runs) {
    const nextY = run.state ? top : bottom;
    if (nextY !== y) d += ` L ${x} ${nextY}`;
    x += run.duration * unit;
    d += ` L ${x} ${nextY}`;
    y = nextY;
  }
  const signal = document.createElementNS(ns, 'path'); signal.setAttribute('d', d); signal.setAttribute('fill', 'none'); signal.setAttribute('stroke', '#a00000'); signal.setAttribute('stroke-width', '2.2'); signal.setAttribute('stroke-linejoin', 'miter'); svg.append(signal);
  figure.append(svg);
  const caption = document.createElement('figcaption'); caption.textContent = waveform.caption || 'Signal trace'; figure.append(caption);
  ui.copy.append(figure);
}

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
  if (active.code) appendCode(active.code);
  if (active.json !== undefined) appendJson(active.json);
  if (active.grid) appendGrid(active.grid);
  if (active.inspector) appendInspector(active.inspector);
  if (active.tiles) appendTiles(active.tiles, active.tileDirection || 'row');
  if (active.vector) appendVector(active.vector);
  if (active.waveform) appendWaveform(active.waveform);
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
  ui.title.textContent = 'The page was the answer.';
  ui.copy.replaceChildren(paragraph('Fifty entries, one growing tool kit: questions became records, records became code, and code resolved into this chain. You followed the links in the data, then used the address for the final operation. The evidence was in the document all along.'));
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
