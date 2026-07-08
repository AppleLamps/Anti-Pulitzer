"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { navLinks, siteName } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="content-container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={26}
            height={26}
            className="shrink-0"
          />
          <span className="font-heading text-lg tracking-tight text-foreground">
            {siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative py-1 text-sm tracking-wide transition-colors",
                isActive(link.href)
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
              {isActive(link.href) ? (
                <span className="absolute -bottom-px left-0 h-px w-full bg-gold" />
              ) : null}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-sm p-1 text-foreground transition-colors hover:text-gold md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-border/70 bg-background/95 md:hidden">
          <div className="content-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-sm border-l-2 px-3 py-3 text-sm tracking-wide transition-colors",
                  isActive(link.href)
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
