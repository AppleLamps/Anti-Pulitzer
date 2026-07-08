import Image from "next/image";
import Link from "next/link";

import { footer, navLinks, siteName } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-card/25">
      <div className="content-container py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <Image src="/logo.svg" alt="" width={24} height={24} />
              <span className="font-heading text-base text-gold">{siteName}</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {footer.blurb}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold/70">
              Navigate
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="editorial-rule my-8 opacity-60" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            <span className="text-foreground/80">{footer.disclaimer}</span>{" "}
            &middot; &copy; {year} {siteName}.
          </p>
          <div className="flex items-center gap-6">
            {footer.socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-gold"
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
