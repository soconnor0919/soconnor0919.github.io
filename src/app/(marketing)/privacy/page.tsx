import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  EyeOff,
  Hand,
  Share2,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";

import { SectionLabel } from "~/components/section-label";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "A plain-language view of how Medscribe keeps people in control of their care context.",
};

const principles = [
  {
    icon: Hand,
    title: "You decide what belongs",
    body: "Add, review, update, or remove the details that help you manage visits and medications.",
  },
  {
    icon: Share2,
    title: "You choose when to share",
    body: "Show or share selected context with a trusted caregiver or care professional when it helps.",
  },
  {
    icon: UserRoundCheck,
    title: "You remain the center",
    body: "Medscribe supports your conversations without taking decisions away from you or your care team.",
  },
] as const;

const commitments = [
  {
    title: "A deliberate device handoff",
    body: "Recordings stay encrypted on the Medscribe companion until you choose to import them into the iPhone app. Transcription runs on your phone. Choose and review a Know Me card before sending it to the device; anyone looking at its screen can read the displayed details.",
  },
  {
    title: "No advertising profile",
    body: "Your health context is not for sale and is not used to target advertising.",
  },
  {
    title: "Deliberate sharing",
    body: "Caregiver access begins with your choice, and shared information stays focused on the context you select.",
  },
  {
    title: "Clear review",
    body: "Summaries and organized details remain easy to read and check before you rely on or share them.",
  },
] as const;

const choices = [
  "Keep visit notes, summaries, and follow-ups together",
  "Maintain a medication list and reminder routine",
  "Prepare a concise Know Me view for important moments",
  "Share selected context with someone you trust",
] as const;

export default function PrivacyPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-20 sm:px-6 sm:pt-22 lg:pb-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="bg-primary-light text-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
            <ShieldCheck className="size-7" aria-hidden="true" />
          </div>
          <SectionLabel className="mt-6">Privacy</SectionLabel>
          <h1 className="text-foreground font-display mx-auto mt-5 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Your story stays yours.
          </h1>
          <p className="text-muted-foreground mx-auto mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Medscribe is designed around a simple idea: you should be able to
            carry useful care context without giving up control of it.
          </p>
        </div>
      </section>

      <section className="section-wash px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="surface-panel rounded-2xl p-6"
              >
                <Icon className="text-primary size-6" aria-hidden="true" />
                <h2 className="text-foreground font-display mt-5 text-2xl font-semibold">
                  {item.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionLabel>Plain-language commitments</SectionLabel>
            <h2 className="text-foreground font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Privacy should feel understandable.
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              The important part is not technical vocabulary. It is knowing what
              Medscribe is for, what you can control, and when another person
              sees your information.
            </p>
          </div>

          <div className="grid gap-4">
            {commitments.map((item) => (
              <article
                key={item.title}
                className="surface-panel rounded-2xl p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-light text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <EyeOff className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-display text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-night px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-teal-200 uppercase">
              Your choices
            </p>
            <h2 className="font-display mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Keep the context that helps. Share it when it matters.
            </h2>
          </div>
          <ul className="grid gap-3">
            {choices.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white/[0.06] p-4 text-sm leading-relaxed text-teal-50/90"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-teal-200"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6">
        <div className="surface-panel mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="text-foreground font-display text-3xl font-semibold">
              See how Medscribe fits into the day.
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Follow the journey from a visit to a medication routine and a
              trusted handoff.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/how-it-works">
              See how it works
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
