import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Database,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  Wifi,
} from "lucide-react";
import Link from "next/link";

import { SectionLabel } from "~/components/section-label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { productClaims, productRelease } from "~/content/product";

export const metadata: Metadata = {
  title: "Privacy & evidence",
  description:
    "A task-by-task view of Medscribe's local architecture, network behavior, caregiver sharing, evidence, and beta limitations.",
};

const dataMap = [
  {
    task: "Visit transcription",
    location: "Device",
    network: "No cloud inference",
    control: "Recording requires consent",
  },
  {
    task: "Summary generation",
    location: "Device",
    network: "No cloud inference",
    control: "The person reviews output",
  },
  {
    task: "Medication-label OCR",
    location: "Device",
    network: "No cloud inference",
    control: "Extracted fields remain editable",
  },
  {
    task: "Drug facts and known pairs",
    location: "Bundled on device",
    network: "No runtime fact lookup",
    control: "Sources and coverage are disclosed",
  },
  {
    task: "Model installation or update",
    location: "Downloaded to device",
    network: "Network may be required",
    control: "Approved URLs and file integrity checks",
  },
  {
    task: "Caregiver sharing",
    location: "Encrypted device-to-device snapshot",
    network: "The person chooses ciphertext transport",
    control: "Verify out of band; import trust enforcement is incomplete",
  },
  {
    task: "Primary record storage",
    location: "Local app database",
    network: "No Medscribe cloud account",
    control: "The unlocked device remains a trust boundary",
  },
  {
    task: "Website analytics",
    location: "Marketing site only",
    network: "Optional Umami script when configured",
    control: "Disabled when no website ID is configured",
  },
] as const;

const protects = [
  "Runtime disclosure of visits or medications to a cloud AI provider",
  "A Medscribe account database becoming the default copy of the record",
  "A readable caregiver export being sent to someone who was not paired",
] as const;

const doesNotProtect = [
  "Information viewed on an unlocked or compromised phone",
  "A snapshot that a verified recipient already imported",
  "Someone intentionally copying or sharing visible information",
  "Every possible drug interaction or model failure",
] as const;

