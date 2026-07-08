import { PageHeader } from "@/components/ui/PageHeader";
import {
  criteriaEvidence,
  criteriaItems,
  criteriaLead,
  criteriaNote,
  createPageMetadata,
} from "@/lib/site";

export const metadata = createPageMetadata(
  "Criteria",
  "Draft evaluation criteria for Anti-Pulitzer nominations.",
);

export default function CriteriaPage() {
  return (
    <div className="content-container py-14 md:py-20">
      <PageHeader
        kicker="Standards"
        title="Grounds for censure"
        standfirst="Submissions are assessed against four categories. Each requires documented evidence and public source material."
        folio="The criteria"
      />

      {/* Lead + evidence standard */}
      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-0">
        <div className="md:col-span-8 md:pr-12">
          <p className="drop-cap text-lg leading-relaxed text-foreground/90 md:text-xl">
            {criteriaLead}
          </p>
        </div>
        <aside className="md:col-span-4 md:border-l md:border-border/70 md:pl-12">
          <p className="kicker">Evidence standard</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {criteriaEvidence}
          </p>
        </aside>
      </div>

      {/* The register of categories */}
      <ol className="mt-16 border-t border-gold/30">
        {criteriaItems.map((item, index) => (
          <li
            key={item.title}
            className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-border/70 py-9 md:gap-x-12 md:py-11"
          >
            <span className="index-numeral text-4xl leading-none text-gold/40 md:text-6xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="kicker whitespace-nowrap">{item.tag}</span>
                <span className="h-px flex-1 bg-border/70" />
              </div>
              <h2 className="mt-4 font-heading text-xl text-foreground md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-5 border-l-2 border-gold/40 pl-4">
                <span className="kicker text-gold/70">The test</span>
                <p className="mt-2 text-sm italic leading-relaxed text-foreground/80">
                  {item.test}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 font-mono text-[0.72rem] tracking-wide text-muted-foreground">
        {criteriaNote}
      </p>
    </div>
  );
}
