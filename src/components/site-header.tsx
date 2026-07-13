import Link from "next/link";

import { MedscribeLogo } from "~/components/medscribe-logo";

export function SiteHeader() {
  return (
    <header className="print-hidden sticky top-3 z-50 px-3 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-border-soft/80 bg-canvas/82 px-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5">
          <Link
            href="/"
            className="flex items-center text-foreground transition-opacity hover:opacity-80"
            aria-label="Medscribe home"
          >
            <MedscribeLogo className="h-7 w-[88px]" />
          </Link>
          <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Executive summary
          </span>
        </div>
      </div>
    </header>
  );
}
