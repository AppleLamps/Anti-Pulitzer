import Link from "next/link";

import { Button } from "@/components/ui/button";
import { closing } from "@/lib/site";

export function Closing() {
  return (
    <section className="border-t border-border/70 bg-card/25">
      <div className="content-narrow py-20 text-center md:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
          {closing.eyebrow}
        </p>
        <blockquote className="mt-8 font-heading text-2xl leading-snug text-foreground md:text-3xl">
          &ldquo;{closing.quote}&rdquo;
        </blockquote>
        <div className="editorial-rule mx-auto mt-10 max-w-[6rem]" />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/85"
          >
            <Link href={closing.primaryCta.href}>{closing.primaryCta.label}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-muted-foreground hover:bg-gold/10 hover:text-gold"
          >
            <Link href={closing.secondaryCta.href}>
              {closing.secondaryCta.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
