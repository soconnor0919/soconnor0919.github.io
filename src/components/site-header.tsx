"use client";

import { useState } from "react";
import { FileText, Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { cn } from "~/lib/utils";

const navLinks = [
  { href: "/", label: "About", icon: Home },
  { href: "/executive-summary", label: "Summary", icon: FileText },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="print-hidden sticky top-3 z-50 px-3 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-border-soft/80 bg-canvas/82 px-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5">
          <Link
            href="/"
            className="flex items-center text-foreground transition-opacity hover:opacity-80"
            aria-label="Medscribe home"
            onClick={() => setIsOpen(false)}
          >
            <MedscribeLogo className="h-7 w-[88px]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            {navLinks.map((link) => {
              const isActive = link.href === pathname;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-1 transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full bg-primary transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="relative size-6 text-muted-foreground transition-colors hover:text-foreground focus:outline-none sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <Menu
              className={cn(
                "absolute inset-0 transition-opacity duration-200",
                isOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 transition-opacity duration-200",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={cn(
            "absolute inset-x-0 top-16 overflow-hidden rounded-2xl border border-border-soft/80 bg-canvas/95 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-md transition-all duration-200 sm:hidden",
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0",
          )}
        >
          <nav className="flex flex-col p-2">
            {navLinks.map((link) => {
              const isActive = link.href === pathname;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-light/60 text-foreground"
                      : "text-muted-foreground hover:bg-surface-soft hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 -z-10 bg-canvas/30 backdrop-blur-sm transition-opacity duration-200 sm:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden
      />
    </header>
  );
}
