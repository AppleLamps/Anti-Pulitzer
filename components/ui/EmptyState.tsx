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
      className={cn(
        "content-container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center",
        className,
      )}
    >
      <Seal className="size-20 opacity-80 md:size-24" />

      {(label || status) && (
        <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
          {label ? <span className="text-gold">{label}</span> : null}
          {status ? (
            <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
              {status}
            </span>
          ) : null}
        </div>
      )}

      <h1 className="mt-6 font-heading text-3xl tracking-tight text-foreground md:text-4xl">
        {heading}
      </h1>
      <div className="editorial-rule my-6 max-w-[6rem]" />
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">
        {body}
      </p>

      {links && links.length > 0 ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-gold transition-colors hover:text-foreground"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
