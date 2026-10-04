// Player-facing puzzle text and accepted answers live together so new entries stay easy to author.
// `solution` is for the local developer panel only; it is never rendered in the ordinary game.
export const levels = [
  {
    id: 1, title: 'A direct question', difficulty: 'A small beginning', kind: 'answer',
    paragraphs: ['What is the answer to this question?'],
    answers: ['what'], hints: ['Read the sentence as a question about itself.', 'The answer is one of the words already on the page.'],
    wrong: ['You answered the question you expected.', 'Try taking the wording at face value.'],
    solution: 'The sentence literally asks what its answer is. “What” is the answer.'
  },
  {
    id: 2, title: 'A direction, in plain sight', difficulty: 'Notice the frame', kind: 'answer',
    query: { direction: 'right' }, paragraphs: ['The page says nothing about which way to go.', 'The address does. What direction does it give you?'],
    answers: ['right'], hints: ['Look at the address bar, not just the page.', 'There is a named value after the question mark.'],
    wrong: ['The page is quiet. Look one line higher in the browser.'],
    solution: 'The URL carries direction=right. The address is part of the puzzle surface.'
  },
  {
    id: 3, title: 'The left edge', difficulty: 'Read a little closer', kind: 'answer',
    paragraphs: ['A note has been set flush to the left. Its edge is unusually tidy.'],
    poem: 'Many small things go unnoticed.\nA line begins before it ends.\nRead the quiet edge first.\nGiven enough lines, a border speaks.\nIf you keep your place,\nNothing here needs moving.',
    answers: ['margin'], hints: ['The note has six lines for a reason.', 'Read the leftmost letter of each line.'],
    wrong: ['You may have read across each line. Try reading down an edge.'],
    solution: 'The first letters of the six lines spell MARGIN.'
  },
  {
    id: 4, title: 'One more each time', difficulty: 'Find the rule', kind: 'answer',
    paragraphs: ['The gaps are not equal, but they are not arbitrary either.'],
    sequence: '1   2   4   7   11   ?',
    answers: ['16', 'sixteen'], hints: ['Compare the gaps between neighbors.', 'The gap grows by one each time.'],
    wrong: ['A sequence needs a rule that explains every step.'],
    solution: 'The steps are +1, +2, +3, +4, so the next is +5: 16.'
  },
  {
    id: 5, title: 'A label for the mark', difficulty: 'Read around the image', kind: 'answer',
    paragraphs: ['The small mark has a label. The label tells you how to read the word below.'],
    visual: 'reverse', word: 'REWARD', answers: ['drawer'],
    hints: ['Inspect the mark’s accessible name or its SVG title.', 'Apply that instruction to REWARD.'],
    wrong: ['You found the word. Now use the mark’s instruction.'],
    solution: 'The SVG title says “Reverse the letters.” REWARD backwards is DRAWER.'
  },
  {
    id: 6, title: 'The same operation', difficulty: 'Remember the mark', kind: 'answer',
    paragraphs: ['The instruction has not changed.'], word: 'STRESSED',
    answers: ['desserts'], hints: ['Level 5 gave you an operation, not a one-time answer.', 'Read STRESSED from the other end.'],
    wrong: ['The old mark still knows what to do.'],
    solution: 'Reuse level 5’s reversal rule: STRESSED backwards is DESSERTS.'
  },
  {
    id: 7, title: 'The other edge', difficulty: 'Combine two old ideas', kind: 'answer',
    query: { edge: 'last' }, paragraphs: ['Your address names an edge. Level 3 showed how an edge can be read. Use both.'],
    poem: 'Rain rings the old metal.\nA clear pane looks blue.\nSome clues return again.\nLook beyond the glass.',
    answers: ['lens'], hints: ['The address says edge=last.', 'Take the final letter of each line, top to bottom.'],
    wrong: ['The first letters worked once. This address points elsewhere.'],
    solution: 'The last letters spell L E N S, following edge=last in the URL.'
  },
  {
    id: 8, title: 'Eight switches', difficulty: 'A machine’s alphabet', kind: 'answer',
    paragraphs: ['A machine writes letters with eight switches. Each switch is either off (0) or on (1). Read each group as one letter.'],
    code: '01001000 01000101 01001100 01010000', answers: ['help'],
    hints: ['Eight binary digits make one byte.', 'Translate the four bytes as text, in order.'],
    wrong: ['Keep the groups intact. Each one stands for a letter.'],
    solution: 'The four 8-bit binary ASCII values spell HELP.'
  },
  {
    id: 9, title: 'No word needed', difficulty: 'Change how you answer', kind: 'click',
    paragraphs: ['Do not type anything. Click the punctuation mark that completes this sentence:'],
    sentence: 'A sentence ends here', buttonLabel: 'Full stop',
    hints: ['The answer is an action, not a word.', 'Choose the mark used to end this sentence.'],
    solution: 'The period is the requested answer, selected as an interaction.'
  },
  {
    id: 10, title: 'The last surface', difficulty: 'Use what the page taught you', kind: 'answer',
    query: { edge: 'left', order: 'reverse' },
    paragraphs: ['Two choices are written in the address. One tells you where to read each line; the other tells you what to do with the results.'],
    poem: 'Everything useful begins somewhere.\nGlass keeps an edge.\nAnswers leave traces.\nPatterns can point backward.\nEach level left a rule.\nHere, the frame is part of the text.\nTake nothing on faith.',
    answers: ['the page', 'thepage'],
    hints: ['The address gives edge=left and order=reverse.', 'Take the left edge of each line, then reverse the result.'],
    wrong: ['Both instructions in the address matter.'],
    solution: 'The left edge spells EGAPEHT. Reverse it to get THE PAGE. The page itself has been the final instrument.'
  }
];

export function validateLevels(items) {
  const problems = [];
  if (!Array.isArray(items) || items.length === 0) return ['At least one level is required.'];
  const ids = new Set();
  for (const [index, level] of items.entries()) {
    const label = `Level ${index + 1}`;
    if (!level || typeof level !== 'object') { problems.push(`${label} must be an object.`); continue; }
    if (!Number.isInteger(level.id) || ids.has(level.id)) problems.push(`${label} needs a unique integer id.`);
    ids.add(level.id);
    if (typeof level.title !== 'string' || !level.title.trim()) problems.push(`${label} needs a title.`);
    if (!['answer', 'click'].includes(level.kind)) problems.push(`${label} has an unsupported kind.`);
    if (level.kind === 'answer' && (!Array.isArray(level.answers) || !level.answers.length || level.answers.some(a => typeof a !== 'string' || !a.trim()))) problems.push(`${label} needs non-empty accepted answers.`);
    if (level.kind === 'click' && typeof level.buttonLabel !== 'string') problems.push(`${label} needs a button label.`);
    if (!Array.isArray(level.hints)) problems.push(`${label} needs a hints array.`);
    if (index < items.length - 1 && level.id !== items[index + 1]?.id - 1) problems.push(`${label} must progress to the next consecutive id.`);
  }
  return problems;
}
