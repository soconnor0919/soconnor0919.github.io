import Link from "next/link";

import { MedscribeLogo } from "~/components/medscribe-logo";

export function SiteHeader() {
  return (
    <header className="print-hidden sticky top-3 z-50 px-3 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <div className="relative flex h-14 items-center rounded-full border border-border-soft/80 bg-canvas/82 px-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5">
          <Link
            href="/"
            className="relative z-10 flex items-center text-foreground transition-opacity hover:opacity-80"
            aria-label="Medscribe home"
          >
            <MedscribeLogo className="h-7 w-auto" />
          </Link>
          <p className="pointer-events-none absolute inset-x-0 text-center font-serif text-lg font-semibold tracking-tight text-foreground">
            Medscribe
          </p>
          <span className="relative z-10 ml-auto hidden text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:inline">
            Executive summary
          </span>
        </div>
      </div>
    </header>
  );
}
