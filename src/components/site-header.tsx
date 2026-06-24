import Link from "next/link";
import { FileText } from "lucide-react";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { Button } from "~/components/ui/button";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#impact", label: "Impact" },
  { href: "/executive-summary", label: "Summary" },
];

export function SiteHeader() {
  return (
    <header className="print-hidden sticky top-3 z-50 px-3 sm:px-6">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border border-border-soft/80 bg-canvas/82 px-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5">
        <Link
          href="/"
          className="flex items-center text-foreground transition-opacity hover:opacity-80"
          aria-label="Medscribe home"
        >
          <MedscribeLogo className="h-7 w-[88px]" />
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="h-8 rounded-full px-3">
          <a href="/executive-summary">
            <FileText className="size-4" />
            <span className="hidden sm:inline">Executive summary</span>
            <span className="sm:hidden">Summary</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
