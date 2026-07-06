import type { CSSProperties } from "react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MedscribeLogo } from "~/components/medscribe-logo";
import { PhoneMockup } from "~/components/phone-mockup";
import { PrintButton } from "~/components/print-button";
import { SectionLabel } from "~/components/section-label";
import { BETA_FOOTER_NOTE, BETA_SUMMARY } from "~/lib/beta";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
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
  "Medscribe is a private, patient-owned medical record and companion for people managing ongoing care and the families beside them. It captures visits, makes medications and instructions easy to understand and keep current day to day, and stays ready to hand to a caregiver, a new specialist, or an ER. Everything runs on the device; nothing is uploaded.";

const PROBLEM =
  "Care is fragmented and hard to carry. Patients forget most of what they're told in a visit, juggle medications with no clear picture of what each is for, and lose track of what changed and why. Then they end up somewhere new: a covering doctor, a specialist, an ER outside their network, and none of it travels with them. The family knows, but can't produce a clear, current record under pressure.";

const PROBLEM_BROADER =
  "This is not a rare edge case. It happens every day, to patients with Parkinson's, diabetes, heart disease, dementia, and a hundred other conditions that require precise, continuous management across a fragmented system. The failure is not that families don't care. The failure is that the patient's context does not travel with them.";

const WHO_ITS_FOR =
  "Anyone managing serious, ongoing care across a fragmented health system, and the families who coordinate it. It spans conditions and ages, and eventually touches almost everyone. The failure is simple: the patient's context does not travel with them.";

const DIFFERENTIATION =
  "The market is full of AI visit recorders, medication trackers, health-record apps, and emergency QR cards, each owning one slice. None owns the whole job. In Medscribe, the daily tools are the maintenance system for one emergency-ready record.";

