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
  },
  {
    id: 11, title: 'Filter the records', difficulty: 'Structured data', kind: 'answer',
    paragraphs: ['This is a JSON array. Keep records whose `active` value is the boolean true. Read their `glyph` values in the order they appear.'],
    json: [{ active: false, glyph: 'X' }, { active: true, glyph: 'R' }, { active: true, glyph: 'E' }, { active: false, glyph: 'Y' }, { active: true, glyph: 'A' }, { active: true, glyph: 'D' }],
    answers: ['read'], hints: ['Do not sort the array. Filter it.', 'There are four active records.'],
    solution: 'Filtering active=true leaves R, E, A, D in array order: READ.'
  },
  {
    id: 12, title: 'Trace the pipeline', difficulty: 'Read the code literally', kind: 'answer',
    paragraphs: ['Do not run this snippet. Follow each operation from left to right and write the final output.'],
    code: 'const rows = [\n  { n: 1, ch: "X" }, { n: 2, ch: "C" },\n  { n: 3, ch: "R" }, { n: 4, ch: "O" },\n  { n: 5, ch: "D" }, { n: 6, ch: "E" }\n];\nrows.filter(r => r.n % 2 === 0)\n    .map(r => r.ch).join("");',
    answers: ['code'], hints: ['The filter keeps even n values.', 'Map keeps only ch, then join adds no separators.'],
    solution: 'Even n values are 2, 4, 6. Their ch values join to CODE.'
  },
  {
    id: 13, title: 'The instruction is attached', difficulty: 'Inspect the element', kind: 'answer',
    paragraphs: ['The printed label is the payload. Inspect the element in your browser’s Elements panel; its `data-read` attribute tells you what to do.'],
    inspector: { text: 'LIVE', attributes: { read: 'reverse', kind: 'specimen' } },
    answers: ['evil'], hints: ['Inspect the outlined specimen, not the application source.', 'Reverse the four printed letters.'],
    solution: 'The element has data-read="reverse". LIVE reversed is EVIL.'
  },
  {
    id: 14, title: 'Which rule wins?', difficulty: 'Specificity', kind: 'answer',
    paragraphs: ['Three rules target the same label. Which color wins in the cascade? Compare selector specificity; source order only breaks a tie.'],
    code: '.notice { color: orange; }\n#notice { color: blue; }\n#notice.notice { color: green; }\n\n<p id="notice" class="notice">...</p>',
    answers: ['green'], hints: ['An ID selector outweighs a class selector.', 'The last selector has both an ID and a class.'],
    solution: '#notice.notice has specificity (1 ID, 1 class), greater than #notice (1 ID), so green wins.'
  },
  {
    id: 15, title: 'Order is a field', difficulty: 'Sort before reading', kind: 'answer',
    paragraphs: ['Arrays keep their order; these records do not arrive sorted. Sort by `rank` ascending, then concatenate the glyphs.'],
    json: [{ rank: 4, glyph: 'H' }, { rank: 2, glyph: 'A' }, { rank: 1, glyph: 'P' }, { rank: 3, glyph: 'T' }],
    answers: ['path'], hints: ['Use the numeric rank, not the order shown.', 'The sorted ranks are 1, 2, 3, 4.'],
    solution: 'Ranks 1–4 yield P, A, T, H: PATH.'
  },
  {
    id: 16, title: 'Bytes in a different coat', difficulty: 'A representation change', kind: 'answer',
    paragraphs: ['Each pair is one hexadecimal byte. The note beside the string says these bytes are ASCII character codes.'],
    code: '53 54 41 52',
    answers: ['star'], hints: ['Hexadecimal uses sixteen symbols: 0–9 and A–F.', 'Convert each byte to decimal, then read its ASCII character.'],
    solution: '0x53, 0x54, 0x41, 0x52 are ASCII S, T, A, R.'
  },
  {
    id: 17, title: 'Not encryption', difficulty: 'Recognize the encoding', kind: 'answer',
    paragraphs: ['The label says `base64`, a text encoding rather than a secret key. Decode the payload as text.'],
    code: 'U0lHTkFM',
    answers: ['signal'], hints: ['Base64 commonly uses letters, digits, +, /, and optional = padding.', 'Decode it as UTF-8 text; do not try to decrypt it.'],
    solution: 'Base64 decoding U0lHTkFM gives SIGNAL.'
  },
  {
    id: 18, title: 'A route through the grid', difficulty: 'Read a path', kind: 'answer',
    paragraphs: ['Start at the upper-left cell. Move clockwise around the outside, then take the center. Read each cell once.'],
    grid: [['C', 'L', 'O'], ['S', 'E', 'C'], ['I', 'W', 'K']],
    answers: ['clockwise'], hints: ['Go across the top, down the right, back along the bottom, then up.', 'The center is the final letter.'],
    solution: 'The clockwise spiral spells C L O C K W I S E.'
  },
  {
    id: 19, title: 'The address has a fragment', difficulty: 'Inspect the whole URL', kind: 'answer',
    hash: 'take=3', paragraphs: ['The fragment after `#` is an instruction. Apply it to the row below, counting from one.'],
    sequence: 'PIN   /   NOTE   /   SIGNAL   /   TRACE', answers: ['signal'],
    hints: ['The fragment is the part after the hash mark.', 'take=3 means choose the third item.'],
    solution: 'The URL fragment is #take=3. The third item is SIGNAL.'
  },
  {
    id: 20, title: 'The slice stops before the end', difficulty: 'Trace string indices', kind: 'answer',
    paragraphs: ['JavaScript string indexes start at zero. `slice(start, end)` includes start and excludes end. What does this print?'],
    code: 'const label = "CLENSE";\nconsole.log(label.slice(1, 5));', answers: ['lens'],
    hints: ['Write the string with indexes above each character.', 'Take positions 1, 2, 3, and 4.'],
    solution: 'Indexes 1 through 4 are L, E, N, S: LENS.'
  },
  {
    id: 21, title: 'Painted order, source order', difficulty: 'The DOM and the screen differ', kind: 'answer',
    paragraphs: ['CSS paints these four children in reverse order. The question asks for their text in DOM order. Read the HTML sequence, not the visual row.'],
    code: '<div class="row">\n  <b>F</b><b>A</b><b>R</b><b>M</b>\n</div>\n.row { display: flex; flex-direction: row-reverse; }',
    tiles: [{ text: 'F' }, { text: 'A' }, { text: 'R' }, { text: 'M' }], tileDirection: 'row-reverse',
    answers: ['farm'], hints: ['The visible tiles show paint order.', 'The DOM children stay in the order written in the markup.'],
    solution: 'The DOM text is F, A, R, M even though row-reverse paints M, A, R, F.'
  },
  {
    id: 22, title: 'Two names, one array', difficulty: 'Track shared state', kind: 'answer',
    paragraphs: ['What number is printed? `alias` refers to the same array as `first`; it is not a copy.'],
    code: 'const first = [1, 2];\nconst alias = first;\nalias.push(3);\nconsole.log(first.length + alias[0]);',
    answers: ['4', 'four'], hints: ['After push, both names see the same three-item array.', 'Add its length to its first value.'],
    solution: 'first.length is 3 and alias[0] is 1, so the output is 4.'
  },
  {
    id: 23, title: 'A number is not its string', difficulty: 'JSON types matter', kind: 'answer',
    paragraphs: ['Keep only JSON values whose type is number. Add them. A quoted digit is a string.'],
    json: { values: [3, '3', 7], keep: 'typeof value === "number"' },
    answers: ['10', 'ten'], hints: ['The quotes around the second 3 change its type.', 'Only 3 and 7 are numbers.'],
    solution: 'The numeric values are 3 and 7; their sum is 10.'
  },
  {
    id: 24, title: 'Read the capture groups', difficulty: 'Regular expressions', kind: 'answer',
    paragraphs: ['The pattern finds a four-letter mirror of the form ABBA. Submit capture group 1 followed by capture group 2.'],
    code: 'pattern: /([A-Z])([A-Z])\\2\\1/\ntext:    "--ABBA--"',
    answers: ['ab'], hints: ['Parentheses make capture groups.', '`\\2` repeats group 2; `\\1` repeats group 1.'],
    solution: 'The match is ABBA, so group 1 is A and group 2 is B: AB.'
  },
  {
    id: 25, title: 'One pass only', difficulty: 'The browser decodes in stages', kind: 'answer',
    paragraphs: ['Decode this HTML entity exactly once. Do not decode the result a second time.'],
    code: '&amp;lt;', answers: ['&lt;'],
    hints: ['The outer entity begins with &amp;.', 'After one pass, the result is still an entity-shaped string.'],
    solution: 'One HTML entity pass turns &amp;lt; into the literal text &lt;.'
  },
  {
    id: 26, title: 'The gaps grow', difficulty: 'A last pattern check', kind: 'answer',
    paragraphs: ['Every term fits the same rule. Compare the differences, not just the values.'],
    sequence: '2   6   12   20   30   ?', answers: ['42', 'forty two', 'fortytwo'],
    hints: ['The differences are 4, 6, 8, 10.', 'The next difference is 12.'],
    solution: 'Add 12 to 30 for 42. Equivalently, the terms are n(n+1).'
  },
  {
    id: 27, title: 'A loop with a doubling step', difficulty: 'Trace until the condition fails', kind: 'answer',
    paragraphs: ['What is the last value appended before the loop stops?'],
    code: 'const out = [];\nfor (let n = 1; n < 100; n *= 2) {\n  out.push(n);\n}\nconsole.log(out);',
    answers: ['64'], hints: ['The loop multiplies n by two after each pass.', 'The next value after 64 is 128, which fails n < 100.'],
    solution: 'The loop appends 1, 2, 4, 8, 16, 32, and 64. Then n becomes 128.'
  },
  {
    id: 28, title: 'Read the signal', difficulty: 'A waveform is data', kind: 'answer',
    paragraphs: ['This digital trace has equal-width cells. Sample the middle of each cell: high is 1, low is 0. There are four bytes; use the character encoding from entry 8.'],
    waveform: { type: 'bits', bits: '01010111010000010101011001000101', group: 8, caption: 'Digital trace · one sample per cell' },
    answers: ['wave'], hints: ['Ignore the shape at the transitions; read one level per grid cell.', 'The four bytes decode to W, A, V, E.'],
    solution: 'The trace samples to 01010111 01000001 01010110 01000101, ASCII WAVE.'
  },
  {
    id: 29, title: 'Short, long, and silent', difficulty: 'Decode the timing', kind: 'answer',
    paragraphs: ['A short high pulse is a dot; a high pulse three times as long is a dash. Short low gaps separate marks, long low gaps separate letters. Use the printed code card.'],
    waveform: { type: 'morse', code: '-. --- - .', caption: 'Amplitude over time · short and long marks' },
    code: 'N  -.     O  ---     T  -     E  .', answers: ['note'],
    hints: ['Read high pulses only; silence is spacing.', 'The four letter groups are N, O, T, E.'],
    solution: 'The pulse groups are -. / --- / - / ., which the code card maps to NOTE.'
  },
  {
    id: 30, title: 'Sort the event log', difficulty: 'A small data pipeline', kind: 'answer',
    paragraphs: ['Sort by timestamp ascending, then take the first character of each event name.'],
    json: [{ time: '09:12', event: 'Echo' }, { time: '09:03', event: 'North' }, { time: '09:09', event: 'Tide' }, { time: '09:06', event: 'Open' }],
    answers: ['note'], hints: ['The rows are not chronological as shown.', 'The sorted event initials are N, O, T, E.'],
    solution: 'Chronological order is North, Open, Tide, Echo: NOTE.'
  },
  {
    id: 31, title: 'The query is already written', difficulty: 'Read a data operation', kind: 'answer',
    paragraphs: ['Apply the query to the rows: keep active records, sort their position descending, and concatenate glyphs.'],
    code: 'SELECT glyph\nFROM rows\nWHERE active = true\nORDER BY position DESC;',
    json: [{ position: 1, active: true, glyph: 'D' }, { position: 2, active: false, glyph: 'X' }, { position: 3, active: true, glyph: 'A' }, { position: 4, active: true, glyph: 'E' }, { position: 5, active: true, glyph: 'R' }],
    answers: ['read'], hints: ['Ignore the inactive row.', 'Read active positions 5, 4, 3, 1.'],
    solution: 'Descending active positions yield R, E, A, D.'
  },
  {
    id: 32, title: 'The closure remembers', difficulty: 'Follow state through a function', kind: 'answer',
    paragraphs: ['The function closes over `count`. What does the final log print?'],
    code: 'let count = 1;\nconst add = value => { count += value; };\nadd(2);\nadd(count);\nconsole.log(count);',
    answers: ['6', 'six'], hints: ['After the first call, count is 3.', 'The second call adds the current count to itself.'],
    solution: 'count goes 1 → 3 → 6.'
  },
  {
    id: 33, title: 'Follow the references', difficulty: 'Traverse the JSON graph', kind: 'answer',
    paragraphs: ['Start at `start`. At each node, emit `glyph`, then follow `next`. Stop when next is null.'],
    json: { start: 's', nodes: { s: { glyph: 'P', next: 't' }, t: { glyph: 'A', next: 'r' }, r: { glyph: 'T', next: 'h' }, h: { glyph: 'H', next: null } } },
    answers: ['path'], hints: ['Do not read the object’s visual key order as the route.', 'Follow s → t → r → h.'],
    solution: 'Traversing the links emits P, A, T, H: PATH.'
  },
  {
    id: 34, title: 'A comment has no box', difficulty: 'Inspect the live DOM', kind: 'answer',
    paragraphs: ['The visible plate has a note attached to it that takes up no space. Inspect the plate in the Elements panel and read its child comment. The comment contains ASCII bytes in hexadecimal.'],
    inspector: { text: 'PLATE 04', comment: '4c 45 4e 53', attributes: { part: 'plate' } },
    answers: ['lens'], hints: ['DOM comments appear in the Elements tree but not on the page.', 'Decode the four hex bytes as ASCII.'],
    solution: 'The child comment is 4c 45 4e 53, which decodes to LENS.'
  },
  {
    id: 35, title: 'Coordinates, not reading order', difficulty: 'Inspect the grid', kind: 'answer',
    paragraphs: ['Coordinates are written (x,y), with zero at the upper-left. Read the marked coordinates in the order listed.'],
    grid: [['T', 'R', 'A'], ['E', 'C', 'X'], ['O', 'P', 'S']],
    code: '[(0,0), (1,0), (2,0), (1,1), (0,1)]', answers: ['trace'],
    hints: ['x selects the column; y selects the row.', 'The coordinates select T, R, A, C, E.'],
    solution: 'Index grid[y][x] for the supplied coordinates: T, R, A, C, E.'
  },
  {
    id: 36, title: 'Parity check', difficulty: 'Signal plus validation', kind: 'answer',
    paragraphs: ['Sample each cell as 1 or 0. Each byte is followed by an even-parity bit: the total number of 1s in the byte plus its parity bit must be even. Drop parity bits, then decode the four bytes as ASCII.'],
    waveform: { type: 'bits', bits: '010001011 010001000 010001110 010001011', group: 9, caption: 'Nine cells per frame · final cell is parity' },
    answers: ['edge'], hints: ['Each 9-cell frame has 8 data cells and 1 parity cell.', 'The data bytes spell E, D, G, E; the final 0/1 in each frame validates them.'],
    solution: 'The four 9-bit frames have valid even parity. Removing each final parity bit leaves ASCII EDGE.'
  },
  {
    id: 37, title: 'A pattern with captures', difficulty: 'Filter, then extract', kind: 'answer',
    paragraphs: ['The regex finds letter-digit pairs. Keep matches whose digit is odd, then concatenate the captured letters.'],
    code: 'pattern: /([A-Z])=(\\d)/g\ntext:    S=9 X=2 I=7 Q=4 G=5 N=3 A=1 L=9',
    answers: ['signal'], hints: ['Group 1 is the letter; group 2 is the digit.', 'Keep odd digits; read the captured letters in source order.'],
    solution: 'The odd-valued pairs are S, I, G, N, A, L.'
  },
  {
    id: 38, title: 'Truthiness has a shape', difficulty: 'JavaScript, not English', kind: 'answer',
    paragraphs: ['Evaluate the JavaScript expression. In JavaScript, an empty array is truthy; `Number(false)` is zero.'],
    code: 'Number(Boolean([])) + Number(false)', answers: ['1', 'one'],
    hints: ['Boolean([]) is true, even though the array is empty.', 'The expression is 1 + 0.'],
    solution: 'Boolean([]) is true → Number(true) is 1; Number(false) is 0; total 1.'
  },
  {
    id: 39, title: 'The key is the key', difficulty: 'Read the access path', kind: 'answer',
    paragraphs: ['Start with `packet`. For each path segment, access that property. Submit the final value.'],
    json: { packet: { route: { next: { label: 'threshold' } } }, path: ['packet', 'route', 'next', 'label'] },
    answers: ['threshold'], hints: ['Follow the four path segments in order.', 'The final property is label.'],
    solution: 'packet.route.next.label evaluates to "threshold".'
  },
  {
    id: 40, title: 'Edges, in two directions', difficulty: 'Reuse a reading rule', kind: 'answer',
    query: { edge: 'last', order: 'reverse' },
    paragraphs: ['Use the address first. Read the named edge of each line from top to bottom, then apply the second address value.'],
    poem: 'Marks disappear into the haze.\nA narrow line vibrates like music.\nThe signal begins as a slow echo.\nThere is more here to read.',
    answers: ['code'],
    hints: ['The last letters spell E C O D.', 'The URL says order=reverse.'],
    solution: 'edge=last yields ECOD; order=reverse makes it CODE.'
  },
  {
    id: 41, title: 'Timing is part of the data', difficulty: 'Decode a sampled trace', kind: 'answer',
    paragraphs: ['The trace is Manchester-coded. Each bit cell has two halves: low→high means 0; high→low means 1. Sample the halves in each cell, then read the resulting bytes as ASCII.'],
    waveform: { type: 'manchester', bits: '01001111 01001011', group: 8, caption: 'Manchester trace · two half-cells per bit' },
    answers: ['ok'], hints: ['A transition in the middle of every cell is the clock.', 'Decode the two halves using the mapping above; the bytes spell OK.'],
    solution: 'Manchester decode gives 01001111 01001011, ASCII OK.'
  },
  {
    id: 42, title: 'The parameter selects the branch', difficulty: 'Combine URL and JSON', kind: 'answer',
    query: { field: 'fallback' },
    paragraphs: ['Read the `field` value from the address. Use it as the key to select a value from the record.'],
    json: { primary: 'NORTH', fallback: 'EAST', reserve: 'SOUTH' },
    answers: ['east'], hints: ['The address names a key, not a direction to travel.', 'Look up that exact key in the JSON object.'],
    solution: 'The URL has field=fallback; record.fallback is EAST.'
  },
  {
    id: 43, title: 'Select, then concatenate', difficulty: 'A small HTML query', kind: 'answer',
    paragraphs: ['The selector is `li[data-keep="yes"]`. Query the element list in DOM order, then concatenate each selected item’s text.'],
    code: '<ul>\n  <li data-keep="no">X</li>\n  <li data-keep="yes">S</li>\n  <li data-keep="yes">O</li>\n  <li data-keep="no">Q</li>\n  <li data-keep="yes">U</li>\n  <li data-keep="yes">R</li>\n  <li data-keep="yes">C</li>\n  <li data-keep="yes">E</li>\n</ul>',
    answers: ['source'], hints: ['The selector requires the exact value yes.', 'The selected letters remain in DOM order.'],
    solution: 'Selected text is S O U R C E.'
  },
  {
    id: 44, title: 'Run-length signal', difficulty: 'The waveform carries counts', kind: 'answer',
    paragraphs: ['Each high pulse lasts a number of cells equal to one decimal digit. Ignore the low gaps. Read the digits from left to right.'],
    waveform: { type: 'runs', runs: [3, 1, 4, 1, 5], caption: 'Pulse widths · equal time cells' },
    answers: ['31415'], hints: ['Count cells at the high level, not the empty space.', 'There are five pulses.'],
    solution: 'The five pulse widths are 3, 1, 4, 1, 5.'
  },
  {
    id: 45, title: 'A transform in two passes', difficulty: 'Composition', kind: 'answer',
    paragraphs: ['Apply the operations in order: first take the even indexes (starting at zero), then reverse the result.'],
    word: 'PLASM', answers: ['map'],
    hints: ['Even indexes are 0, 2, and 4.', 'Those letters are P, A, M; then reverse them.'],
    solution: 'Even-index letters from PLASM are P, A, M; reversed, they spell MAP.'
  },
  {
    id: 46, title: 'XOR is a reversible mask', difficulty: 'Bytes and a key', kind: 'answer',
    paragraphs: ['XOR each byte with the same key byte. A bit paired with itself becomes 0; a bit paired with 0 stays unchanged. The output bytes are ASCII.'],
    code: 'key:    0x2A\ndata:   0x61 0x6F 0x73', answers: ['key'],
    hints: ['Apply byte-wise XOR with 0x2A to every byte.', 'The decoded ASCII letters spell KEY.'],
    solution: '0x61 xor 0x2A = 0x4B (K); 0x6F xor 0x2A = E; 0x73 xor 0x2A = Y.'
  },
  {
    id: 47, title: 'A path has a direction', difficulty: 'Inspect vector data', kind: 'answer',
    paragraphs: ['The SVG path is a sequence of move/line commands. Start at the arrow’s tail and read the letters along the connected route.'],
    vector: { points: [{ x: 15, y: 15, n: '1', ch: 'N' }, { x: 55, y: 15, n: '2', ch: 'O' }, { x: 95, y: 15, n: '3', ch: 'R' }, { x: 95, y: 55, n: '4', ch: 'T' }, { x: 55, y: 55, n: '5', ch: 'H' }], path: [0, 1, 2, 3, 4] },
    answers: ['north'], hints: ['Follow the connected segments; do not sort by x or y.', 'The path visits points 1 through 5.'],
    solution: 'The connected path visits N, O, R, T, H.'
  },
  {
    id: 48, title: 'Sort the painted pieces', difficulty: 'DOM, CSS, and attributes', kind: 'answer',
    paragraphs: ['CSS `order` determines the visible sequence. Read the text of each tile from left to right, then apply that tile’s `data-read` instruction.'],
    tiles: [{ text: 'SN', read: 'reverse', order: 2 }, { text: 'EL', read: 'reverse', order: 1 }],
    answers: ['lens'], hints: ['The visible order is `order=1` followed by `order=2`.', 'Both tiles say reverse.'],
    solution: 'CSS places EL before SN. Reversing each tile gives LE + NS = LENS.'
  },
  {
    id: 49, title: 'Reuse the key', difficulty: 'A two-level encoding', kind: 'answer',
    paragraphs: ['At entry 46 you recovered a three-character key. Repeat that key across these bytes, XOR each byte, and read the ASCII result.'],
    code: '18 0A 0C 19 06 1C', answers: ['source'],
    hints: ['Use the key from entry 46, repeating from its first character.', 'Convert KEY to bytes, XOR each listed byte, and decode the result.'],
    solution: 'Repeating KEY as bytes and XORing yields SOURCE.'
  },
  {
    id: 50, title: 'The document is the instrument', difficulty: 'Everything connects here', kind: 'answer',
    query: { order: 'reverse' },
    paragraphs: ['Start at the JSON record named in the object. Follow each `next` link and collect one glyph per record until there is no next link. Then use the address.'],
    json: { start: 'a', nodes: { a: { glyph: 'E', next: 'b' }, b: { glyph: 'G', next: 'c' }, c: { glyph: 'A', next: 'd' }, d: { glyph: 'P', next: 'e' }, e: { glyph: 'E', next: 'f' }, f: { glyph: 'H', next: 'g' }, g: { glyph: 'T', next: null } } },
    answers: ['the page', 'thepage'],
    hints: ['The references form a chain, not a sorted list.', 'The chain spells EGAPEHT. The URL says order=reverse.'],
    wrong: ['The data gives a route. The address still has one operation for you.'],
    solution: 'Follow a → b → c → d → e → f → g to get EGAPEHT. Reverse it as directed by the URL: THE PAGE. The JSON, DOM, URL, and rendering rules were all parts of the same document.'
  }
];

