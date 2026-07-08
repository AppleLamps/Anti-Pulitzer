import Link from "next/link";

import { EmptyState } from "@/components/ui/EmptyState";
import { NominationForm } from "@/components/nominate/NominationForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { hasDatabase } from "@/lib/env";
import {
  createPageMetadata,
  emptyStates,
  nominateContent,
} from "@/lib/site";

export const metadata = createPageMetadata(
  "Nominate",
  "Submit nominations for reporting that fails the published Anti-Pulitzer criteria.",
);

export default function NominatePage() {
  const isOpen = hasDatabase();

  if (!isOpen) {
    const record = emptyStates.nominate;
    return (
      <EmptyState
        label={record.label}
        status={record.status}
        heading={record.heading}
        body={record.body}
        links={record.links}
      />
    );
  }

  return (
    <div className="content-container py-14 md:py-20">
      <PageHeader
        kicker={nominateContent.label}
        title={nominateContent.title}
        standfirst={nominateContent.standfirst}
        folio="Nominate"
      />

      <div className="mt-10 flex items-center justify-between gap-4 border-b border-border/70 pb-6">
        <p className="dateline">{nominateContent.status}</p>
        <Link
          href="/criteria"
          className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold hover:text-foreground"
        >
          Read the criteria
        </Link>
      </div>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {nominateContent.intro}
      </p>

      <div className="mt-12">
        <NominationForm />
      </div>
    </div>
  );
}
