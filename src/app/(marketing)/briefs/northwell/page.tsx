import type { Metadata } from "next";

import { NorthwellPrintSummary } from "~/components/northwell-print-summary";
import { PrintButton } from "~/components/print-button";
import { SectionLabel } from "~/components/section-label";

export const metadata: Metadata = {
  title: "Northwell executive summary",
  robots: { index: false, follow: false, nocache: true },
};

export default function NorthwellBriefPage() {
  return (
    <>
      <NorthwellPrintSummary />
      <div className="print-hidden mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <SectionLabel>Executive summary · Northwell Health</SectionLabel>
        <h1 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          The health-system executive summary
        </h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl leading-relaxed">
          This private, search-excluded route preserves the existing three-page
          print document. Use Print PDF (or Cmd+P, then Save as PDF) to export
          it.
        </p>
        <div className="mt-8 flex justify-center">
          <PrintButton size="lg" />
        </div>
      </div>
    </>
  );
}
