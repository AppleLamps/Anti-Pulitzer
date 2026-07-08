import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/lib/site";

export function HowItWorks() {
  return (
    <section className="content-container py-20 md:py-24">
      <div className="space-y-14">
        <SectionHeading
          eyebrow="Process"
          title="How it will work"
          description="A transparent pipeline from public nomination to public announcement."
        />

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {howItWorks.map((item, index) => (
            <li key={item.title} className="relative space-y-4 pt-8">
              <span className="absolute top-0 left-0 h-px w-full bg-border" />
              <span className="absolute top-0 left-0 h-px w-12 bg-gold" />

              <div className="flex items-baseline justify-between gap-4">
                <span className="index-numeral text-4xl text-gold/40">
                  {item.step}
                </span>
                <Badge
                  variant="outline"
                  className="border-gold/25 text-[0.65rem] tracking-widest text-gold/80 uppercase"
                >
                  {item.status}
                </Badge>
              </div>

              <h3 className="font-heading text-2xl text-foreground">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {index < howItWorks.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 -right-4 hidden text-gold/30 md:block"
                >
                  &rarr;
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
