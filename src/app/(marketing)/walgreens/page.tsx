import type { Metadata } from "next";

import { PrintButton } from "~/components/print-button";
import { SectionLabel } from "~/components/section-label";
import { WalgreensPrintSummary } from "~/components/walgreens-print-summary";

export const metadata: Metadata = {
  title: "Walgreens executive summary",
  robots: { index: false, follow: false, nocache: true },
};

export default function WalgreensSummaryPage() {
  return (
    <>
      <WalgreensPrintSummary />
      <div className="print-hidden mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <SectionLabel>Executive summary · Walgreens</SectionLabel>
        <h1 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          The pharmacy executive summary
        </h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl leading-relaxed">
          This page is formatted as a two-page print document: what Medscribe
          can do, and how every capability pays off twice, for the patient and
          for Walgreens. Use Print PDF (or Cmd+P, then Save as PDF) to export
          it.
        </p>
        <div className="mt-8 flex justify-center">
          <PrintButton size="lg" />
        </div>
      </div>
    </>
  );
}
