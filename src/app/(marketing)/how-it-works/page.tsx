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

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See how Medscribe brings visits, medication routines, and important context into one reviewable record.",
};

const inputs = [
  {
    icon: Keyboard,
    title: "Type or paste",
    body: "Start from notes you already have and keep the original details easy to revisit.",
  },
  {
    icon: Camera,
    title: "Import a screenshot",
    body: "Bring in a portal summary or prescription label, then correct extracted fields.",
  },
  {
    icon: FileText,
    title: "Attach a document",
    body: "Bring a photo or document into a guided review workflow.",
  },
  {
    icon: Mic,
    title: "Record with consent",
    body: "With permission, turn optional visit audio into notes you can review.",
  },
] as const;

const boundaries = [
  "It does not diagnose or recommend treatment.",
  "It does not calculate, shift, or supply medication timing.",
  "It does not replace a pharmacist, prescribing team, or emergency service.",
  "It does not decide what you should share or who should receive it.",
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-18 sm:px-6 sm:pt-22">
        <div className="mx-auto max-w-6xl">
          <Badge variant="success">A day with Medscribe</Badge>
          <h1 className="text-foreground mt-6 max-w-4xl font-serif text-5xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
            One record, built through everyday use.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Medscribe is useful at a handoff only if ordinary moments keep the
            picture clear. You stay in the review loop from the first note to
            the next conversation.
          </p>
        </div>
      </section>

      <section className="brand-warm border-border-soft/70 border-y px-4 py-18 sm:px-6 lg:py-22">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Start where the information is</SectionLabel>
          <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Four ways in. One clear place to review.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inputs.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="glass-panel rounded-2xl p-6"
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
              You review summaries and medication details before they become
              part of the record you carry.
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
                Keep the visit and the takeaway together.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                The visit remains available beside the summary so you can check
                wording, follow-ups, and the details you want to remember.
              </p>
              <p className="glass-panel text-muted-foreground mt-5 rounded-2xl p-5 text-sm leading-relaxed">
                <strong className="text-foreground">Stay oriented:</strong> move
                between the transcript and summary whenever you want the fuller
                context.
              </p>
            </div>
            <div className="bg-primary-light/45 justify-self-center rounded-[2.5rem] p-7">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-23-complete/summary-reviewed-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-23-complete/summary-reviewed-natural-dark.webp"
                alt="Illustrative Medscribe visit summary"
                width={235}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="brand-warm justify-self-center rounded-[2.5rem] p-7 lg:order-1">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-23-complete/medication-detail-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-23-complete/medication-detail-natural-dark.webp"
                alt="Illustrative Medscribe medication detail"
                width={235}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
            <div className="lg:order-2">
              <SectionLabel>Maintain the medication picture</SectionLabel>
              <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Keep the daily routine easy to read.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                See medication details, schedules, reminders, and refill
                information together without hunting through separate notes.
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
                Open Know Me when someone needs a concise picture. Review the
                details first, then show or share the selected context with a
                trusted caregiver.
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                You stay in control of the handoff: what is included, who sees
                it, and when the conversation happens.
              </p>
            </div>
            <div className="bg-primary-light/45 justify-self-center rounded-[2.5rem] p-7">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-23-complete/know-me-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-23-complete/know-me-natural-dark.webp"
                alt="Illustrative Medscribe Know Me handoff"
                width={235}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-warm border-border-soft/70 border-t px-4 py-20 sm:px-6">
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
                className="glass-panel text-foreground flex gap-3 rounded-2xl p-4 text-sm leading-relaxed"
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
        <div className="brand-night mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 rounded-[2rem] px-7 py-10 text-white shadow-[0_28px_70px_rgba(7,20,21,0.2)] sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold">
              Privacy should feel understandable.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-teal-50/75">
              See how Medscribe keeps you in control of the context you keep,
              review, and share.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white text-[#0f4f4b] hover:bg-teal-50"
          >
            <Link href="/privacy">
              Read about privacy
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
