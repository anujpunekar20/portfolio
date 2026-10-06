# Portfolio

Anuj Punekar's personal site: work experience, projects, and a playable Tetris. Live at **[anujpunekar.vercel.app](https://anujpunekar.vercel.app)**.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [`@anuj20/void-ui`](https://www.npmjs.com/package/@anuj20/void-ui) for UI components, a dark, brutalist React library I maintain
- CSS Modules themed against void-ui's `--void-*` custom properties (no Tailwind)
- [Resend](https://resend.com) REST API for the contact form
- Deployed on [Vercel](https://vercel.com)

## Features

- **Command palette** (`Ctrl/Cmd + K`): the site's only section navigation
- **Tetris**: plain DOM blocks over the page, with high score, next-piece preview, ghost piece, and touch controls. Hit **▶ PLAY**.
- **Achievements**: once-per-browser trophies (try the Konami code)
- **XP bar**: shows scroll progress through the sections
- **Contact form** with server-side validation and a honeypot, plus a [Book a call](https://cal.com/anuj-punekar) link

## Running locally

Requires Node 24 and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The contact form needs a Resend key in `.env.local`:

```bash
RESEND_API_KEY=re_...
```

## Checks

CI (`.github/workflows/checks.yml`) runs these on every PR:

```bash
pnpm format:check
pnpm lint
pnpm exec next typegen && pnpm exec tsc --noEmit
node lib/tetris.check.ts
```

## Project layout

```
app/          routes, root layout, 404, OG image, /api/contact
components/   one folder per component (Component.tsx + Component.module.css)
lib/          content data, Tetris logic, achievements, window event names
```

Site content (jobs, projects, skills) lives in `lib/data.ts`.

## Deployment

Merges to `main` deploy to production automatically. PRs get Vercel preview deployments.
