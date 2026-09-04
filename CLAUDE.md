# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

Anuj's personal portfolio site: work experience, projects, mini-games, and other fun things. A separate project from `~/FORCE` (Laravel/Vue) — no shared conventions apply.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js, App Router, TypeScript |
| UI components | `@anuj20/void-ui` (npm package, published — not local-linked) |
| Layout/page styling | Plain CSS Modules |
| Deployment | Vercel |

### Why this stack

- void-ui is a React library, so Next.js is the natural fit — no adapter needed (`peerDependencies: react >=18, react-dom >=18`).
- App Router gives clean route-per-page structure (experience / projects / games), and lets mini-games live as isolated client components (`'use client'`) without pulling client-only code into the rest of the site.
- No CMS — project/experience data is small and changes rarely, so it lives in typed local data files (`.ts`/`.json`), not a headless CMS.
- No Tailwind — void-ui already exposes `--void-*` CSS custom properties as its theming contract; portfolio-specific layout (hero, grids, game containers) uses CSS Modules (built into Next.js) and themes against those same vars for visual consistency, rather than mixing in a second styling paradigm.

## void-ui

- Source: `~/dev/void-ui`. Dark-first, brutalist React component library Anuj built and maintains — hard-edged, offset shadows, zero border-radius, one accent color.
- Install: `npm install @anuj20/void-ui` (peer deps `react`/`react-dom` already satisfied by Next.js).
- Usage:
  ```tsx
  import { Button } from '@anuj20/void-ui';
  import '@anuj20/void-ui/styles'; // once, in the root layout — CSS is not auto-injected
  ```
- Components available: `Button`, `Badge`, `Input`, `Textarea`, `Card`, `Spinner`, `Select`, `Option`, `Checkbox`, `Toggle`, `Dropdown`, `Tooltip`.
- Theming: override `--void-*` CSS custom properties on `:root` — no rebuild required. Match these when writing custom CSS Modules for portfolio-specific layout, so the site and the library read as one coherent visual system.
- Consumed as the published npm package, not `npm link`'d — if void-ui needs a new component or a fix while building the site, make the change in `~/dev/void-ui`, publish, then bump the version here. (Switch to a local link instead if that back-and-forth gets tedious.)

## Mini-games

One game: Tetris, plain DOM (`position: fixed` blocks over the page, no canvas), triggered by a floating "▶ PLAY" button. No game-select menu since there's only one game. Pong was considered and dropped to keep scope small. Default to canvas or plain DOM for simple games — only reach for a library (three.js, a physics engine) if a future game actually needs it.

## Status

Scaffolded (Next.js App Router, TypeScript), Tailwind removed, `@anuj20/void-ui` installed and wired into `app/layout.tsx`. Design is locked (see `DESIGN.md`, not committed — local reference only) and being built section by section, one PR per section, onto `app/page.tsx`. Custom CSS Modules use `rem` for font-size/spacing/layout widths (matches DESIGN.md's px values 1:1 at the default 16px root), except hairline borders and the Tetris block grid, which stay in raw `px`. Mini-games: only Tetris ships (see Mini-games section below).
