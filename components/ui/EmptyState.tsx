import Link from "next/link";

import { Seal } from "@/components/ui/Seal";
import { cn } from "@/lib/utils";

type EmptyStateLink = {
  label: string;
  href: string;
};

type EmptyStateProps = {
  label?: string;
  status?: string;
  heading: string;
  body: string;
  links?: readonly EmptyStateLink[];
  className?: string;
};

export function EmptyState({
  label,
  status,
  heading,
  body,
  links,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn("content-container py-20 md:py-28", className)}
    >
      <div className="mx-auto max-w-3xl border border-gold/25 bg-card/25 p-8 md:p-12">
        <div className="flex items-center justify-between gap-4">
          {label ? <p className="kicker">{label}</p> : null}
          {status ? <span className="dateline">{status}</span> : null}
        </div>
        <div className="masthead-rule mt-4" />

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
          <div>
            <h1 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
              {heading}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {body}
            </p>

            {links && links.length > 0 ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:text-foreground"
                  >
                    {link.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Seal className="hidden size-24 shrink-0 opacity-80 md:block" />
        </div>
      </div>
    </div>
  );
}
