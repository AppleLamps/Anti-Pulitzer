import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/lib/site";

export function Pillars() {
  return (
    <section className="border-t border-border/70 bg-card/25 py-20 md:py-24">
      <div className="content-container space-y-14">
        <SectionHeading
          eyebrow="Mission"
          title="What we stand for"
          description="The Anti-Pulitzer exists to make journalistic failure as visible as journalistic excellence."
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-card/70"
            >
              <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              <span className="index-numeral text-sm text-gold/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-xl text-gold">{pillar.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
