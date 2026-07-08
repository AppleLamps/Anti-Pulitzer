import { PageHeader } from "@/components/ui/PageHeader";
import { aboutContent, createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
  "About",
  "Learn about the mission and purpose of The Anti-Pulitzer.",
);

export default function AboutPage() {
  return (
    <div className="content-container py-14 md:py-20">
      <PageHeader
        kicker="About"
        title="The inverse of excellence"
        standfirst="Where the Pulitzer honors what journalism should be, the Anti-Pulitzer documents what it must not become."
        folio="The mission"
      />

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-0">
        <div className="md:col-span-7 md:pr-12">
          {aboutContent.mission.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "drop-cap text-lg leading-relaxed text-foreground/90 md:text-xl"
                  : "mt-6 text-base leading-relaxed text-muted-foreground"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid gap-10 md:col-span-5 md:grid-cols-2 md:gap-0 md:border-l md:border-border/70 md:pl-12">
          <div className="md:pr-6">
            <p className="kicker">What it is</p>
            <ul className="mt-5 border-t border-border/70">
              {aboutContent.isList.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-border/60 py-4 text-sm leading-relaxed text-foreground/90"
                >
                  <span className="mt-0.5 text-gold" aria-hidden="true">
                    &mdash;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-border/70 md:pl-6">
            <p className="font-mono text-[0.7rem] font-medium uppercase leading-none tracking-[0.26em] text-muted-foreground">
              What it is not
            </p>
            <ul className="mt-5 border-t border-border/70">
              {aboutContent.isNotList.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-border/60 py-4 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 text-muted-foreground/50" aria-hidden="true">
                    &mdash;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
