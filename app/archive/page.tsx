import Link from "next/link";

import { GroundsTag } from "@/components/ui/GroundsTag";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPublishedWinners } from "@/lib/data/winners";
import {
  archiveGroundsNote,
  createPageMetadata,
  criteriaItems,
  emptyStates,
} from "@/lib/site";

export const metadata = createPageMetadata(
  "Archive",
  "Browse Anti-Pulitzer recipients once announcements begin.",
);

/** Fetch published winners from Neon on each request. */
export const dynamic = "force-dynamic";

const ledgerColumns = ["No.", "Outlet / Work", "Date", "Grounds"];

export default async function ArchivePage() {
  const archiveEntries = await getPublishedWinners();
  const record = emptyStates.archive;

  return (
    <div className="content-container py-14 md:py-20">
      <PageHeader
        kicker={record.label}
        title="Registry of censure"
        standfirst="Recipients are entered here in full... the work, the outlet, and the documented grounds. Nothing is added without a public record behind it."
        folio="The archive"
      />

      <div className="mt-14">
        {/* Ledger head */}
        <div className="hidden grid-cols-[4rem_1fr_7rem_13rem] gap-6 border-y border-gold/30 py-3 md:grid">
          {ledgerColumns.map((col) => (
            <span key={col} className="dateline">
              {col}
            </span>
          ))}
        </div>

        {archiveEntries.length > 0 ? (
          <ul>
            {archiveEntries.map((entry) => (
              <li
                key={entry.no}
                className="grid gap-2 border-b border-border/70 py-6 md:grid-cols-[4rem_1fr_7rem_13rem] md:items-baseline md:gap-6"
              >
                <span className="index-numeral text-2xl text-gold/50">
                  {entry.no}
                </span>
                <div>
                  <p className="font-heading text-lg text-foreground">
                    {entry.outlet}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.work}
                  </p>
                </div>
                <span className="dateline">{entry.date}</span>
                <div className="flex flex-wrap gap-1.5">
                  {entry.grounds.map((g) => (
                    <GroundsTag key={g}>{g}</GroundsTag>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          /* Empty first entry */
          <div className="border-b border-border/70 py-20 text-center md:py-24">
            <p className="index-numeral text-6xl text-gold/20">000</p>
            <p className="mt-6 font-heading text-2xl text-foreground md:text-3xl">
              {record.heading}
            </p>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {record.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {record.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:text-foreground"
                >
                  {link.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 font-mono text-[0.68rem] tracking-wide text-muted-foreground">
          {record.status} · Entries are permanent once published.
        </p>
      </div>

      {/* The grounds key: the vocabulary the Grounds column draws from. */}
      <div className="mt-16 border-t border-gold/20 pt-8">
        <p className="kicker">The grounds</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {archiveGroundsNote}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {criteriaItems.map((item) => (
            <GroundsTag key={item.tag}>{item.tag}</GroundsTag>
          ))}
        </div>
        <Link
          href="/criteria"
          className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:text-foreground"
        >
          Read the criteria <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
