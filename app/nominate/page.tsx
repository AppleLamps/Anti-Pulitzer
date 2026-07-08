import { EmptyState } from "@/components/ui/EmptyState";
import { createPageMetadata, emptyStates } from "@/lib/site";

export const metadata = createPageMetadata(
  "Nominate",
  "Submit nominations for the Anti-Pulitzer when the process opens.",
);

export default function NominatePage() {
  return (
    <EmptyState
      label={emptyStates.nominate.label}
      status={emptyStates.nominate.status}
      heading={emptyStates.nominate.heading}
      body={emptyStates.nominate.body}
      links={emptyStates.nominate.links}
    />
  );
}
