"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="print-hidden sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass-panel-strong relative mx-auto flex h-14 max-w-6xl items-center gap-5 rounded-[1.25rem] px-3.5 sm:px-5">
        <Link
          href="/"
          className="text-foreground focus-visible:ring-primary/40 absolute left-1/2 flex shrink-0 -translate-x-1/2 items-center gap-2.5 rounded-md transition-opacity outline-none hover:opacity-75 focus-visible:ring-2 md:static md:translate-x-0"
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
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "focus-visible:ring-primary/40 rounded-full px-3 py-2 text-sm font-medium transition-all outline-none focus-visible:ring-2",
                pathname === item.href
                  ? "text-foreground border border-white/45 bg-white/[0.48] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_5px_16px_rgba(15,118,110,0.1)] dark:border-white/10 dark:bg-white/8"
                  : "text-muted-foreground hover:bg-primary-light/60 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href="/access">Request access</Link>
          </Button>
        </nav>

        <details className="group relative ml-auto md:hidden">
          <summary className="border-border-soft/70 bg-surface/70 text-foreground focus-visible:ring-primary/40 flex size-10 cursor-pointer list-none items-center justify-center rounded-full border outline-none marker:content-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="glass-panel-strong absolute top-12 right-0 flex w-64 flex-col rounded-[1.4rem] p-2"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "text-foreground focus-visible:ring-primary/40 rounded-xl px-4 py-3 text-sm font-medium outline-none focus-visible:ring-2",
                  pathname === item.href
                    ? "bg-primary-light/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    : "hover:bg-primary-light/60",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/access"
              className="bg-primary-button hover:bg-primary-button/90 focus-visible:ring-primary/40 mt-1 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white outline-none focus-visible:ring-2"
            >
              Request access
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
