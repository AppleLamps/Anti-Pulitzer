import Link from "next/link";

import { Seal } from "@/components/ui/Seal";
import { hero, masthead } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative">
      <div className="content-container pt-10 pb-16 md:pt-14 md:pb-24">
        {/* Grand nameplate */}
        <div className="masthead-rule" />
        <div className="dateline flex items-baseline justify-between py-3">
          <span>
            {masthead.volume} · {masthead.edition}
          </span>
          <span className="hidden md:inline">{masthead.established}</span>
        </div>
        <h1 className="text-center font-heading text-5xl uppercase leading-[0.9] tracking-[-0.01em] text-foreground sm:text-6xl md:text-7xl">
          {hero.title}
        </h1>
        <p className="mt-3 text-center font-heading text-lg italic text-muted-foreground md:text-xl">
          {hero.tagline}
        </p>
        <div className="masthead-rule mt-5" />

        {/* Lead story */}
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-7 md:pr-10">
            <p className="kicker">{hero.kicker}</p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.03] tracking-tight md:text-5xl">
              <span className="text-muted-foreground">{hero.statement.lead}</span>{" "}
              <span className="text-foreground">{hero.statement.turn}</span>
            </h2>
            <p className="drop-cap mt-7 max-w-prose text-lg leading-relaxed text-muted-foreground">
              {hero.standfirst}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                {hero.primaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {hero.secondaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <aside className="md:col-span-5 md:border-l md:border-border/70 md:pl-10">
            <div className="flex flex-col items-center border border-gold/20 bg-card/30 px-6 py-8">
              <Seal className="size-28" />
              <p className="dateline mt-5 text-center text-gold/70">
                {masthead.motto}
              </p>
            </div>

            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="kicker">Notice</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {hero.status}
              </p>
            </div>

            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="kicker">In this issue</p>
              <ul className="mt-2 divide-y divide-border/60">
                {hero.index.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between gap-4 py-2.5"
                    >
                      <span className="font-heading text-base text-foreground transition-colors group-hover:text-gold">
                        {item.label}
                      </span>
                      <span className="shrink-0 text-right text-xs italic text-muted-foreground">
                        {item.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
