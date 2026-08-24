import Link from "next/link";

import { MedscribeLogo } from "~/components/medscribe-logo";

const footerLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/access", label: "Request access" },
] as const;

export function SiteFooter() {
  return (
    <footer className="print-hidden px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="surface-panel mx-auto grid max-w-6xl gap-10 rounded-[2rem] px-6 py-10 text-sm sm:px-8 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <Link
            href="/"
            className="text-foreground focus-visible:ring-primary/40 inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2"
          >
            <MedscribeLogo className="h-7 w-auto" />
            <span className="font-serif text-lg font-semibold">Medscribe</span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
            A private, patient-controlled way to keep visits, medications, and
            important care context together.
          </p>
          <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
            Medscribe does not diagnose, prescribe, or replace emergency
            services or a clinician&apos;s verification.
          </p>
        </div>

        <nav aria-label="Footer product navigation">
          <p className="text-foreground font-semibold">Product</p>
          <ul className="text-muted-foreground mt-3 space-y-2.5">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground focus-visible:ring-primary/40 rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-foreground font-semibold">Contact</p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Built by{" "}
            <a
              href="https://soconnor.dev"
              className="text-foreground focus-visible:ring-primary/40 rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2"
            >
              Sean O&apos;Connor
            </a>
          </p>
          <a
            href="mailto:sean@soconnor.dev?subject=Medscribe%20website%20question"
            className="text-foreground focus-visible:ring-primary/40 mt-2 inline-block rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2"
          >
            sean@soconnor.dev
          </a>
          <p className="text-muted-foreground/80 mt-5 text-xs">
            &copy; {new Date().getFullYear()} Hadlock Holdings LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
