# The Anti-Pulitzer

A public-facing website for **The Anti-Pulitzer**, an accountability project that highlights journalism failing the public... the inverse of the Pulitzer Prize.

Where the Pulitzer honors excellence in reporting, the Anti-Pulitzer names and documents the worst of the worst: stories, outlets, and practices that betray public trust. The site is a formal institution in tone, not a meme or partisan attack page.

## What this website is

The Anti-Pulitzer website explains the mission, publishes evaluation criteria, accepts public nominations, and maintains an archive of announced recipients.

**Current status (v2):** nominations are open; admin review and archive publication are live. No public winner detail pages yet.

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, mission pillars, process overview |
| About | `/about` | Mission statement; what the project is and is not |
| Criteria | `/criteria` | Four grounds for censure |
| Nominate | `/nominate` | Public nomination form with file uploads |
| Archive | `/archive` | Published recipients ledger (reads from Neon) |
| Admin | `/admin` | Panel review queue (password-protected, not in nav) |

### Process

1. **Nominate** ... public submits failing reporting with evidence (open)
2. **Review** ... panel reviews pending nominations at `/admin`
3. **Announce** ... approved entries are published to `/archive` with documented reasoning

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
| Fonts | Fraunces (headings), Newsreader (body), IBM Plex Mono (labels) |
| Database | Neon Postgres via Drizzle ORM |
| Rate limiting | Upstash Redis |
| File uploads | Vercel Blob |
| Admin auth | Cookie session via `ADMIN_PASSWORD` |

## Getting started

**Requirements:** Node.js 20.9+

```bash
npm install
cp .env.example .env   # then fill in values
npm run db:push        # sync schema to Neon
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy [`.env.example`](.env.example) to `.env` and configure:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon Postgres connection string |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate limiting (Vercel may use a project prefix) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob for nomination attachments |
| `ADMIN_PASSWORD` | Panel login for `/admin` |

On Vercel, connect the Neon, Upstash, and Blob integrations to the project so env vars are injected automatically. Add `ADMIN_PASSWORD` manually in project settings.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Turbopack dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint (separate from build in Next.js 16) |
| `npm run db:push` | Push Drizzle schema to Neon |
| `npm run db:generate` | Generate migration files |
| `npm run db:studio` | Open Drizzle Studio |

## Project structure

```
anti-Pulitzer/
├── app/
│   ├── actions/            # Server Actions (nominations, admin)
│   ├── admin/              # Panel review + login
│   ├── archive/page.tsx    # Public ledger (dynamic, reads Neon)
│   ├── nominate/page.tsx   # Nomination form
│   └── ...
├── components/
│   ├── admin/              # AdminLoginForm, NominationReviewList
│   ├── nominate/           # NominationForm, AttachmentPicker
│   ├── home/               # Hero, Pillars, HowItWorks, Closing
│   ├── layout/             # Header (client), Footer
│   └── ui/                 # shadcn + PageHeader, Seal, GroundsTag, etc.
├── drizzle/
│   └── schema.ts           # nominations + winners tables
├── lib/
│   ├── site.ts             # All marketing copy
│   ├── db.ts               # Neon client
│   ├── data/               # winners + nominations queries
│   └── ...
└── public/logo.svg
```

## Content and copy

**Single source of truth:** [`lib/site.ts`](lib/site.ts)

All user-facing text lives in `lib/site.ts`. Pages and components import from there.

**Style rules:**

- Use ellipses (`...`) instead of em dashes in body copy
- Tone: formal, editorial, institutional... not snarky or meme-like

## Design system

Defined in [`app/globals.css`](app/globals.css):

- **Background:** `#0f0f0f` (near-black charcoal)
- **Foreground:** `#f5f0e8` (warm off-white)
- **Accent:** `#c9a84c` (muted gold)
- **Layout:** `content-container`, `editorial-rule`, `masthead-rule`, `kicker`, `dateline`

## Deployment

Designed for **Vercel**:

1. Connect Neon, Upstash Redis, and Blob storage integrations
2. Set `ADMIN_PASSWORD` in project env vars
3. Run `npm run db:push` against production Neon (or let first deploy use existing schema)
4. Deploy; `/archive` and `/admin` are dynamic routes

Server Actions accept up to **52 MB** payloads (configured in `next.config.ts`) to support file attachments.

## Documentation for agents

- [`CLAUDE.md`](CLAUDE.md) ... project context and conventions for Claude / Cursor
- [`AGENTS.md`](AGENTS.md) ... coding-agent rules including Next.js 16 guidance

## License

Private project. All rights reserved.
