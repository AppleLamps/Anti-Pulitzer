import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/lib/site";

export function Pillars() {
  return (
    <section className="border-t border-gold/20 py-20 md:py-24">
      <div className="content-container space-y-12">
        <SectionHeading
          eyebrow="Mission"
          title="What we stand for"
          description="The Anti-Pulitzer exists to make journalistic failure as visible as journalistic excellence."
        />

        <div className="grid md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="border-t border-border/70 pt-6 first:border-t-0 md:border-t-0 md:border-l md:pt-0 md:pr-6 md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <div className="flex items-baseline gap-3">
                <span className="index-numeral text-2xl text-gold/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl text-foreground">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
