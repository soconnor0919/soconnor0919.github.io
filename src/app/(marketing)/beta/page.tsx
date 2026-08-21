import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Mail,
  MessageSquareText,
  RotateCcw,
  Smartphone,
  Users,
} from "lucide-react";
import Link from "next/link";

import { SectionLabel } from "~/components/section-label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { productRelease } from "~/content/product";
import { BETA_INVITE_MAILTO } from "~/lib/beta";

export const metadata: Metadata = {
  title: "Request beta access",
  description:
    "Learn who the Medscribe internal beta is for, what participants should expect, and how to request access without submitting health information.",
};

const expectations = [
  {
    icon: ClipboardCheck,
    title: "Review is part of testing",
    body: "Check generated summaries, extracted medication fields, and the Know Me view before relying on them.",
  },
  {
    icon: MessageSquareText,
    title: "Direct feedback",
    body: "Report confusing language, incorrect extraction, notification behavior, and sharing friction.",
  },
  {
    icon: RotateCcw,
    title: "Possible resets",
    body: "This is an internal beta. Builds, local data, and setup may need to be reset as the product changes.",
  },
] as const;

const testFocus = [
  "Whether the record still feels current after several weeks",
  "Medication-label edge cases and correction flow",
  "Reminder permissions, timing, travel, and daylight-saving behavior",
  "Caregiver pairing, encrypted export, and import comprehension",
  "Whether the Know Me handoff is readable and appropriately cautious",
  "Physical-device model performance and battery or thermal behavior",
] as const;

export default function BetaPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-18 sm:px-6 sm:pt-22">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">{productRelease.stage}</Badge>
              <Badge variant="outline">{productRelease.platforms}</Badge>
            </div>
            <h1 className="text-foreground mt-6 max-w-3xl font-serif text-5xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
              Test the care context, not just the demo.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
              We are looking for people managing repeated visits or several
              medications, especially family caregiver pairs willing to review
              the record over time and tell us where it fails.
            </p>
          </div>

          <div className="border-border-soft bg-surface rounded-[2rem] border p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-9">
            <div className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-xl">
              <Mail className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-foreground mt-5 font-serif text-3xl font-semibold">
              Request access by email
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              The draft asks only for your platform, whether you are testing as
              a patient, caregiver, or both, and whether you can test with
              another person.
            </p>
            <Button asChild size="lg" className="mt-7 w-full sm:w-auto">
              <a href={BETA_INVITE_MAILTO}>
                Draft beta request
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <p className="bg-surface-soft text-muted-foreground mt-5 rounded-xl p-4 text-xs leading-relaxed">
              Do not send diagnoses, medication names, visit notes, transcripts,
              or other health details. Email is not a medical-support or
              emergency channel.
            </p>
          </div>
        </div>
      </section>

      <section className="border-border-soft border-y bg-[#f4f0e8]/75 px-4 py-20 sm:px-6 lg:py-24 dark:bg-[#151b25]">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>A good fit</SectionLabel>
          <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            The beta needs real maintenance and handoff situations.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Smartphone,
                title: "Several moving pieces",
                body: "You regularly coordinate visits, medication reminders, or follow-ups.",
              },
              {
                icon: Users,
                title: "A caregiver relationship",
                body: "You can test a deliberate handoff with a trusted family caregiver.",
              },
              {
                icon: Check,
                title: "Comfort reviewing",
                body: "You understand generated information can be wrong and will check it.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="border-border-soft bg-surface rounded-2xl border p-6"
                >
                  <Icon className="text-primary size-6" aria-hidden="true" />
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

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>What to expect</SectionLabel>
              <h2 className="text-foreground mt-4 font-serif text-4xl font-semibold tracking-tight">
                This is collaborative product testing.
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                Availability is controlled and continuity is not guaranteed.
                Medscribe is not emergency care, diagnosis, dosing guidance, or
                a replacement for your care team.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {expectations.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="border-border-soft bg-surface rounded-2xl border p-5"
                  >
                    <Icon className="text-primary size-5" aria-hidden="true" />
                    <h3 className="text-foreground mt-4 font-serif text-xl font-semibold">
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

          <div className="mt-16 rounded-[2rem] bg-[#0f4f4b] p-7 text-white sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-teal-100 uppercase">
                  Current test focus
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold">
                  The questions we are trying to answer
                </h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {testFocus.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/15 bg-white/8 p-4 text-sm leading-relaxed text-teal-50/85"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-teal-100"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-border-soft mt-12 flex flex-col items-start justify-between gap-5 border-t pt-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-foreground font-serif text-2xl font-semibold">
                Want the technical boundaries first?
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                See what stays local, how sharing works, and the current
                evidence.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/privacy">Read privacy & evidence</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
