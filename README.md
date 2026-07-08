# The Anti-Pulitzer

A public-facing website for **The Anti-Pulitzer**, an accountability project that highlights journalism failing the public... the inverse of the Pulitzer Prize.

Where the Pulitzer honors excellence in reporting, the Anti-Pulitzer names and documents the worst of the worst: stories, outlets, and practices that betray public trust. The site is a formal institution in tone, not a meme or partisan attack page.

## What this website is

The Anti-Pulitzer website is a marketing and information scaffold for a future award program. It explains the mission, publishes draft evaluation criteria, and reserves space for nominations and winners once those processes go live.

**Current status (v1):** placeholder content only. No winners, no nomination form, no backend.

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, mission pillars, planned process overview |
| About | `/about` | Mission statement; what the project is and is not |
| Criteria | `/criteria` | Draft categories for evaluating bad journalism |
| Nominate | `/nominate` | "Nominations Opening Soon" placeholder |
| Archive | `/archive` | Empty state until first recipients are announced |

### Mission pillars

1. **Transparency** ... name the work, the outlet, and the failure
2. **Accountability** ... journalism that shields power while attacking the vulnerable deserves to be remembered
3. **Public Harm** ... focus on reporting that damages truth, victims, or democratic discourse

### Planned process (not yet live)

1. **Nominate** ... public submissions of failing reporting
2. **Review** ... independent panel evaluates against published criteria
3. **Announce** ... recipients named with documented reasoning and sources

### What it is / is not

**It is:**

- A cultural accountability project focused on journalistic failure
- A permanent public record of work that meets published criteria
- An invitation for outlets to do better... or face lasting reputational consequence

**It is not:**

- A legal adjudication or finding of fact
- A substitute for courts, regulators, or internal newsroom review
- A partisan attack on journalism as a profession

Footer disclaimer on all pages: *Opinion and criticism; not legal findings.*

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2+ (App Router, TypeScript) |
| Runtime | React 19 |
| Bundler | Turbopack (default) |
| Styling | Tailwind CSS v4 + CSS variables |
| Components | shadcn/ui (Radix base) |
| Fonts | Fraunces (headlines) + Inter (body) via `next/font/google` |

No database, auth, CMS, or API routes in v1.

## Getting started

**Requirements:** Node.js 20.9+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Turbopack dev server |
| `npm run build` | Production build (static pages) |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint (separate from build in Next.js 16) |

## Project structure

```
anti-Pulitzer/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout, fonts, metadata, Header/Footer
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── criteria/page.tsx
│   ├── nominate/page.tsx
│   └── archive/page.tsx
├── components/
│   ├── layout/             # Header (client), Footer
│   ├── home/               # Hero, Pillars, HowItWorks
│   └── ui/                 # shadcn primitives + SectionHeading, EmptyState
├── lib/
│   └── site.ts             # All site copy, nav links, metadata helpers
└── public/
    └── logo.svg            # Site mark
```

## Content and copy

**Single source of truth:** [`lib/site.ts`](lib/site.ts)

All user-facing text (headlines, descriptions, nav labels, empty states, criteria) lives in `lib/site.ts`. Pages and components import from there; do not hardcode marketing copy in components.

**Style rules:**

- Use ellipses (`...`) instead of em dashes in body copy
- Tone: formal, editorial, institutional... not snarky or meme-like
- Do not name specific stories, outlets, or people in placeholder copy unless adding real archive entries

## Design system

Defined in [`app/globals.css`](app/globals.css):

- **Background:** `#0f0f0f` (near-black charcoal)
- **Foreground:** `#f5f0e8` (warm off-white)
- **Accent:** `#c9a84c` (muted gold)
- **Layout:** `content-container` utility (max-width ~72rem), `editorial-rule` gold dividers

## What's out of scope (v1)

- Winner entries or archive data
- Nomination forms or email capture
- CMS, database, API routes
- Analytics, newsletter, authentication
- Vercel deployment config (can be added later)

## Documentation for agents

- [`CLAUDE.md`](CLAUDE.md) ... project context and conventions for Claude / Cursor
- [`AGENTS.md`](AGENTS.md) ... coding-agent rules including Next.js 16 guidance

## License

Private project. All rights reserved.
