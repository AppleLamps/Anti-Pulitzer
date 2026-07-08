import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Seal } from "@/components/ui/Seal";
import { hero } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="content-container pt-14 pb-20 md:pt-20 md:pb-28">
        {/* Status line */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-card/50 px-4 py-1.5 text-xs tracking-wide text-muted-foreground">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
            </span>
            {hero.status}
          </span>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <Seal className="size-24 md:size-28" />

          <p className="mt-8 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 font-heading text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {hero.title}
          </h1>

          <div className="masthead-rule mx-auto mt-8 max-w-sm" />

          <p className="mt-8 font-heading text-xl leading-snug text-muted-foreground md:text-2xl">
            <em>{hero.tagline}</em>
          </p>

          {/* The inverse statement */}
          <p className="mt-10 max-w-xl text-base leading-relaxed md:text-lg">
            <span className="text-muted-foreground">{hero.statement.lead}</span>{" "}
            <span className="text-foreground">{hero.statement.turn}</span>
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/85"
            >
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:bg-gold/10 hover:text-gold"
            >
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
