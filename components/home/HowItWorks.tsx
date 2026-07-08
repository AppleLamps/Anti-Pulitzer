import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/lib/site";

export function HowItWorks() {
  return (
    <section className="content-container py-20 md:py-24">
      <div className="space-y-12">
        <SectionHeading
          eyebrow="Process"
          title="How it will work"
          description="A transparent pipeline from public nomination to public announcement."
        />

        <ol className="border-t border-border/70">
          {howItWorks.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 border-b border-border/70 py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="index-numeral text-4xl text-gold/40 md:text-5xl">
                {item.step}
              </span>
              <div>
                <h3 className="font-heading text-2xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <span className="dateline text-gold/70 md:text-right">
                {item.status}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
