# CLAUDE.md

Project guide for Claude and other coding agents working on **The Anti-Pulitzer** website.

## Project summary

**The Anti-Pulitzer** is a public website for an accountability award that is the inverse of the Pulitzer Prize. It highlights journalism that fails the public: factual negligence, victim-blaming, undisclosed conflicts, and harm disproportionate to public interest.

This repo is a **static marketing scaffold** (v1). It explains the mission and holds placeholder pages for nominations and winners. Nothing is wired to a database or backend yet.

**Origin context:** The concept gained public attention after calls (including from Bill Ackman) for an institution that names bad journalism as clearly as the Pulitzer names good journalism. The site itself does not reference specific controversies in its placeholder copy.

## Current site map

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | Live ... Hero, pillars, how-it-works |
| `/about` | `app/about/page.tsx` | Live ... mission, is/is-not lists |
| `/criteria` | `app/criteria/page.tsx` | Live ... four draft categories |
| `/nominate` | `app/nominate/page.tsx` | Placeholder ... "Nominations Opening Soon" |
| `/archive` | `app/archive/page.tsx` | Placeholder ... "No Winners Announced Yet" |

## Tech stack

- **Next.js 16.2+** ... App Router, TypeScript, Turbopack default
- **React 19**
- **Tailwind CSS v4** ... theme tokens in `app/globals.css`
- **shadcn/ui** (Radix) ... `button`, `card`, `separator`, `badge` in `components/ui/`
- **Fonts** ... Fraunces (`font-heading`) + Inter (`font-sans`) in `app/layout.tsx`
- **Node.js 20.9+** required

## Key files

| File | Role |
|------|------|
| `lib/site.ts` | **All user-facing copy**, nav links, metadata helper `createPageMetadata()` |
| `app/globals.css` | Dark editorial theme (charcoal + muted gold `#c9a84c`) |
| `app/layout.tsx` | Root layout, fonts, default SEO metadata, Header + Footer wrapper |
| `components/layout/Header.tsx` | Client component ... mobile nav, `usePathname()` active links |
| `components/layout/Footer.tsx` | Disclaimer, copyright, placeholder social links |
| `components/ui/EmptyState.tsx` | Reusable coming-soon / empty archive block |
| `components/ui/SectionHeading.tsx` | Consistent section titles with gold rule |
| `public/logo.svg` | Inverted trophy mark |

## Architecture

```
lib/site.ts  -->  pages (app/*/page.tsx)  -->  section components (components/home/*)
              -->  Header / Footer
              -->  metadata via createPageMetadata()
```

All routes are **static Server Components**. Only `Header.tsx` is a client component (`"use client"`).

## Conventions

### Copy

- **Edit `lib/site.ts` first** for any text changes. Do not scatter copy across components.
- **No em dashes** in user-facing text. Use ellipses: `...` (e.g. "the failure... no vague hand-waving").
- **Tone:** formal institution, editorial, serious. Not meme-like or partisan.
- **Disclaimer:** footer always reflects "Opinion and criticism; not legal findings."

### Styling

- Use existing utilities: `content-container`, `editorial-rule`, `font-heading`, `text-gold`
- Dark theme is always on (CSS variables in `:root`, not a light/dark toggle)
- Match shadcn token names (`background`, `foreground`, `muted-foreground`, `primary` = gold)

### Next.js 16

- Use `export const metadata` / `createPageMetadata()` ... not `next/head`
- `npm run lint` is separate from `npm run build`
- No `middleware.ts` ... v16 uses `proxy.ts` if edge routing is ever needed (out of scope now)
- Static pages: no async `params`, `cookies()`, or `headers()` required in v1
- `useRef()` needs an initial value in React 19

### Adding features later

| Feature | Suggested approach |
|---------|-------------------|
| Archive winners | Add data file or CMS; render cards in `app/archive/page.tsx` |
| Nominations | Form + Server Action or external service; replace `EmptyState` on nominate page |
| Deploy | Vercel ... zero config for Next.js App Router |

## Commands

```bash
npm run dev      # Turbopack dev server, port 3000
npm run lint     # ESLint
npm run build    # Production build (all routes static)
npm run start    # Serve build
```

## Out of scope unless explicitly requested

- Winner data or archive entries
- Nomination backend / forms
- Database, auth, CMS, analytics
- Editing `AGENTS.md` Next.js agent-rules block (managed by create-next-app)
- Em dashes in copy

## See also

- [`README.md`](README.md) ... full project overview for humans
- [`AGENTS.md`](AGENTS.md) ... Next.js 16 agent rules
