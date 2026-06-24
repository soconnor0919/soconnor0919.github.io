import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PrintButton } from "~/components/print-button";

export const metadata: Metadata = {
  title: "Medscribe Executive Summary",
  description:
    "One-page executive summary for Medscribe, a private medical context app for families managing complex care.",
};

const proofPoints = [
  "iOS TestFlight build",
  "Visit capture and local transcription",
  "Medication OCR, reminders, and history",
  "Search and grounded medication questions",
  "Emergency-ready profile direction",
  "Full founder ownership",
];

const sections = [
  {
    label: "Problem",
    title: "Families hold the context care teams need most.",
    body:
      "In complex care, the real story often lives outside the chart: what normal looks like, which medication is time-critical, what changed after the last visit, and who can explain it under pressure. Portals store records, but families still perform the handoff from memory.",
  },
  {
    label: "Product",
    title: "A private context layer for the person, not the institution.",
    body:
      "Medscribe keeps visits, medications, baseline, allergies, contacts, reminders, summaries, and questions under the person they belong to. The goal is not another medical inbox. It is the family-held record that makes someone easier to understand when care gets complicated.",
  },
  {
    label: "Wedge",
    title: "Emergency-ready, caregiver-centered, private by architecture.",
    body:
      "The market has AI scribes, medication trackers, caregiver portals, and EHR-adjacent tools. Medscribe's wedge is the portable layer families control before an institution is ready: current context, source trails, time-critical medication visibility, and on-device AI where possible.",
  },
];

const opportunities = [
  {
    title: "B2C",
    body: "A caregiver app for families managing aging parents, chronic illness, disability, or high-friction medication routines.",
  },
  {
    title: "IP / partnership",
    body: "A private family-context layer that could matter to care navigation, home health, senior care, pharmacy, or patient-engagement platforms.",
  },
  {
    title: "Impact",
    body: "Fewer blank handoffs, safer medication moments, and more confident advocates when someone cannot fully speak for themselves.",
  },
];

export default function ExecutiveSummaryPage() {
  return (
    <main className="mx-auto max-w-[8.5in] px-4 py-6 sm:px-6 print:p-0">
      <div className="print-hidden mb-5 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Back to site
        </Link>
        <PrintButton />
      </div>

      <article className="summary-sheet relative overflow-hidden rounded-lg border border-border-soft bg-surface px-8 py-7 shadow-[0_12px_40px_rgba(15,23,42,0.08)] print:h-[10.5in] print:rounded-none print:border-0 print:px-[0.34in] print:py-[0.3in] print:shadow-none">
        <header className="relative z-10 grid gap-6 border-b border-teal-900/10 pb-5 lg:grid-cols-[minmax(0,1fr)_190px] print:grid-cols-[minmax(0,1fr)_1.45in] print:gap-4 print:pb-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase print:text-[8.5px]">
              Executive Summary
            </p>
            <h1 className="mt-2 font-serif text-5xl leading-none font-semibold tracking-tight text-foreground print:text-[28px]">
              Medscribe
            </h1>
            <p className="mt-2 font-serif text-2xl leading-tight font-semibold tracking-tight text-foreground print:text-[16px]">
              Be known when care gets complicated.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 print:mt-2 print:text-[10px] print:leading-[1.45]">
              Medscribe is a private medical context app for families managing
              complex care. It helps the people closest to a patient keep the
              living record current: medications, baseline, visits, contacts,
              allergies, emergency facts, and the source trail behind what changed.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end print:justify-end">
            <div className="h-[360px] w-[166px] overflow-hidden rounded-[24px] border-[6px] border-slate-950 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] print:h-[2.9in] print:w-[1.34in] print:rounded-[18px] print:border-[4px] print:shadow-[0_10px_22px_rgba(15,23,42,0.16)]">
              <Image
                src="/screenshots/home.png"
                alt="Medscribe home screen"
                width={1206}
                height={2622}
                priority
                unoptimized
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </header>

        <section className="relative z-10 grid gap-4 py-5 md:grid-cols-3 print:gap-2 print:py-3">
          {sections.map((section) => (
            <div key={section.label} className="space-y-2 print:space-y-1">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase print:text-[8px]">
                {section.label}
              </p>
              <h2 className="font-serif text-xl leading-tight font-semibold tracking-tight text-foreground print:text-[12px]">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 print:text-[8.8px] print:leading-[1.38]">
                {section.body}
              </p>
            </div>
          ))}
        </section>

        <section className="relative z-10 grid gap-4 border-t border-teal-900/10 py-5 md:grid-cols-[0.95fr_1.05fr] print:gap-3 print:py-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase print:text-[8px]">
              Current State
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight font-semibold tracking-tight text-foreground print:mt-1 print:text-[14px]">
              Built enough to show, focused enough to sharpen.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 print:text-[8.8px] print:leading-[1.38]">
              Medscribe is owned and built by Sean O&apos;Connor. Bucknell
              MedTech Entrepreneurial Fellows contributed market discovery and
              pitch feedback; they are not founders, owners, or the technical
              team. The near-term product spine is an emergency-ready profile
              that can travel with the family across fragmented care settings.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 print:grid-cols-2 print:gap-1.5">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="rounded-md border border-teal-900/10 bg-white/78 px-3 py-2 text-sm font-medium text-slate-800 print:px-2 print:py-1.5 print:text-[8.4px]"
              >
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 grid gap-3 border-t border-teal-900/10 pt-5 md:grid-cols-3 print:gap-2 print:pt-3">
          {opportunities.map((item) => (
            <div
              key={item.title}
              className="rounded-lg bg-teal-950 px-4 py-3 text-white print:rounded-md print:px-2.5 print:py-2"
            >
              <h2 className="font-serif text-lg font-semibold tracking-tight print:text-[11px]">
                {item.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/78 print:text-[8.4px] print:leading-[1.32]">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        <footer className="relative z-10 mt-5 flex flex-col gap-2 border-t border-teal-900/10 pt-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between print:mt-3 print:pt-2 print:text-[8px]">
          <p>Sean O&apos;Connor / Founder, full owner</p>
          <p>Private complex-care context / iOS TestFlight</p>
        </footer>
      </article>
    </main>
  );
}