// The note for each entry is duplicated in index.html as an HTML source comment.
const sourceChallenges = [
  ['Decimal bytes', '83 79 85 82 67 69', 'Read the values as decimal ASCII bytes.', 'SOURCE', '83 79 85 82 67 69 decode to SOURCE.', 'ASCII values are decimal, not hex.'],
  ['Backwards buffer', 'ETON', 'Reverse the four characters.', 'NOTE', 'The buffer is read from its final character to its first.', 'The source note names a direction.'],
  ['Hex dump', '43 4F 44 45', 'Read each pair as a hexadecimal ASCII byte.', 'CODE', 'Hexadecimal bytes 43 4F 44 45 spell CODE.', 'Each pair is one byte.'],
  ['The skipped records', '[{i:0,c:"X"},{i:1,c:"A"},{i:2,c:"X"},{i:3,c:"R"},{i:4,c:"X"},{i:5,c:"E"},{i:6,c:"X"},{i:7,c:"A"},{i:8,c:"X"},{i:9,c:"D"}]', 'Keep odd indexes, then concatenate c.', 'AREAD', 'Odd indexes 1,3,5,7,9 spell AREAD.', 'Indexing starts at zero.'],
  ['A stable queue', '[{p:2,c:"R"},{p:1,c:"E"},{p:2,c:"A"},{p:1,c:"D"}]', 'Sort by p ascending; preserve input order for ties.', 'EDRA', 'Stable sort gives E,D,R,A.', 'Equal priorities retain their input order.'],
  ['The pointer', '{"a":{"b":[{"c":"TRACE"}]}}', 'Follow JSON Pointer /a/b/0/c.', 'TRACE', 'The pointer resolves to the c field of array item zero.', 'Slash-separated keys lead the way.'],
  ['Capture only', 'rack-07/bin-42', 'Capture digits after rack- and bin-; concatenate while retaining zeroes.', '0742', 'The captures are 07 and 42.', 'Parentheses in a regex can capture substrings.'],
  ['Specificity tuple', 'element=<main><div id=cabinet class=cabinet>; #cabinet=blue; main #cabinet=red; .cabinet.cabinet=green', 'Compare matching selectors by (IDs, classes, elements). Return the winning color.', 'red', 'main #cabinet has one ID, one class, and one element; it wins.', 'Compare tuple components from left to right.'],
  ['Child nodes', 'index:text A | 1:space | 2:text B | 3:comment | 4:text C', 'Treat spaces and comments as childNodes. Take even zero-based indexes.', 'ABC', 'Indexes 0,2,4 yield A,B,C.', 'This is childNodes, not children.'],
  ['Signed byte', '11110110', 'Interpret as an 8-bit signed two’s-complement integer.', '-10', 'Invert and add one to find magnitude 10; sign is negative.', 'The width is exactly eight bits.'],
  ['Decode twice', '%2Froom%252F7%3Fq%3Done', 'Percent-decode exactly twice.', '/room/7?q=one', 'One pass leaves %2F; the second decodes the slash.', 'Do not stop after the first decoding pass.'],
  ['Zero specificity', ':where(#desk) .tag=amber; #desk .tag=cobalt', 'Remember :where() adds zero specificity. Return the winning color.', 'cobalt', 'The second selector carries an ID and a class.', 'The ID inside :where() does not count.'],
  ['The odd positions', 'xSxOxU', 'Take indexes 1,3,5 using zero-based indexing.', 'SOU', 'The selected characters are S,O,U.', 'Index zero is x.'],
  ['A remainder', 'bytes=[83,79,85,82,67,69]; divisor=7', 'Sum the bytes, then take remainder modulo 7.', '3', 'The sum is 465; 465 mod 7 is 3.', 'Do not take each byte modulo seven separately.'],
  ['Short circuit', '"" || 0 || null || "TRACE" || "END"', 'Evaluate JavaScript logical OR and return its value.', 'TRACE', 'The first truthy operand is TRACE.', 'OR returns an operand, not necessarily true.'],
  ['Reducer state', '[3,1,4,1,5]', 'Fold left from zero with accumulator = accumulator*10 + item.', '31415', 'Each step appends a digit numerically.', 'The accumulator starts at zero.'],
  ['CSS counter', 'start=0; increment=2; items=4', 'The third displayed counter value is requested; count each item once.', '6', 'Displayed values are 2,4,6,8.', 'The first increment happens before display.'],
  ['Sparse map', '["M", <hole>, "P", undefined, "A"]', 'Map replaces undefined with underscore, skips holes; then join with empty separator.', 'MP_A', 'The hole is skipped; explicit undefined becomes underscore.', 'A hole is not visited by map.'],
  ['Prefix sum', 'first=4; deltas=[3,-1,5,-2]', 'Add each delta to the previous result. Convert each running value using A=1.', 'DGFKI', 'Running values 4,7,6,11,9 map to D,G,F,K,I.', 'The deltas are cumulative.'],
  ['Fragment coordinates', '#row-4-col-2', 'Ignore everything before #. Convert row then column as A=1, B=2, and so on.', 'DB', '4 maps to D and 2 to B.', 'The fragment begins at the hash.'],
  ['XOR bytes', 'data=[27,28,13,8,27]; key=91', 'XOR each byte with key and decode the result as ASCII.', 'THEAT', 'The decoded bytes are THEAT.', 'Apply the same key separately to every byte.'],
  ['Stack output', 'push S,T,A,C,K; then pop until empty', 'A stack is last in, first out. Concatenate pop results.', 'KCATS', 'Pops return K,C,A,T,S.', 'Start from the last pushed value.'],
  ['Regex replacement', 'ab-12 cd-34', 'Globally replace letters-digits with digits-letters; keep the space.', '12ab 34cd', 'Each pair swaps its two captured groups.', 'There are two matches.'],
  ['Inherited value', 'parent color=slate; child initial; child inherit', 'Resolve declarations in order; report the final computed child color.', 'slate', 'The final inherit takes the parent’s computed value.', 'The last declaration wins before inheritance is resolved.'],
  ['UTF-8 signature', 'EF BB BF 4F 4B', 'Ignore the UTF-8 signature, decode the remaining bytes as ASCII.', 'OK', '4F 4B spells OK.', 'The first three bytes are a signature.'],
  ['Exclusive end', 'Array.from({length:8},(_,i)=>i).slice(2,6).reverse()', 'Evaluate slice with exclusive end, then read the result.', '5,4,3,2', 'Indexes 2 through 5 are selected, then reversed.', 'Index 6 is excluded.'],
  ['Two entity passes', '&amp;lt;tag&amp;gt;', 'Decode HTML entities once per pass, for two passes.', '<tag>', 'Two decodes reveal the angle brackets.', 'One pass leaves &lt;tag&gt;.'],
  ['SVG line points', 'M2,2 L8,2 L8,5 L4,5 Z', 'Ignore M and Z. For each L pair, convert x then y using A=1; concatenate.', 'HBHE', 'Pairs give H,B then H,E.', 'Read both coordinates at each L.'],
  ['Weighted checksum', 'text=SOURCE; weights=1,2,3,4,5,6', 'Multiply each ASCII code by its one-based position, sum, report the last digit.', '3', 'The weighted sum is 1573, whose last digit is 3.', 'Use ASCII codes rather than alphabet indexes.'],
  ['Selector list', '#a, .b matches; .c #d does not', 'Only matching selectors count. Return the x value from the winning declaration: #a,.b {x:1}; .c #d {x:2}.', '1', 'The second selector does not match this element.', 'A comma separates alternative selectors.'],
  ['Generator return', 'yield 2; yield 5; return 9; then spread', 'Spread collects yielded values but not the return value.', '2,5', 'Only 2 and 5 are yielded.', 'Return is not yield.'],
  ['UTF-8 character', 'C3 A9', 'Decode as one UTF-8 character; answer its common English name.', 'E ACUTE', 'These bytes encode é, Latin small letter e with acute.', 'It is one Unicode character, not two ASCII letters.'],
  ['Closure memory', 'make n=1; return ++n; call same function 3 times', 'Calls share the closed-over n. Add all three returned values.', '9', 'The calls return 2,3,4; sum is 9.', 'The closure is created once.'],
  ['Map overwrite', 'set x=2; set y=4; set x=7; read values', 'Replacing an existing Map key changes its value but keeps its insertion position.', '74', 'Values iterate as 7 then 4.', 'There are still only two keys.'],
  ['The :is() rule', ':is(#x,.y) specificity; #x.y specificity', 'For :is(), use its most specific argument. Compare both matching rules; return winner.', 'second', 'Both have one ID; the second also has a class.', 'Compare remaining specificity after IDs.'],
  ['Factorial remainder', '5! mod 13', 'Compute factorial, then take remainder modulo 13.', '3', '120 divided by 13 leaves remainder 3.', '5! is 120.'],
  ['Little endian', '02 01 00 00', 'Interpret four bytes as unsigned little-endian 32-bit integer; give decimal.', '258', '2 + 1×256 = 258.', 'The first byte is least significant.'],
  ['Text walk', 'text A; <b>text B; comment x</b>; text C', 'Walk descendant text nodes depth-first in document order; ignore comments.', 'ABC', 'Text nodes are A, then B, then C.', 'Element boundaries do not reorder text.'],
  ['JavaScript remainder', '-17 % 5', 'Use JavaScript remainder semantics; the sign follows the dividend.', '-2', 'JavaScript evaluates this remainder as -2.', 'Do not normalize to a positive modulo.'],
  ['One digit per match', 'ab12cd34; /([a-z]+)(\\d)/g capture group 2', 'Collect capture group 2 from each global match.', '13', 'Matches consume ab1 and cd3.', 'The pattern asks for one digit, not all digits.'],
  ['Numeric source map', 'keys: 0:0→a.js; 0:1→b.js; 1:0→a.js', 'Sort keys numerically by line then column; take each filename initial.', 'aba', 'Numeric order yields a,b,a.', 'Do not sort the keys as plain strings.'],
  ['XOR fold', '[12,5,9,12]', 'XOR-fold from zero, left to right.', '12', '12 XOR 5 XOR 9 XOR 12 = 12.', 'XOR is associative; 5 XOR 9 is 12.'],
  ['Nested microtask', 'sync 1,5; queued microtasks 2,3; task queued by 2 logs 4', 'Finish synchronous calls, then drain microtasks in queue order, including newly queued work.', '15234', '1 and 5 run first, then 2,3, then nested 4.', 'The nested callback joins the queue tail.'],
  ['Stack machine', 'PUSH 6; PUSH 4; SUB; PUSH 3; MUL; EMIT', 'SUB pops b then a and pushes a-b; MUL uses a*b.', '6', '6-4=2, then 2×3=6.', 'Operand order matters for SUB.'],
  ['Follow the references', 'r→a:1; a→b:2; b→c:3; c→null:4', 'Start at r, follow each reference, collect the number; convert A=1.', 'ABCD', 'The chain numbers are 1,2,3,4.', 'Do not sort the records.'],
  ['Seven-bit frames', '1000001 1000010 1000011', 'Decode each seven-bit binary value as ASCII.', 'ABC', 'The values 65,66,67 spell ABC.', 'These frames omit the parity bit.'],
  ['Chunk transform', 'chunks=["SOU","RCE"]; order=[1,0]; transform=reverse', 'Reorder chunks, concatenate, then reverse the complete string.', 'UOSEC R'.replaceAll(' ', ''), 'Order gives RCESOU; reversing yields UOSEC R without a space: UOSECR.', 'Reverse after concatenating, not per chunk.'],
  ['Expression tree', 'root=+(7, *(3,4))', 'Evaluate the referenced expression tree with normal arithmetic.', '19', '7 + (3×4) = 19.', 'Resolve the child multiplication first.'],
  ['The first five', 'answers=[WHAT,RIGHT,MARGIN,16,DRAWER]', 'Take the length of each answer and concatenate the numbers.', '45626', 'Lengths are 4,5,6,2,6.', 'Count letters, not punctuation or quotes.'],
  ['The document walk', 'open→o→c→u→m→e→n→t; suffix=!; order=reverse', 'Follow references collecting text, append suffix, then reverse all characters including punctuation.', '!TNEMUCOD', 'The chain spells DOCUMENT; append ! and reverse to !TNEMUCOD.', 'The punctuation participates in the last operation.']
].map(([title, artifact, sourceNote, answer, solution, hint]) => ({ title, artifact, sourceNote, answer, solution, hint }));

for (const [index, challenge] of sourceChallenges.entries()) {
  const id = index + 51;
  levels.push({ id, title: challenge.title, difficulty: id < 61 ? 'Inspect the source' : id < 76 ? 'Source and structure' : id < 91 ? 'Several rules at once' : 'The source is part of the puzzle', kind: 'answer', sourceMarker: id,
    paragraphs: [`Open View Page Source and find ENTRY ${id} SOURCE. Apply its note to the artifact below. The note is part of this puzzle.`],
    code: challenge.artifact, sourceNote: challenge.sourceNote, answers: [challenge.answer], hints: [`The clue is in the source comment marked ENTRY ${id} SOURCE.`, challenge.hint, 'Trace the rule one operation at a time.'], solution: challenge.solution });
}

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