export default function PrivacyPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-18 sm:px-6 sm:pt-22">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">
              Last verified {productRelease.verifiedOn}
            </Badge>
            <Badge variant="outline">Internal beta</Badge>
          </div>
          <h1 className="text-foreground mt-6 max-w-4xl font-serif text-5xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
            Privacy should be specific enough to challenge.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
            “Local” is not a magic word. Here is where each task happens, when a
            network can be involved, what the design protects, and what it does
            not.
          </p>
        </div>
      </section>

      <section className="border-border-soft bg-surface/80 border-y px-4 py-18 sm:px-6 lg:py-22">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Data map</SectionLabel>
          <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Task by task, not “everything” absolutes.
          </h2>

          <div className="border-border-soft bg-canvas mt-10 overflow-x-auto rounded-2xl border shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Medscribe tasks, processing location, network behavior, and user
                control
              </caption>
              <thead>
                <tr className="border-border-soft bg-surface-soft border-b">
                  {[
                    "Task",
                    "Where it happens",
                    "Network behavior",
                    "User control",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="text-muted-foreground px-5 py-4 text-xs font-bold tracking-[0.1em] uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataMap.map((row) => (
                  <tr
                    key={row.task}
                    className="border-border-soft/80 border-b last:border-0"
                  >
                    <th
                      scope="row"
                      className="text-foreground px-5 py-4 font-semibold"
                    >
                      {row.task}
                    </th>
                    <td className="text-muted-foreground px-5 py-4">
                      {row.location}
                    </td>
                    <td className="text-muted-foreground px-5 py-4">
                      {row.network}
                    </td>
                    <td className="text-muted-foreground px-5 py-4">
                      {row.control}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: LockKeyhole,
                title: "Supported AI work stays local",
                body: productClaims.localAi.publicCopy,
              },
              {
                icon: Database,
                title: "The primary record stays local",
                body: `${productClaims.localRecord.publicCopy} The beta relies on the device and operating system's protections; it does not claim a separately encrypted app database.`,
              },
              {
                icon: Wifi,
                title: "Downloads are the network exception",
                body: "Installing or updating a model can require a network. Approved model files are checked against an expected SHA-256 digest before use.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="border-border-soft bg-surface rounded-2xl border p-6"
                >
                  <span className="bg-primary-light text-primary flex size-11 items-center justify-center rounded-xl">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-foreground mt-5 font-serif text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-border-soft border-y bg-[#f4f0e8]/75 px-4 py-20 sm:px-6 lg:py-24 dark:bg-[#151b25]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-xl">
                <KeyRound className="size-6" aria-hidden="true" />
              </div>
              <SectionLabel className="mt-6">Caregiver sharing</SectionLabel>
              <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight">
                Verify a person, then export deliberately.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                New snapshots use authenticated encryption targeted to the
                recipient key. Ciphertext integrity and wrong-recipient
                rejection are tested. The current import path does not yet
                require the sender to be in the recipient&apos;s active trust
                list, and recipient-key metadata is not authenticated and
                checked on import. Verify the sender out of band. The beta does
                not claim the Signal protocol or live synchronization.
              </p>
            </div>
            <div className="border-border-soft bg-surface rounded-2xl border p-6 sm:p-8">
              <p className="text-foreground font-semibold">
                The practical rule
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  "Compare the safety number with the intended caregiver.",
                  "Review the snapshot before every material export.",
                  "Re-export after important changes; it is not automatic.",
                  "Treat revocation as a block on future local exports; it cannot invalidate already-exported ciphertext.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex gap-3 text-sm leading-relaxed"
                  >
                    <span className="bg-primary-light text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Evidence, not superlatives</SectionLabel>
          <div className="mt-4 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <h2 className="text-foreground font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                What the current release can actually point to.
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Medication language is based on named public reference datasets,
              but condensed wording is not FDA-reviewed. Coverage counts
              describe the bundle; they do not prove clinical completeness.
            </p>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                productRelease.drugFacts.toLocaleString(),
                "Condensed drug records",
              ],
              [
                productRelease.rxNormTerms.toLocaleString(),
                "RxNorm search terms",
              ],
              [
                productRelease.interactionPairs.toLocaleString(),
                "Known high-priority pairs",
              ],
              [
                productRelease.flaggedForReview.toLocaleString(),
                "Records flagged for review",
              ],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-border-soft bg-surface rounded-2xl border p-6"
              >
                <dt className="text-muted-foreground text-sm leading-relaxed">
                  {label}
                </dt>
                <dd className="text-foreground mt-2 font-serif text-4xl font-semibold">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-border-soft bg-surface-soft mt-6 flex gap-3 rounded-2xl border p-5">
            <FileCheck2
              className="text-primary mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Source families include openFDA label data, RxNorm terminology,
              MED-RT and DailyMed class inputs, plus a bounded high-priority
              interaction list. Release dates and full methodology should be
              published with each wider release.
            </p>
          </div>
        </div>
      </section>

      <section className="border-border-soft bg-surface/75 border-t px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="border-success/25 bg-success-light/45 rounded-2xl border p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Check className="text-success size-6" aria-hidden="true" />
              <h2 className="text-foreground font-serif text-2xl font-semibold">
                Designed to protect against
              </h2>
            </div>
            <ul className="text-muted-foreground mt-5 space-y-3 text-sm leading-relaxed">
              {protects.map((item) => (
                <li key={item} className="border-success/30 border-l-2 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-amber-50 p-6 text-slate-900 sm:p-8 dark:bg-amber-950/30 dark:text-slate-100">
            <div className="flex items-center gap-3">
              <AlertTriangle
                className="size-6 text-amber-700 dark:text-amber-300"
                aria-hidden="true"
              />
              <h2 className="font-serif text-2xl font-semibold">
                It does not eliminate
              </h2>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {doesNotProtect.map((item) => (
                <li key={item} className="border-l-2 border-amber-500/35 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-5 rounded-2xl bg-[#0f4f4b] p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="font-serif text-3xl font-semibold">
              Help test the boundary.
            </h2>
            <p className="mt-2 text-sm text-teal-50/75">
              The internal beta is focused on correctness, comprehension, and
              caregiver handoffs.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white text-[#0f4f4b] hover:bg-teal-50"
          >
            <Link href="/beta">
              Beta expectations
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
