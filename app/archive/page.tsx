import { EmptyState } from "@/components/ui/EmptyState";
import { createPageMetadata, emptyStates } from "@/lib/site";

export const metadata = createPageMetadata(
  "Archive",
  "Browse Anti-Pulitzer recipients once announcements begin.",
);

export default function ArchivePage() {
  return (
    <EmptyState
      label={emptyStates.archive.label}
      status={emptyStates.archive.status}
      heading={emptyStates.archive.heading}
      body={emptyStates.archive.body}
      links={emptyStates.archive.links}
    />
  );
}
