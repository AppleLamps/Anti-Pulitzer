import { Check, X } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent, createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
  "About",
  "Learn about the mission and purpose of The Anti-Pulitzer.",
);

export default function AboutPage() {
  return (
    <div className="content-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-16">
        <SectionHeading
          eyebrow="About"
          title="The inverse of excellence"
          description="Where the Pulitzer honors what journalism should be, the Anti-Pulitzer documents what it must not become."
        />

        <div className="space-y-6 text-muted-foreground">
          {aboutContent.mission.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-lg leading-relaxed text-foreground/90 md:text-xl"
                  : "text-base leading-relaxed"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-2">
          <div className="space-y-5 bg-background p-8">
            <h2 className="font-heading text-lg text-gold">What it is</h2>
            <ul className="space-y-4">
              {aboutContent.isList.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <Check
                    className="mt-1 size-4 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5 bg-background p-8">
            <h2 className="font-heading text-lg text-muted-foreground">
              What it is not
            </h2>
            <ul className="space-y-4">
              {aboutContent.isNotList.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <X
                    className="mt-1 size-4 shrink-0 text-muted-foreground/60"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
