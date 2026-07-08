# AGENTS.md

Guidance for coding agents working in this repository.

## About this project

**The Anti-Pulitzer** (`anti-pulitzer`) is a Next.js 16 site for an accountability award that documents journalism failing the public... the inverse of the Pulitzer Prize.

- **Current scope:** live nomination form, Neon database, admin review panel, dynamic archive
- **Copy source of truth:** `lib/site.ts`
- **Copy style:** use ellipses (`...`) not em dashes; formal editorial tone
- **Full context:** read [`CLAUDE.md`](CLAUDE.md) and [`README.md`](README.md) before making changes

### Routes

`/` (home), `/about`, `/criteria`, `/nominate` (form), `/archive` (Neon ledger), `/admin` + `/admin/login` (panel, not in nav)

### Structure

- `app/` ... App Router pages, Server Actions, `globals.css`
- `app/actions/` ... `nominations.ts`, `admin.ts`
- `app/admin/` ... panel review and login
- `components/nominate/` ... `NominationForm`, `AttachmentPicker`
- `components/admin/` ... review UI
- `components/layout/` ... Header (client), Footer
- `components/home/` ... Hero, Pillars, HowItWorks, Closing
- `components/ui/` ... shadcn + PageHeader, Seal, GroundsTag, EmptyState, SectionHeading
- `drizzle/schema.ts` ... `nominations`, `winners` tables
- `lib/site.ts` ... marketing copy and nav config
- `lib/db.ts`, `lib/data/`, `lib/uploads.ts`, `lib/ratelimit.ts`, `lib/admin-auth.ts`

## Project conventions

1. Put user-facing text in `lib/site.ts`, not inline in components.
2. Prefer Server Components; client components only where needed (forms, Header, attachment previews).
3. Use existing design tokens (`text-gold`, `font-heading`, `content-container`, `editorial-rule`, `kicker`, `dateline`).
4. Run `npm run lint` after edits (lint is not part of `next build` in Next.js 16).
5. Keep `criteriaItems[].tag` in sync with the `grounds` enum in `drizzle/schema.ts`.
6. Never expose pending nominations on public routes.

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
- Server Actions body size limit is configured via `experimental.serverActions.bodySizeLimit` in `next.config.ts`
<!-- END:nextjs-agent-rules -->
