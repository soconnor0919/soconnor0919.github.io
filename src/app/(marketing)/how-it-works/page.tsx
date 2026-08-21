import type { Metadata } from "next";
import {
  ArrowRight,
  Camera,
  Check,
  FileText,
  Keyboard,
  Mic,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import { PhoneMockup } from "~/components/phone-mockup";
import { SectionLabel } from "~/components/section-label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { productClaims } from "~/content/product";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See how Medscribe turns visits and medication routines into one local record a person can review and carry.",
};

const inputs = [
  {
    icon: Keyboard,
    title: "Type or paste",
    body: "Start from notes you already have and keep the source close to the result.",
  },
  {
    icon: Camera,
    title: "Import a screenshot",
    body: "Bring in a portal summary or prescription label, then correct extracted fields.",
  },
  {
    icon: FileText,
    title: "Attach a document",
    body: "Use a photo or document as the input to a local review workflow.",
  },
  {
    icon: Mic,
    title: "Record with consent",
    body: "Optional visit audio requires consent and is transcribed on the device.",
  },
] as const;

const boundaries = [
  "It does not diagnose or recommend treatment.",
  "It does not calculate, shift, or supply medication timing.",
  "It does not replace a pharmacist, prescribing team, or emergency service.",
  "It does not automatically synchronize a household in the background.",
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-18 sm:px-6 sm:pt-22">
        <div className="mx-auto max-w-6xl">
          <Badge variant="success">Current beta workflow</Badge>
          <h1 className="text-foreground mt-6 max-w-4xl font-serif text-5xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
            One record, built through everyday use.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Medscribe is useful at a handoff only if ordinary moments keep the
            picture current. Every generated result has a person in the review
            loop.
          </p>
        </div>
      </section>

      <section className="border-border-soft bg-surface/75 border-y px-4 py-18 sm:px-6 lg:py-22">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Start where the information is</SectionLabel>
          <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Four ways in. One review checkpoint.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inputs.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="border-border-soft bg-canvas rounded-2xl border p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-primary-light text-primary flex size-11 items-center justify-center rounded-xl">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-muted-foreground text-xs font-bold">
                      0{index + 1}
                    </span>
                  </div>
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
          <div className="border-primary/20 bg-primary-light/45 mt-6 flex gap-3 rounded-2xl border p-5">
            <Check
              className="text-primary mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-foreground text-sm leading-relaxed">
              The person reviews summaries and extracted medication fields.
              Medscribe does not silently turn model output into an
              authoritative medical record.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl space-y-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Review what changed</SectionLabel>
              <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                A summary is a draft, not a verdict.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                Supported transcription and summarization run locally. The visit
                remains available beside the summary so a person can check
                follow-ups and wording.
              </p>
              <p className="border-border-soft bg-surface text-muted-foreground mt-5 rounded-2xl border p-5 text-sm leading-relaxed">
                <strong className="text-foreground">What comes next:</strong> a
                structured review inbox for accepting, correcting, or dismissing
                changes inferred from a visit.
              </p>
            </div>
            <div className="bg-primary-light/45 justify-self-center rounded-[2.5rem] p-7">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-20/summary-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-20/summary-natural-dark.webp"
                alt="Synthetic Medscribe beta visit summary"
                width={235}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Synthetic demo data · beta interface
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="justify-self-center rounded-[2.5rem] bg-[#f4f0e8] p-7 lg:order-1 dark:bg-[#151b25]">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-20/medication-detail-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-20/medication-detail-natural-dark.webp"
                alt="Synthetic Medscribe beta medication detail"
                width={235}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Synthetic demo data · beta interface
              </p>
            </div>
            <div className="lg:order-2">
              <SectionLabel>Maintain the medication picture</SectionLabel>
              <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Facts and schedules carry their boundary with them.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                {productClaims.medicationFacts.publicCopy} Schedules can record
                whether they are fixed-time or as-needed, the times supplied by
                the person&apos;s source, confirmation, and timezone.
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                Medscribe records timing supplied by a label, pharmacist, or
                prescribing team. It does not calculate or shift medication
                times.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Prepare the handoff</SectionLabel>
              <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Know Me is the view. Sharing is a separate choice.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                Open the local Know Me screen when someone needs a concise
                picture. For a caregiver, pair devices, compare a safety number,
                review the record, and manually export an encrypted snapshot.
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                The current import path does not yet require the sender to be in
                the recipient&apos;s active trust list, so recipients must
                verify the sender out of band. Revocation prevents a future
                local export; it cannot invalidate already-exported ciphertext
                or erase a copy the recipient imported.
              </p>
            </div>
            <div className="bg-primary-light/45 justify-self-center rounded-[2.5rem] p-7">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-20/know-me-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-20/know-me-natural-dark.webp"
                alt="Synthetic Medscribe beta Know Me handoff"
                width={235}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Synthetic demo data · beta interface
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border-soft border-t bg-[#f4f0e8]/75 px-4 py-20 sm:px-6 dark:bg-[#151b25]">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <div className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-xl">
              <ShieldAlert className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-foreground mt-5 font-serif text-4xl font-semibold tracking-tight">
              What Medscribe does not do
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              A useful boundary is part of the product, not fine print after it.
            </p>
          </div>
          <ul className="space-y-3">
            {boundaries.map((item) => (
              <li
                key={item}
                className="border-border-soft bg-surface text-foreground flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed"
              >
                <Check
                  className="text-primary mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 rounded-[2rem] bg-[#0f4f4b] px-7 py-10 text-white sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold">
              See the trust boundary task by task.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-teal-50/75">
              Read what stays local, what can use a network, and what remains
              unfinished.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white text-[#0f4f4b] hover:bg-teal-50"
          >
            <Link href="/privacy">
              Privacy & evidence
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
