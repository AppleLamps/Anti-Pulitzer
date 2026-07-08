import Link from "next/link";

import { Seal } from "@/components/ui/Seal";
import { closing } from "@/lib/site";

export function Closing() {
  return (
    <section className="border-t border-gold/20 bg-card/20">
      <div className="content-container py-20 md:py-28">
        <div className="masthead-rule" />
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-8 md:pr-12">
            <p className="kicker">{closing.eyebrow}</p>
            <blockquote className="mt-6 font-heading text-3xl leading-snug text-foreground md:text-4xl">
              <em>&ldquo;{closing.quote}&rdquo;</em>
            </blockquote>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={closing.primaryCta.href}
                className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                {closing.primaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href={closing.secondaryCta.href}
                className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {closing.secondaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="flex items-start md:col-span-4 md:justify-center md:border-l md:border-border/70 md:pl-12">
            <Seal className="size-24 opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}