const differentiators = [
  {
    title: "The record is the product",
    body: "Recording, scanning, reminders, and Q&A all feed one private record you actually keep current, useful every day and ready to hand over when it counts. Competitors ship visit summaries; we ship the record you own and carry.",
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

const MOAT =
  "The privacy promise is easy to claim. The execution is not. Medscribe runs a fine-tuned medical model entirely on the phone, built and measured rather than bolted on.";

const moat = [
  {
    title: "A model tuned for this job",
    body: "A compact, multi-task model handles label scanning, structured extraction, and safe medication Q&A on the device. Fine-tuning lifted prescription-label field extraction from 0% to 97% in evaluation.",
  },
  {
    title: "Safety you can measure",
    body: "Each release is scored against a held-out set for grounding and safe refusals. Unsafe-prompt refusals reached 100% after tuning, so “defers to a clinician” is a tested behavior, not a hope.",
  },
  {
    title: "Context that compounds",
    body: "Real visit transcripts, a real medication list, and bundled drug facts fuse into one local record, value that grows with use and is hard to replicate without the same on-device capture.",
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
    title: "The newly diagnosed, overwhelmed",
    body: "After a new diagnosis, a patient leaves with a changed medication schedule, lifestyle instructions, and follow-ups they half-remember. By the next visit, the provider can't tell what was understood, tried, or missed.",
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

const FOR_HEALTH_SYSTEMS =
  "Out-of-hospital care is the blind spot. A health system loses sight of the patient the moment they leave, and only learns what happened when they return, often in worse shape. Medscribe turns that gap into an ongoing connection the system can offer under its own brand.";

const forHealthSystems = [
  {
    title: "An ongoing touchstone",
    body: "The record lives on the patient's device; they choose what to share back, securely and revocably. That gives the system a consented window into care between visits, and a reason patients return instead of going dark.",
  },
  {
    title: "A branded surface, not a cost center",
    body: "Skinned per provider, it is a patient-facing presence the system owns, working the levers it is measured on: keeping patients in-network, improving medication adherence and follow-through, and reducing avoidable readmissions.",
  },
  {
    title: "Complements the EHR, doesn't compete",
    body: "It integrates with Epic or any EHR rather than replacing it. The patient stays in control, and because the record is patient-owned, it persists even if the system changes EHRs.",
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

        {/* Where we fit */}
        <section className="space-y-5">
          <SectionLabel>Where we fit</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The field is full of slices.
          </h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Visit recorders, medication apps, record vaults, emergency IDs, and
            caregiver tools each solve one part of the problem. None keeps a
            private, patient-owned record current day to day and ready to hand
            over in a crisis.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Visit recorders",
              "Medication apps",
              "Record vaults",
              "Emergency IDs",
              "Caregiver tools",
            ].map((slice) => (
              <Badge key={slice} variant="outline">
                {slice}
              </Badge>
            ))}
          </div>
          <Card className="border-primary-button/20 bg-primary-button text-white">
            <CardContent className="pt-5">
              <p className="leading-relaxed">
                Medscribe connects the daily loop to the emergency handoff: one
                private record that stays current through normal use and is ready
                when the system does not know the patient.
              </p>
            </CardContent>
          </Card>
          <Link
            href="/landscape"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See the full landscape
            <ArrowRight className="size-4" />
          </Link>
        </section>

        {/* Under the hood */}
        <section className="space-y-6">
          <SectionLabel>Under the hood</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Easy to claim. Hard to copy.
          </h2>
          <p className="max-w-4xl leading-relaxed text-muted-foreground">
            {MOAT}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {moat.map((item) => (
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

        {/* For health systems */}
        <section className="space-y-6">
          <SectionLabel>For health systems</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            An ongoing touchstone, not another portal.
          </h2>
          <p className="max-w-4xl leading-relaxed text-muted-foreground">
            {FOR_HEALTH_SYSTEMS}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {forHealthSystems.map((item) => (
              <Card key={item.title} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Beta */}
        <section className="flex flex-col gap-5 rounded-xl border border-border-soft bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {BETA_SUMMARY} If you&apos;d like to try it, reach out.
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
        className="print-sheet hidden print:flex print:h-[10.5in] print:flex-col print:px-[0.4in] print:pt-[0.22in] print:pb-[0.1in] print:text-[11pt] print:leading-[1.2]"
      >
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_0.94in] items-stretch gap-4 border-b border-teal-900/10 pb-1.5">
          <div className="flex flex-col justify-between py-0.5">
            <p className="text-[10pt] font-semibold tracking-[0.18em] text-primary uppercase">
              Executive Summary · June 2026
            </p>
            <div className="mt-1.5 flex items-center gap-2.5">
              <MedscribeLogo className="h-[20pt] w-auto text-foreground" />
              <h1 className="font-serif text-[22pt] leading-none font-semibold tracking-tight text-foreground">
                Medscribe
              </h1>
            </div>
            <p className="mt-1.5 font-serif text-[12pt] leading-snug font-medium tracking-tight text-foreground italic">
              {TAGLINE}
            </p>
            <p className="mt-2 text-[11pt] leading-[1.2] text-slate-700">
              {SNAPSHOT}
            </p>
          </div>
          <div className="flex justify-end">
            <div className="h-[1.78in] w-[0.88in] overflow-hidden rounded-[11px] border-[3px] border-slate-950 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.14)]">
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
        <section className="border-b border-teal-900/10 pt-1 pb-1">
          <h2 className="font-serif text-[12.5pt] font-semibold tracking-tight text-foreground">
            The Problem
          </h2>
          <p className="mt-1 text-[11pt] leading-[1.2] text-slate-700">
            {PROBLEM}
          </p>
        </section>

        {/* Who It's For */}
        <section className="border-b border-teal-900/10 pt-1 pb-1">
          <h2 className="font-serif text-[12.5pt] font-semibold tracking-tight text-foreground">
            Who It&apos;s For
          </h2>
          <p className="mt-1 text-[11pt] leading-[1.2] text-slate-700">
            {WHO_ITS_FOR}
          </p>
        </section>

        {/* Why This Is Different */}
        <section className="border-b border-teal-900/10 pt-1 pb-1">
          <h2 className="font-serif text-[12.5pt] font-semibold tracking-tight text-foreground">
            Why This Is Different
          </h2>
          <div className="mt-1.5 grid grid-cols-3 gap-x-6">
            {differentiators.map((item) => (
              <p
                key={item.title}
                className="text-[11pt] leading-[1.2] text-slate-700"
              >
                <span className="font-semibold text-foreground">
                  {item.title}.
                </span>{" "}
                {item.body}
              </p>
            ))}
          </div>
        </section>

        {/* Under The Hood */}
        <section className="border-b border-teal-900/10 pt-1 pb-1">
          <h2 className="font-serif text-[12.5pt] font-semibold tracking-tight text-foreground">
            Under The Hood
          </h2>
          <div className="mt-1 grid grid-cols-3 gap-x-6">
            {moat.map((item) => (
              <p
                key={item.title}
                className="text-[11pt] leading-[1.2] text-slate-700"
              >
                <span className="font-semibold text-foreground">
                  {item.title}.
                </span>{" "}
                {item.body}
              </p>
            ))}
          </div>
        </section>

        {/* For Health Systems */}
        <section className="pt-1">
          <h2 className="font-serif text-[12.5pt] font-semibold tracking-tight text-foreground">
            For Health Systems
          </h2>
          <div className="mt-1 grid grid-cols-3 gap-x-6">
            {forHealthSystems.map((item) => (
              <p
                key={item.title}
                className="text-[11pt] leading-[1.2] text-slate-700"
              >
                <span className="font-semibold text-foreground">
                  {item.title}.
                </span>{" "}
                {item.body}
              </p>
            ))}
          </div>
        </section>

        <footer className="mt-auto flex items-center justify-between border-t border-teal-900/10 pt-1.5 text-[10pt] text-slate-500">
          <p>Sean O&apos;Connor</p>
          <p className="text-slate-400">{BETA_FOOTER_NOTE}</p>
        </footer>
      </article>
    </>
  );
}
