import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ContactRound,
  Mail,
  Pill,
  Smartphone,
  Users,
} from "lucide-react";

import { SectionLabel } from "~/components/section-label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { productRelease } from "~/content/product";
import { ACCESS_INVITE_MAILTO } from "~/lib/access";

export const metadata: Metadata = {
  title: "Request access",
  description:
    "Request access to Medscribe without including personal health information.",
};

const fitCards = [
  {
    icon: Smartphone,
    title: "Several moving pieces",
    body: "You coordinate visits, medications, reminders, or follow-ups across everyday life.",
  },
  {
    icon: Users,
    title: "A trusted care circle",
    body: "You want an easier way to keep a family caregiver informed when you choose.",
  },
  {
    icon: Check,
    title: "Clear, reviewable context",
    body: "You value a record you can read, check, and bring into the next conversation.",
  },
] as const;

const productCards = [
  {
    icon: CalendarDays,
    title: "Visits that stay useful",
    body: "Keep notes, transcripts, summaries, and follow-ups together so the details remain easy to revisit.",
  },
  {
    icon: Pill,
    title: "Medication routines at a glance",
    body: "See medications, schedules, reminders, and refill details in one calm, readable place.",
  },
  {
    icon: ContactRound,
    title: "A ready-to-share picture",
    body: "Bring selected medications, allergies, conditions, contacts, and preferences together in Know Me.",
  },
] as const;

export default function AccessPage() {
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
              Bring your care context together.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
              Medscribe is made for people managing repeated visits, several
              medications, and the trusted family members who help them stay
              organized.
            </p>
          </div>

          <div className="border-border-soft bg-surface rounded-[2rem] border p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-9">
            <div className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-xl">
              <Mail className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-foreground mt-5 font-serif text-3xl font-semibold">
              Request Medscribe access
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Tell us your platform and whether you are interested as a patient,
              caregiver, or both.
            </p>
            <Button asChild size="lg" className="mt-7 w-full sm:w-auto">
              <a href={ACCESS_INVITE_MAILTO}>
                Draft access request
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <p className="bg-surface-soft text-muted-foreground mt-5 rounded-xl p-4 text-xs leading-relaxed">
              Please do not send diagnoses, medication names, visit notes, or
              other health details. Email is not a medical-support or emergency
              channel.
            </p>
          </div>
        </div>
      </section>

      <section className="border-border-soft border-y bg-[#f4f0e8]/75 px-4 py-20 sm:px-6 lg:py-24 dark:bg-[#151b25]">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Made for real life</SectionLabel>
          <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Keep the details close without carrying the whole burden in your
            head.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {fitCards.map((item) => {
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
          <SectionLabel>One connected picture</SectionLabel>
          <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Visits, medications, and the people who matter—together.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {productCards.map((item) => {
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

          <div className="mt-14 rounded-[2rem] bg-[#0f4f4b] p-7 text-white sm:p-10">
            <p className="text-xs font-bold tracking-[0.14em] text-teal-100 uppercase">
              Keep your care team in the loop
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold sm:text-4xl">
              Medscribe helps you prepare for better conversations. Medical
              decisions remain with you and your qualified care team.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
