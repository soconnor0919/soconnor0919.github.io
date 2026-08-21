import { Menu } from "lucide-react";
import Link from "next/link";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { Button } from "~/components/ui/button";

const navigation = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy & evidence" },
] as const;

export function SiteHeader() {
  return (
    <header className="print-hidden border-border-soft/70 bg-canvas/88 sticky top-0 z-50 border-b backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="text-foreground focus-visible:ring-primary/40 flex shrink-0 items-center gap-2.5 rounded-md transition-opacity outline-none hover:opacity-75 focus-visible:ring-2"
          aria-label="Medscribe home"
        >
          <MedscribeLogo className="h-7 w-auto" />
          <span className="font-serif text-lg font-semibold tracking-tight">
            Medscribe
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-surface-soft hover:text-foreground focus-visible:ring-primary/40 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href="/beta">Request beta access</Link>
          </Button>
        </nav>

        <details className="group relative ml-auto md:hidden">
          <summary className="border-border-soft bg-surface text-foreground focus-visible:ring-primary/40 flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border outline-none marker:content-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="border-border-soft bg-surface absolute top-13 right-0 flex w-64 flex-col rounded-2xl border p-2 shadow-[0_18px_50px_rgba(15,23,42,0.16)]"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:bg-surface-soft focus-visible:ring-primary/40 rounded-xl px-4 py-3 text-sm font-medium outline-none focus-visible:ring-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/beta"
              className="bg-primary-button hover:bg-primary-button/90 focus-visible:ring-primary/40 mt-1 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white outline-none focus-visible:ring-2"
            >
              Request beta access
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
