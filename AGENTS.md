# AGENTS.md

Guidance for coding agents working in this repository.

## About this project

**The Anti-Pulitzer** (`anti-pulitzer`) is a Next.js 16 marketing site for an accountability award that documents journalism failing the public... the inverse of the Pulitzer Prize.

- **v1 scope:** static placeholder pages only (no winners, no nomination backend)
- **Copy source of truth:** `lib/site.ts`
- **Copy style:** use ellipses (`...`) not em dashes; formal editorial tone
- **Full context:** read [`CLAUDE.md`](CLAUDE.md) and [`README.md`](README.md) before making changes

### Routes

`/` (home), `/about`, `/criteria`, `/nominate` (coming soon), `/archive` (empty)

### Structure

- `app/` ... App Router pages and `globals.css` theme
- `components/layout/` ... Header (client), Footer
- `components/home/` ... Hero, Pillars, HowItWorks
- `components/ui/` ... shadcn primitives + EmptyState, SectionHeading
- `lib/site.ts` ... all marketing copy and nav config

## Project conventions

1. Put user-facing text in `lib/site.ts`, not inline in components.
2. Prefer Server Components; only `Header.tsx` needs `"use client"`.
3. Use existing design tokens (`text-gold`, `font-heading`, `content-container`, `editorial-rule`).
4. Run `npm run lint` after edits (lint is not part of `next build` in Next.js 16).
5. Do not add database, auth, or API routes unless explicitly requested.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes... APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Key Next.js 16 points for this repo:

- Turbopack is the default bundler (`next dev`, `next build`)
- `next build` does not run ESLint; use `npm run lint`
- App Router metadata via `export const metadata`, not `next/head`
- `middleware.ts` is renamed to `proxy.ts` in v16
- `cookies()`, `headers()`, `params`, and `searchParams` are async in server contexts
- `useRef()` requires an initial value in React 19
<!-- END:nextjs-agent-rules -->
