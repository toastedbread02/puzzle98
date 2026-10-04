# The Margin

The Margin is a 50-entry sequential browser puzzle built with plain HTML, CSS, and JavaScript. The first entries teach the site’s reading rules; later entries use JSON, JavaScript, CSS and DOM inspection, regular expressions, hexadecimal and XOR, SVG paths, event logs, and plotted digital, Manchester, Morse, and run-length waveforms. Progress stays in the current browser; there are no accounts or player-tracking services.

## Run locally

Requirements: Node.js 18 or newer. There are no third-party packages to install.

```sh
npm install
npm run dev
```

Open <http://localhost:5173>. Set another port with `PORT=8080 npm run dev`.

## Test

```sh
npm test
```

The tests cover all 50 level records, accepted answers, data validation, progression, reset-state defaults, hint counts, persistence parsing, and the self-contained visual asset set.

## Publish with GitHub Pages

The live game is at <https://toastedbread02.github.io/puzzle98/>. The GitHub Actions workflow at [`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs the tests, packages only the static game files, and deploys on pushes to `main`.

1. Push changes to the `main` branch.
2. GitHub Actions tests and publishes the static game artifact.
3. Open **Actions → Deploy The Margin to GitHub Pages** to inspect a run. Project sites use `https://YOUR-USER.github.io/YOUR-REPOSITORY/`.

The page uses relative asset paths, so it works under the repository subpath. Local-only `server.js`, tests, and debug setup are left out of the published artifact.

## Local developer mode

Start with `PUZZLE_DEBUG=1 npm run dev`. A local panel appears on each entry with its intended answer, explanation, level jump buttons, skip, and clear-save controls. It is off by default and the server only enables it when that environment variable is exactly `1`. Do not deploy the development server with the flag enabled.

## Add a level

Add an object to the `levels` array in [`src/levels.js`](src/levels.js). Set a consecutive numeric `id`, `title`, `kind` (`answer` or `click`), player-facing `paragraphs`, and a `hints` array. Answer entries also need `answers`; click entries need `buttonLabel`. Optional renderers include `json`, `code`, `grid`, `inspector`, `tiles`, `vector`, `waveform`, `poem`, `sequence`, and `word`. `query` and `hash` set puzzle-specific address clues. `solution` is for local debug mode. The validator reports missing or malformed essentials at startup.

Answers necessarily ship to the browser because checking happens locally. The game does not present the developer explanation in normal play; the explanation is only surfaced by local developer mode.

## Manual play checklist

- Start in a fresh browser profile; entry 01 should load.
- Solve all 50 entries in order and confirm the address updates as you progress.
- On entries 02, 07, 10, 19, 40, 42, and 50, inspect the address values and fragment.
- On entries 13 and 34, inspect the sample element in the browser’s Elements panel.
- Decode the plotted bit, parity, Manchester, Morse, and run-length traces on entries 28, 29, 36, 41, and 44.
- Reveal hints one at a time, reload, and confirm the revealed count persists.
- Enter a wrong response and confirm the page gives short guidance without advancing.
- Reload midway through the run; progress should return to the current entry.
- Use the period button on entry 09 by mouse and keyboard.
- Finish entry 50, then reset and confirm the run starts over.
- With debug mode enabled, jump between entries, inspect solutions, skip, and clear the save. With it disabled, confirm the panel is absent.
- Check a narrow mobile viewport and keyboard focus visibility.
