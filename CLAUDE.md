# CLAUDE.md

Project guide for Claude and other coding agents working on **The Anti-Pulitzer** website.

## Project summary

**The Anti-Pulitzer** is a public website for an accountability award that is the inverse of the Pulitzer Prize. It highlights journalism that fails the public: factual negligence, victim-blaming, undisclosed conflicts, and harm disproportionate to public interest.

The site accepts public nominations, stores them in Neon Postgres, and lets an admin panel publish approved entries to a public archive.

**Origin context:** The concept gained public attention after calls (including from Bill Ackman) for an institution that names bad journalism as clearly as the Pulitzer names good journalism. The site itself does not reference specific controversies in its placeholder copy.

## Current site map

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | Live ... Hero, pillars, how-it-works, closing |
| `/about` | `app/about/page.tsx` | Live ... mission, is/is-not lists |
| `/criteria` | `app/criteria/page.tsx` | Live ... four grounds for censure |
| `/nominate` | `app/nominate/page.tsx` | Live ... nomination form + file uploads |
| `/archive` | `app/archive/page.tsx` | Live ... dynamic ledger from Neon `winners` table |
| `/admin` | `app/admin/page.tsx` | Live ... panel review (password-protected) |
| `/admin/login` | `app/admin/login/page.tsx` | Live ... admin sign-in |

## Tech stack

- **Next.js 16.2+** ... App Router, TypeScript, Turbopack default
- **React 19**
- **Tailwind CSS v4** ... theme tokens in `app/globals.css`
- **shadcn/ui** (Radix) ... `button`, `card`, `separator`, `badge` in `components/ui/`
- **Fonts** ... Fraunces (`font-heading`), Newsreader (`font-sans`), IBM Plex Mono (`font-mono`) in `app/layout.tsx`
- **Neon Postgres** ... Drizzle ORM (`drizzle/schema.ts`, `lib/db.ts`)
- **Upstash Redis** ... nomination rate limiting (`lib/ratelimit.ts`)
- **Vercel Blob** ... nomination file uploads (`lib/uploads.ts`)
- **Node.js 20.9+** required

## Key files

| File | Role |
|------|------|
| `lib/site.ts` | **All user-facing copy**, nav links, metadata helper `createPageMetadata()` |
| `drizzle/schema.ts` | `nominations` (private) and `winners` (public) tables |
| `lib/db.ts` | Neon + Drizzle client |
| `lib/data/winners.ts` | Fetches published archive entries |
| `lib/data/nominations.ts` | Admin queries for pending nominations |
| `app/actions/nominations.ts` | Public nomination Server Action |
| `app/actions/admin.ts` | Login, reject, spam, publish Server Actions |
| `lib/admin-auth.ts` | Cookie session from `ADMIN_PASSWORD` |
| `lib/uploads.ts` | Vercel Blob upload helpers |
| `lib/env.ts` | Reads Neon, Upstash, Blob env vars (supports Vercel-prefixed names) |
| `components/nominate/NominationForm.tsx` | Client nomination form |
| `components/nominate/AttachmentPicker.tsx` | Multi-file upload UI |
| `components/admin/NominationReviewList.tsx` | Panel review cards |
| `app/globals.css` | Dark editorial theme (charcoal + muted gold `#c9a84c`) |
| `app/layout.tsx` | Root layout, fonts, default SEO metadata, Header + Footer wrapper |
| `components/layout/Header.tsx` | Client component ... mobile nav, `usePathname()` active links |
| `components/ui/PageHeader.tsx` | Interior page masthead |
| `components/ui/GroundsTag.tsx` | Criteria category labels |
| `components/ui/Seal.tsx` | Institutional emblem |
| `public/logo.svg` | Inverted trophy mark |

## Architecture

```
lib/site.ts  -->  pages (app/*/page.tsx)  -->  section components
              -->  Header / Footer
              -->  metadata via createPageMetadata()

nominate form  -->  app/actions/nominations.ts  -->  Neon (nominations)
                 -->  Upstash (rate limit)
                 -->  Vercel Blob (attachments)

admin panel    -->  app/actions/admin.ts  -->  Neon (nominations + winners)
archive page   -->  lib/data/winners.ts   -->  Neon (winners)
```

- `/archive` and `/admin` are **dynamic** (`force-dynamic` or auth-dependent)
- Marketing pages are static Server Components
- Client components: `Header.tsx`, `NominationForm`, `AttachmentPicker`, admin forms

## Conventions

### Copy

- **Edit `lib/site.ts` first** for any text changes. Do not scatter copy across components.
- **No em dashes** in user-facing text. Use ellipses: `...`
- **Tone:** formal institution, editorial, serious. Not meme-like or partisan.
- **Disclaimer:** footer always reflects "Opinion and criticism; not legal findings."

### Styling

- Use existing utilities: `content-container`, `editorial-rule`, `masthead-rule`, `kicker`, `dateline`, `font-heading`, `text-gold`
- Dark theme is always on (CSS variables in `:root`, not a light/dark toggle)
- Match shadcn token names (`background`, `foreground`, `muted-foreground`, `primary` = gold)

### Data

- **Grounds enum** in `drizzle/schema.ts` must match `criteriaItems[].tag` in `lib/site.ts`: Accuracy, Fairness, Disclosure, Proportionality
- Nominations are private until reviewed; winners are public
- Publishing copies nomination data into `winners` and sets nomination status to `accepted`

### Next.js 16

- Use `export const metadata` / `createPageMetadata()` ... not `next/head`
- `npm run lint` is separate from `npm run build`
- Server Actions body limit is `52mb` in `next.config.ts` (`experimental.serverActions.bodySizeLimit`)
- `cookies()`, `headers()`, `params`, and `searchParams` are async in server contexts
- `useRef()` needs an initial value in React 19

## Commands

```bash
npm run dev         # Turbopack dev server, port 3000
npm run lint        # ESLint
npm run build       # Production build
npm run start       # Serve build
npm run db:push     # Sync Drizzle schema to Neon
npm run db:studio   # Drizzle Studio
```

## Environment

See `.env.example`. Required for full functionality:

- `DATABASE_URL` (Neon)
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or Vercel-prefixed Upstash vars)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob)
- `ADMIN_PASSWORD` (panel access)

## Out of scope unless explicitly requested

- Public winner detail pages (`/archive/[slug]`)
- Email notifications
- CMS, analytics
- Editing `AGENTS.md` Next.js agent-rules block (managed by create-next-app)
- Em dashes in copy

## See also

- [`README.md`](README.md) ... full project overview for humans
- [`AGENTS.md`](AGENTS.md) ... Next.js 16 agent rules
