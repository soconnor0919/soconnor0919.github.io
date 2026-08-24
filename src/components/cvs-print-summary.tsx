import Image from "next/image";
import {
  HeartPulse,
  Layers,
  Mic,
  MessageSquare,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

/**
 * Pharmacy-specific print summary (CVS-targeted, reusable for other pharmacies).
 * Two designed pages, built for the product rather than mirroring the Northwell
 * layout:
 *   Page 1 - what Medscribe can do (capabilities, patient-facing power).
 *   Page 2 - every capability pays off twice (patient value -> CVS value).
 * Reuses the `northwell-print-*` sheet/label classes from globals.css only as
 * the page frame; the interior is its own design.
 */

function PrintPage({
  page,
  children,
}: Readonly<{ page: number; children: React.ReactNode }>) {
  return (
    <article
      className={
        page === 1
          ? "northwell-print-page"
          : "northwell-print-page northwell-print-page--continuation"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="northwell-print-wash" src="/print-wash.svg" alt="" />
      {page === 1 ? (
        <header className="northwell-print-header">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-6 w-auto" src="/medscribe-ms-logo.svg" alt="" />
            <span className="font-serif text-[17px] font-semibold text-slate-950">
              Medscribe
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Executive summary · CVS Health
          </span>
        </header>
      ) : null}

      <div className="northwell-print-content">{children}</div>

      <footer className="northwell-print-footer">
        <span>Page {page} of 2</span>
      </footer>
    </article>
  );
}

const capabilities = [
  {
    icon: Mic,
    title: "Understand a visit",
    body: "Type, paste, snap the after-visit summary, or record the conversation with consent, then review the useful details together.",
  },
  {
    icon: ScanLine,
    title: "Read a pill bottle",
    body: "Point the camera at a prescription label and the drug, dose, and schedule land in the record automatically.",
  },
  {
    icon: MessageSquare,
    title: "Answer the hard questions",
    body: "Bring medication questions into the same view as the patient's list, with important decisions left to the pharmacist or care team.",
  },
  {
    icon: Layers,
    title: "Hold the whole picture",
    body: "Medications, allergies, conditions, baseline, and visit history across every provider, in one place the patient owns.",
  },
  {
    icon: HeartPulse,
    title: "Be ready for an emergency",
    body: "A patient-controlled Know Me card puts the time-critical facts one tap away for a caregiver or an ER.",
  },
  {
    icon: ShieldCheck,
    title: "Share with intention",
    body: "The patient chooses what to share with a trusted caregiver and when that handoff happens.",
  },
] as const;

const payoffs = [
  {
    patientTitle: "One picture, everywhere they are treated",
    patient:
      "Nothing falls through the cracks between a specialist, an urgent care, and the pharmacy.",
    cvsTitle: "One central pharmacy",
    cvs: "Refills route back to CVS and scattered scripts consolidate, instead of leaking to Amazon, Cost Plus, or mail order. Share of scripts, won.",
  },
  {
    patientTitle: "Medications that fit their day",
    patient:
      "Reminders and refill nudges that actually help, so they stay on their medications.",
    cvsTitle: "Star Ratings",
    cvs: "Diabetes, hypertension, and statin adherence are triple-weighted in Part D Star Ratings: Quality Bonus Payments and retention for Aetna and SilverScript.",
  },
  {
    patientTitle: "Fewer dangerous surprises",
    patient:
      "Interactions and duplicate prescriptions caught across every prescriber, not one pharmacy's slice.",
    cvsTitle: "Lower cost of care",
    cvs: "Fewer adverse events and ER visits: direct medical spend saved for the members shared with Caremark and Aetna.",
  },
  {
    patientTitle: "Ready at the counter",
    patient:
      "They arrive with a clean list and their routine questions already answered.",
    cvsTitle: "Pharmacist leverage",
    cvs: "Less low-value counter volume, more time for the billable MTM and CMR work pharmacists already do.",
  },
  {
    patientTitle: "A tool that is theirs",
    patient:
      "An advocate they control, centered on their choices rather than a sales pitch.",
    cvsTitle: "Engagement without the liability",
    cvs: "A CVS-branded habit patients can understand, with a clear privacy posture and deliberate patient control.",
  },
] as const;

export function CvsPrintSummary() {
  return (
    <div className="northwell-print-only" aria-hidden="true">
      <PrintPage page={1}>
        <div className="grid grid-cols-[1.16fr_0.84fr] items-start gap-9 pt-5">
          <div>
            <p className="northwell-print-label">What Medscribe is</p>
            <h1 className="mt-4 font-serif text-[40px] leading-[1.0] font-semibold tracking-[-0.035em] text-slate-950">
              It captures, understands, and carries the patient&apos;s whole
              medical picture.
            </h1>
            <p className="mt-5 text-[15px] leading-[1.55] text-slate-600">
              Medscribe organizes visits, reads pill bottles, supports
              medication questions, and keeps one ready-to-share record across
              every provider.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2 text-[8.5px] font-bold tracking-[0.08em] text-slate-600 uppercase">
              {[
                "Private by design",
                "Clear by design",
                "Patient-controlled",
                "iOS and Android",
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-teal-600" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-[202px]">
            <div>
              <Image
                src="/screenshots/product-bezel-2026-08-24-clipped/medications-black.webp"
                alt="Medscribe medications screen"
                width={1350}
                height={2760}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-teal-700/25 pt-5">
          <p className="northwell-print-label">What it can do</p>
          <h2 className="mt-2 font-serif text-[25px] leading-[1.12] font-semibold text-slate-950">
            The daily tools patients need, connected in one place
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-x-7 gap-y-7">
          {capabilities.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="size-5 text-teal-700" strokeWidth={1.75} />
              <h3 className="mt-2.5 font-serif text-[16px] leading-[1.15] font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-1.5 text-[10px] leading-[1.5] text-slate-600">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-7 border-t border-teal-700/25 pt-5">
          {[
            [
              "Private by design",
              "The experience keeps the patient's choices at the center of every review and handoff.",
            ],
            [
              "Clear medication context",
              "Medication questions stay connected to the list the patient already carries and the professionals they trust.",
            ],
            [
              "Owned by the patient",
              "One record that spans every provider, that the patient controls, carries, and decides how to share.",
            ],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-serif text-[14px] font-semibold text-slate-950">
                {title}
              </p>
              <p className="mt-1.5 text-[9.5px] leading-[1.5] text-slate-600">
                {body}
              </p>
            </div>
          ))}
        </div>
      </PrintPage>

      <PrintPage page={2}>
        <section className="pt-3">
          <p className="northwell-print-label">Who it helps</p>
          <h2 className="northwell-print-title">
            Every capability pays off twice
          </h2>
          <p className="northwell-print-lede max-w-[660px]">
            The features that make Medscribe genuinely useful to the patient are
            the same ones that move the numbers CVS is measured on.
            Cross-provider by design; one central pharmacy in practice.
          </p>
        </section>

        <div className="mt-6 grid grid-cols-[0.92fr_1.08fr] gap-8">
          <p className="text-[9px] font-bold tracking-[0.18em] text-slate-500 uppercase">
            For the patient
          </p>
          <p className="text-[9px] font-bold tracking-[0.18em] text-teal-700 uppercase">
            For CVS
          </p>
        </div>

        <div className="mt-1">
          {payoffs.map((row) => (
            <div
              key={row.cvsTitle}
              className="grid grid-cols-[0.92fr_1.08fr] gap-8 border-t border-slate-200 py-3"
            >
              <div>
                <h3 className="font-serif text-[14px] leading-[1.2] font-semibold text-slate-950">
                  {row.patientTitle}
                </h3>
                <p className="mt-1 text-[9.5px] leading-[1.45] text-slate-600">
                  {row.patient}
                </p>
              </div>
              <div className="border-l border-teal-600/30 pl-8">
                <h3 className="font-serif text-[14px] leading-[1.2] font-semibold text-teal-900">
                  {row.cvsTitle}
                </h3>
                <p className="mt-1 text-[9.5px] leading-[1.45] text-slate-600">
                  {row.cvs}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 bg-teal-50/70 px-5 py-3 text-[10px] leading-[1.5] text-slate-700">
          <span className="font-semibold text-slate-900">
            It sits beside the CVS stack, not on top of it.{" "}
          </span>
          Dispensing, Caremark benefits, and the CVS app keep doing their jobs.
          Medscribe is the patient-owned layer that feeds value back in with
          consent. A partnership unlocks co-branding, refill routing, and
          adherence reporting against Star and EQuIPP measures.
        </p>

        <section className="mt-6 grid grid-cols-[1.12fr_0.88fr] items-start gap-9 border-t border-slate-300 pt-5">
          <div>
            <p className="northwell-print-label">The ask</p>
            <h3 className="mt-3 font-serif text-[20px] leading-[1.22] font-semibold text-slate-950">
              A short conversation about a record that moves adherence and keeps
              refills at CVS.
            </h3>
            <p className="mt-2 text-[10.5px] leading-[1.5] text-slate-600">
              Designed for iOS and Android. A partnership can connect the
              patient experience with CVS&apos;s adherence and pharmacy goals.
            </p>
          </div>
          <div>
            <p className="northwell-print-label">Who is behind it</p>
            <h3 className="mt-3 font-serif text-[19px] font-semibold text-slate-950">
              Sean O&apos;Connor
            </h3>
            <p className="mt-3 text-[10.5px] leading-[1.5] text-slate-600">
              A Bucknell computer science and engineering graduate who built
              Medscribe after watching his family lose the full picture of his
              grandfather&apos;s care.
            </p>
          </div>
        </section>
      </PrintPage>
    </div>
  );
}
