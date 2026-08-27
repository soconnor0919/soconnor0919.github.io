import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ListChecks,
  MessageCircleQuestion,
  RotateCcw,
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

const dailyRhythm = [
  {
    icon: CalendarDays,
    title: "Start with the moment",
    body: "Give each visit a clear place so the details remain easy to find later.",
  },
  {
    icon: ListChecks,
    title: "Review what matters",
    body: "Check the useful details and keep your own judgment in the loop.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Keep the next question",
    body: "Save what you want to ask while it is still fresh in your mind.",
  },
  {
    icon: RotateCcw,
    title: "Return when needed",
    body: "Revisit the same picture before the next appointment or handoff.",
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
          <h1 className="text-foreground mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
            One record, built through everyday use.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Medscribe is useful at a handoff only if ordinary moments keep the
            picture clear. You stay in the review loop from the first note to
            the next conversation.
          </p>
        </div>
      </section>

      <section className="section-wash px-4 py-16 sm:px-6 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Start with what matters</SectionLabel>
          <h2 className="text-foreground mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A clear rhythm from the moment to the next conversation.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dailyRhythm.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="surface-panel rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-primary-light text-primary flex size-11 items-center justify-center rounded-xl">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-muted-foreground text-xs font-bold">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-foreground mt-5 font-display text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="surface-panel mt-6 flex gap-3 rounded-2xl p-5">
            <Check
              className="text-primary mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-foreground text-sm leading-relaxed">
              You review the details before they become part of the picture you
              carry.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-16 lg:space-y-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <SectionLabel>Review what changed</SectionLabel>
              <h2 className="text-foreground mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Keep the visit and the takeaway together.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                The visit remains available beside the summary so you can check
                wording, follow-ups, and the details you want to remember.
              </p>
              <p className="surface-panel text-muted-foreground mt-5 rounded-2xl p-5 text-sm leading-relaxed">
                <strong className="text-foreground">Stay oriented:</strong> move
                between the transcript and summary whenever you want the fuller
                context.
              </p>
            </div>
            <div className="justify-self-center py-2">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-24-unified-type/summary-reviewed-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/summary-reviewed-natural-dark.webp"
                alt="Illustrative Medscribe visit summary"
                width={260}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="justify-self-center py-2 lg:order-1">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-24-unified-type/medication-detail-lisinopril-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/medication-detail-lisinopril-natural-dark.webp"
                alt="Illustrative Medscribe medication detail"
                width={260}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
            <div className="lg:order-2">
              <SectionLabel>Maintain the medication picture</SectionLabel>
              <h2 className="text-foreground mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Keep the daily routine easy to read.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                See medication details, schedules, reminders, and refill
                information together without hunting through separate notes.
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                Keep medication timing easy to read and confirm changes with
                the care professional who gave you the instructions.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="lg:order-2">
              <SectionLabel>Keep the next question</SectionLabel>
              <h2 className="text-foreground mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Save it while it is on your mind.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                Add questions as they come up between visits. If Ask reaches a
                question that needs professional judgment, Medscribe can offer
                to save it and suggest who may be helpful to ask.
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                Your list is ready when the appointment starts, so the most
                important question does not disappear in the moment.
              </p>
            </div>
            <div className="justify-self-center py-2 lg:order-1">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-24-unified-type/questions-inline-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/questions-inline-natural-dark.webp"
                alt="Illustrative Medscribe Questions to ask interface"
                width={260}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <SectionLabel>Prepare the handoff</SectionLabel>
              <h2 className="text-foreground mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
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
            <div className="justify-self-center py-2">
              <PhoneMockup
                src="/screenshots/product-bezel-2026-08-24-unified-type/know-me-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/know-me-natural-dark.webp"
                alt="Illustrative Medscribe Know Me handoff"
                width={260}
              />
              <p className="text-muted-foreground mt-4 text-center text-xs">
                Illustrative profile · Medscribe interface
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wash px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-xl">
              <ShieldAlert className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-foreground mt-5 font-display text-4xl font-semibold tracking-tight">
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
                className="surface-panel text-foreground flex gap-3 rounded-2xl p-4 text-sm leading-relaxed"
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

      <section className="px-4 py-16 sm:px-6">
        <div className="night-card mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 rounded-[2rem] px-7 py-10 text-white sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">
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
