"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const navigation = [
  { href: "/", label: "The app" },
  { href: "/device", label: "The device" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  const isActive = (href: (typeof navigation)[number]["href"]) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }

    return pathname === href;
  };

  return (
    <header className="print-hidden sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="surface-panel-strong relative mx-auto flex h-14 max-w-6xl items-center gap-5 rounded-[1.25rem] px-3.5 sm:px-5">
        <Link
          href="/"
          className="text-foreground focus-visible:ring-primary/40 absolute left-1/2 flex shrink-0 -translate-x-1/2 items-center gap-2.5 rounded-md transition-opacity outline-none hover:opacity-75 focus-visible:ring-2 lg:static lg:translate-x-0"
          aria-label="Medscribe home"
        >
          <MedscribeLogo className="h-7 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Medscribe
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onNavigate={() =>
                setHash(item.href.startsWith("/#") ? item.href.slice(1) : "")
              }
              aria-current={
                isActive(item.href)
                  ? item.href.includes("#")
                    ? "location"
                    : "page"
                  : undefined
              }
              className={cn(
                "focus-visible:ring-primary/40 rounded-full px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2",
                isActive(item.href)
                  ? "bg-primary-light/70 text-primary"
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

        <details ref={mobileMenu} className="group relative ml-auto lg:hidden">
          <summary className="bg-surface-soft text-foreground focus-visible:ring-primary/40 flex size-10 cursor-pointer list-none items-center justify-center rounded-full outline-none marker:content-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="surface-panel-strong absolute top-12 right-0 flex w-64 flex-col rounded-[1.4rem] p-2"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onNavigate={() =>
                  setHash(item.href.startsWith("/#") ? item.href.slice(1) : "")
                }
                onClick={() => mobileMenu.current?.removeAttribute("open")}
                aria-current={
                  isActive(item.href)
                    ? item.href.includes("#")
                      ? "location"
                      : "page"
                    : undefined
                }
                className={cn(
                  "text-foreground focus-visible:ring-primary/40 rounded-xl px-4 py-3 text-sm font-medium outline-none focus-visible:ring-2",
                  isActive(item.href)
                    ? "bg-primary-light/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    : "hover:bg-primary-light/60",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/access"
              onClick={() => mobileMenu.current?.removeAttribute("open")}
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
