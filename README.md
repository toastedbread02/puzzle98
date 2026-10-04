# The Margin

The Margin is a small, sequential browser puzzle. It uses plain HTML, CSS, and JavaScript; progress stays in the current browser and no account or network service is involved. Ten original entries form the opening complete run, from a literal question to a final puzzle that combines address-bar instructions and line edges.

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

The tests cover level data validation, answer checking, progression, reset-state defaults, hint counts, persistence parsing, and the self-contained visual asset set.

## Publish with GitHub Pages

The repository includes a GitHub Actions workflow at [`.github/workflows/pages.yml`](.github/workflows/pages.yml). It runs the tests, packages only the static game files, and deploys on pushes to `main`.

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The first Actions run publishes the game. GitHub shows the public address in the `github-pages` deployment environment; project sites use `https://YOUR-USER.github.io/YOUR-REPOSITORY/`.

The page uses relative asset paths, so it works under the repository subpath. Local-only `server.js`, tests, and debug setup are left out of the published artifact.

## Connect GitHub to ChatGPT

In ChatGPT, open **Settings → Apps**, find **GitHub**, and choose **Connect**. Sign in to GitHub and authorize the repositories you want ChatGPT to access. After it shows as connected, return to this conversation and tell me the repository name or URL. This folder currently has no Git remote, so I can prepare the Pages workflow here, but I need the connected account and target repository before I can push or publish it.

## Local developer mode

Start with `PUZZLE_DEBUG=1 npm run dev`. A local panel appears on each entry with its intended answer, explanation, level jump buttons, skip, and clear-save controls. It is off by default and the server only enables it when that environment variable is exactly `1`. Do not deploy the development server with the flag enabled.

## Add a level

Add an object to the `levels` array in [`src/levels.js`](src/levels.js). Set a consecutive numeric `id`, `title`, `kind` (`answer` or `click`), player-facing `paragraphs`, and a `hints` array. Answer entries also need `answers`; click entries need `buttonLabel`. Optional fields include `difficulty`, `poem`, `sequence`, `word`, `code`, `query`, `wrong`, and `solution`. The renderer uses text nodes for player-authored content. The validator reports missing or malformed essentials at startup.

Answers necessarily ship to the browser because checking happens locally. The game does not present the developer explanation in normal play; the explanation is only surfaced by local developer mode.

## Manual play checklist

- Start in a fresh browser profile; entry 01 should load.
- Solve each entry in order and confirm the address updates as you progress.
- On entry 02, read `direction=right`; on entry 07, read `edge=last`; on entry 10, use both query values.
- Reveal hints one at a time, reload, and confirm the revealed count persists.
- Enter a wrong response and confirm the page gives short guidance without advancing.
- Reload midway through the run; progress should return to the current entry.
- Use the period button on entry 09 by mouse and keyboard.
- Finish entry 10, then reset and confirm the run starts over.
- With debug mode enabled, jump between entries, inspect solutions, skip, and clear the save. With it disabled, confirm the panel is absent.
- Check a narrow mobile viewport and keyboard focus visibility.
