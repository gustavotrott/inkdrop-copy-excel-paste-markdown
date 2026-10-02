# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An [Inkdrop](https://www.inkdrop.app/) plugin (`copy-excel-paste-markdown`) that reads tab-separated cells copied from Excel off the clipboard and inserts them into the active editor as an aligned Markdown table. Installed by users via `ipm install copy-excel-paste-markdown`.

## Commands

```sh
npm install
npm run build          # babel src/ -> lib/
npm run dev            # same, with source maps, in watch mode
npm run lint           # eslint src/ test/
npm test               # build, then node --test test/*.test.js
node --test --test-name-pattern="escapes pipes" test/*.test.js   # single test (run npm run build first)
ipm link               # symlink into Inkdrop's packages dir for manual testing
```

Tests import from `lib/` (CommonJS output), so they only cover what was last built. They test the pure conversion in `src/table.js`; editor/clipboard integration has to be checked in the running Inkdrop app.

Publishing uses the standalone `ipm` CLI (`npm i -g @inkdropapp/ipm-cli`, then `ipm configure` once): `npm version <patch|minor|major>`, `git push --follow-tags`, `ipm publish` (`prepublishOnly` runs the build; `files` in package.json limits the tarball to `lib/` and `menus/`). Use `ipm publish --dry-run` to preview.

## Architecture

- **`src/` is the source; `lib/` is the Babel build output and is committed.** `package.json` `main` points at `./lib/index.js`, so Inkdrop loads `lib/`, not `src/`. Always run `npm run build` after editing `src/` and commit the regenerated `lib/` files with the change.
- `src/index.js` — plugin entry (`activate`/`deactivate`). Registers the `paste-excel-as-markdown` command on `document.body` via the global `inkdrop.commands.add`.
- `src/table.js` — pure TSV → Markdown conversion (no Inkdrop/Electron deps). Handles Excel's quoting of cells containing tabs/newlines/quotes, pads short rows, escapes `|`, turns in-cell newlines into `<br>`. The first row is always the header.
- `src/paste-excel.js` — reads Electron's `clipboard.readText()` and inserts the table into the active editor. **The editor API differs by Inkdrop version:** v4/v5 `inkdrop.getActiveEditor()` returns a wrapper with `.cm` (CodeMirror 5, `cm.replaceSelection`); v6 returns a CodeMirror 6 `EditorView` directly (`view.dispatch(view.state.replaceSelection(...))`). Both paths are kept.
- `menus/paste-excel-as-markdown.json` — *Plugins* menu entry and editor context menu entry. The `.CodeMirror` selector works in v6 too (the CM6 editor element also carries that class).
- `inkdrop` is a runtime global provided by the host app; `electron` is provided by Inkdrop as well (not a dependency).
- Babel targets Electron 3.1.4 (`.babelrc`); `package.json` `engines.inkdrop` declares supported Inkdrop versions (`^4.0.0 || ^5.0.0 || ^6.0.0`) — update it when adding support for a new major Inkdrop version.

## Style

ESLint + Prettier (`.eslintrc.yml`): single quotes, no semicolons, no trailing commas, `prefer-const`.

Add an entry to `CHANGELOG.md` for each release.
