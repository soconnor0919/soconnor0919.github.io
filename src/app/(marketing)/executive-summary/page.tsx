import type { CSSProperties } from "react";

import type { Metadata } from "next";
import Image from "next/image";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { PhoneMockup } from "~/components/phone-mockup";
import { PrintButton } from "~/components/print-button";
import { SectionLabel } from "~/components/section-label";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Executive Summary",
  description:
    "One-page executive summary for Medscribe, a private medical context app for families managing complex care.",
};

const TAGLINE =
  "Your medical truth, in your pocket, and only where you say it goes.";

const SNAPSHOT =
  "Medscribe is a private, emergency-ready medical record for families managing complex care. Patients and caregivers keep medications, visits, timing, and baseline current day to day, so a clinician or provider can be handed exactly what matters when the system does not know the patient.";

const PROBLEM =
  "Someone managing a serious condition ends up somewhere new: an ER outside their network, a covering doctor, a hospital that runs different software. Their records don't transfer. The team assesses them on how they present, not on their baseline, their exact medication timing, or what changed at their last visit. The family is there and they know, but they can't produce a clear, structured record under pressure.";

const PROBLEM_BROADER =
  "This is not a rare edge case. It happens every day, to patients with Parkinson's, diabetes, heart disease, dementia, and a hundred other conditions that require precise, continuous management across a fragmented system. The failure is not that families don't care. The failure is that the patient's context does not travel with them.";

const DIFFERENTIATION =
  "The market is full of AI visit recorders, medication trackers, health-record apps, and emergency QR cards, each owning one slice. None owns the whole job. In Medscribe, the daily tools are the maintenance system for one emergency-ready record.";

const differentiators = [
  {
    title: "The record is the product",
    body: "Recording, scanning, reminders, and Q&A keep one private, emergency-ready record accurate. Competitors ship visit summaries; we ship a record you can hand over in a crisis.",
  },
  {
    title: "Private by architecture",
    body: "AI runs on-device: no cloud processing, no health-data upload, no tracking, no account. Others say \"encrypted\" while their store disclosures admit cloud collection.",
  },
  {
    title: "Facts-first, not a guess",
    body: "Medication answers render trusted drug facts deterministically, deferring dosing and diagnosis to a clinician or pharmacist. Built for complex-care families, not a general health bot.",
  },
];

const scenarios = [
  {
    title: "The ER that doesn't know you",
    body: "A patient on time-critical medication ends up at a hospital outside their network. Missing a dose by hours isn't an inconvenience; it's a medical event. Nobody has the schedule, and the family can't produce it under pressure.",
  },
  {
    title: "The caregiver handoff",
    body: "An adult child manages a parent's medications, appointments, and history. When they're not there, the context disappears: a sibling visits, a home aide covers, a shift changes. Critical details live in one person's memory.",
  },
  {
    title: "The new diabetic, overwhelmed",
    body: "A newly diagnosed patient leaves with insulin timing, diet changes, and follow-ups they half-remember. By the next visit, the provider can't tell what was understood, tried, or missed.",
  },
];

const impact = [
  {
    title: "Fewer blank handoffs",
    body: "When a caregiver or clinician takes over, the facts are already assembled: conditions, medications, allergies, baseline, contacts, and recent changes.",
  },
  {
    title: "Safer medication moments",
    body: "Time-critical schedules and dose history stay visible, so a missed or delayed medication is easier to catch before it becomes a crisis.",
  },
  {
    title: "Patients and providers aligned",
    body: "Families see what changed and why; providers get a current snapshot instead of reconstructing it from a stressed family's memory.",
  },
];

const printLightTokens = {
  "--color-foreground": "#0f172a",
  "--color-primary": "#0f766e",
  "--color-surface": "#ffffff",
  "--color-border-soft": "#e2e8f0",
  "--color-muted-foreground": "#475569",
  color: "#0f172a",
} as CSSProperties;

