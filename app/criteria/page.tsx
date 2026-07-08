import { SectionHeading } from "@/components/ui/SectionHeading";
import { criteriaItems, criteriaNote, createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
  "Criteria",
  "Draft evaluation criteria for Anti-Pulitzer nominations.",
);

export default function CriteriaPage() {
  return (
    <div className="content-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-14">
        <SectionHeading
          eyebrow="Standards"
          title="Evaluation criteria"
          description="Submissions will be assessed against the following categories. Each requires documented evidence and public source material."
        />

        <ol className="border-t border-border/70">
          {criteriaItems.map((item, index) => (
            <li
              key={item.title}
              className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-border/70 py-8 transition-colors hover:bg-card/40 md:gap-x-10 md:py-10"
            >
              <span className="index-numeral text-4xl leading-none text-gold/40 transition-colors group-hover:text-gold/70 md:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-3">
                <h2 className="font-heading text-xl text-foreground md:text-2xl">
                  {item.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-sm italic text-muted-foreground">{criteriaNote}</p>
      </div>
    </div>
  );
}
