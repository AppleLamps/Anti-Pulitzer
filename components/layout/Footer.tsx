import Image from "next/image";
import Link from "next/link";

import { footer, masthead, navLinks, siteName } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/25 bg-card/25">
      <div className="content-container py-7">
        {/* Colophon folio */}
        <div className="masthead-rule" />
        <div className="folio-bar py-2">
          <span>{siteName}</span>
          <span className="hidden sm:inline">
            {masthead.volume} · {masthead.edition}
          </span>
          <span className="text-gold/70">{masthead.motto}</span>
        </div>
        <div className="masthead-rule" />

        <div className="mt-6 grid gap-8 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <Image src="/logo.svg" alt="" width={22} height={22} />
              <span className="font-heading text-base text-gold">{siteName}</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {footer.blurb}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="kicker">Sections</p>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="editorial-rule my-5 opacity-50" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.68rem] tracking-wide text-muted-foreground">
            <span className="text-foreground/80">{footer.disclaimer}</span> · ©{" "}
            {year} {siteName}.
          </p>
          <div className="flex items-center gap-6">
            {footer.socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
