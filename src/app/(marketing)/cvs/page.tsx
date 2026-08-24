import type { Metadata } from "next";

import { CvsPrintSummary } from "~/components/cvs-print-summary";
import { PrintButton } from "~/components/print-button";
import { SectionLabel } from "~/components/section-label";

export const metadata: Metadata = {
  title: "CVS executive summary",
  robots: { index: false, follow: false, nocache: true },
};

export default function CvsSummaryPage() {
  return (
    <>
      <CvsPrintSummary />
      <div className="print-hidden mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <SectionLabel>Executive summary · CVS Health</SectionLabel>
        <h1 className="text-foreground mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          The pharmacy executive summary
        </h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl leading-relaxed">
          This page is formatted as a two-page print document: the medication
          record that moves adherence, keeps refills, and lowers cost of care.
          Use Print PDF (or Cmd+P, then Save as PDF) to export it.
        </p>
        <div className="mt-8 flex justify-center">
          <PrintButton size="lg" />
        </div>
      </div>
    </>
  );
}