export default function ExecutiveSummaryPage() {
  return (
    <>
      {/* ===================== SCREEN ===================== */}
      <div className="print-hidden mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 lg:space-y-20 lg:py-14">
        {/* Hero */}
        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:gap-14">
          <div className="space-y-5">
            <SectionLabel>Executive Summary · June 2026</SectionLabel>
            <div className="space-y-3">
              <h1 className="font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                Medscribe
              </h1>
              <p className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {TAGLINE}
              </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {SNAPSHOT}
            </p>
          </div>

          <div className="justify-self-center lg:justify-self-end">
            <PhoneMockup
              src="/screenshots/home.png"
              alt="Medscribe home screen"
              width={200}
              priority
            />
          </div>
        </section>

        {/* The Problem */}
        <section className="space-y-5">
          <SectionLabel>The problem</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The patient&apos;s context does not travel with them.
          </h2>
          <div className="grid gap-6 leading-relaxed text-muted-foreground lg:grid-cols-2 lg:gap-10">
            <p>{PROBLEM}</p>
            <p className="font-medium text-foreground">{PROBLEM_BROADER}</p>
          </div>
        </section>

        {/* Scenarios */}
        <section className="space-y-6">
          <SectionLabel>Who this is for</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The moments where context is everything.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {scenarios.map((scenario) => (
              <Card key={scenario.title} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                  <CardDescription>{scenario.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Differentiation */}
        <section className="space-y-6">
          <SectionLabel>Why this is different</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Everyone owns a slice. We own the whole job.
          </h2>
          <p className="max-w-4xl leading-relaxed text-muted-foreground">
            {DIFFERENTIATION}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {differentiators.map((item) => (
              <Card key={item.title} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="space-y-6">
          <SectionLabel>Potential impact</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Less panic, more context, better handoffs.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {impact.map((item) => (
              <Card
                key={item.title}
                className="card-hover border-primary-button/20 bg-primary-button text-white"
              >
                <CardHeader>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                  <CardDescription className="text-white/75">
                    {item.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Beta */}
        <section className="flex flex-col gap-5 rounded-xl border border-border-soft bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            A beta is available on iOS through TestFlight. Everything runs
            privately on the device, so no health data leaves the phone. If
            you&apos;d like to try it, reach out.
          </p>
          <PrintButton size="lg" className="shrink-0" />
        </section>

        <p className="border-t border-border-soft pt-6 text-sm text-muted-foreground">
          Sean O&apos;Connor
        </p>
      </div>

      {/* ===================== PRINT: dense one-page PDF ===================== */}
      <article
        style={printLightTokens}
        className="print-sheet hidden overflow-hidden print:flex print:h-[10.5in] print:flex-col print:justify-between print:px-[0.4in] print:py-[0.25in] print:text-[11pt] print:leading-[1.25]"
      >
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_1.1in] items-stretch gap-3 border-b border-teal-900/10 pb-2">
          <div className="flex flex-col justify-between py-0.5">
            <p className="text-[11pt] font-semibold tracking-[0.15em] text-primary uppercase">
              Executive Summary · June 2026
            </p>
            <div className="mt-2 flex items-center gap-2.5">
              <MedscribeLogo className="h-[20pt] w-auto text-foreground" />
              <h1 className="font-serif text-[22pt] leading-none font-semibold tracking-tight text-foreground">
                Medscribe
              </h1>
            </div>
            <p className="mt-2 font-serif text-[12pt] leading-snug font-medium tracking-tight text-foreground italic">
              {TAGLINE}
            </p>
            <p className="mt-3 text-[11pt] leading-[1.25] text-slate-700">
              {SNAPSHOT}
            </p>
          </div>
          <div className="flex justify-end">
            <div className="h-[2in] w-[0.94in] overflow-hidden rounded-[11px] border-[3px] border-slate-950 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.14)]">
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

        {/* The Problem */}
        <section className="border-b border-teal-900/10 py-1">
          <h2 className="font-serif text-[12pt] font-semibold tracking-tight text-foreground">
            The Problem
          </h2>
          <p className="mt-0.5 text-[11pt] leading-[1.25] text-slate-700">
            {PROBLEM} {PROBLEM_BROADER}
          </p>
        </section>

        {/* Who This Is For */}
        <section className="border-b border-teal-900/10 py-1">
          <h2 className="font-serif text-[12pt] font-semibold tracking-tight text-foreground">
            Who This Is For
          </h2>
          <div className="mt-0.5 grid grid-cols-3 gap-x-4">
            {scenarios.map((scenario) => (
              <div key={scenario.title}>
                <p className="text-[11pt] font-semibold leading-[1.25] text-foreground">
                  {scenario.title}
                </p>
                <p className="text-[11pt] leading-[1.25] text-slate-700">
                  {scenario.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why This Is Different */}
        <section className="border-b border-teal-900/10 py-1">
          <h2 className="font-serif text-[12pt] font-semibold tracking-tight text-foreground">
            Why This Is Different
          </h2>
          <p className="mt-0.5 text-[11pt] leading-[1.25] text-slate-700">
            {DIFFERENTIATION}
          </p>
          <div className="mt-1 grid grid-cols-3 gap-x-4">
            {differentiators.map((item) => (
              <p
                key={item.title}
                className="text-[11pt] leading-[1.25] text-slate-700"
              >
                <span className="font-semibold text-foreground">
                  {item.title}.
                </span>{" "}
                {item.body}
              </p>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="py-1">
          <h2 className="font-serif text-[12pt] font-semibold tracking-tight text-foreground">
            Impact
          </h2>
          <div className="mt-0.5 grid grid-cols-3 gap-x-4">
            {impact.map((item) => (
              <p
                key={item.title}
                className="text-[11pt] leading-[1.25] text-slate-700"
              >
                <span className="font-semibold text-foreground">
                  {item.title}.
                </span>{" "}
                {item.body}
              </p>
            ))}
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-teal-900/10 pt-1 text-[11pt] text-slate-500">
          <p>Sean O&apos;Connor</p>
          <p className="text-slate-400">
            A beta is available on iOS through TestFlight.
          </p>
        </footer>
      </article>
    </>
  );
}
