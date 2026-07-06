import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SectionLabel } from "~/components/section-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Solution Landscape",
  description:
    "How the medical-context space is divided today, and the combined job no existing product owns.",
};

const INTRO =
  "The space is crowded. Visit recorders, medication apps, health-record vaults, emergency IDs, and caregiver tools all exist and are improving. But each owns one slice. None owns the whole job: a private, patient-owned medical context that stays current through daily use and is ready to hand over in a crisis.";

const categories = [
  {
    category: "Patient AI visit notetakers",
    examples: "Kin, AlignCare, Emilia, PatientScribe, Medcorder",
    gap: "Capture and summarize the visit, but the summary is the product. It is not turned into an emergency-ready record a family can hand over.",
  },
  {
    category: "Medication trackers",
    examples: "Medisafe, MyTherapy, Dosecast",
    gap: "Know the pill list and reminders, but never heard the visit. No grounded understanding of why a medication is on the list or what changed.",
  },
  {
    category: "Personal health records",
    examples: "KeepMD, Available Health, Replicoo, Guava, DrOwl",
    gap: "Store and aggregate documents, but are passive. Nothing keeps them current, and a broad PHR is undifferentiated.",
  },
  {
    category: "Emergency IDs and QR cards",
    examples: "Apple Medical ID, MedicAlert, tenderID, Epic Share Everywhere",
    gap: "A static snapshot with no daily maintenance loop, so the card is only as accurate as the last manual edit.",
  },
  {
    category: "Caregiver coordination",
    examples: "Innerhive, Alula, Connected Caregiver, Caring Village",
    gap: "Tend toward tasks, calendars, and messaging. They coordinate people, not the integrity of the medical context itself.",
  },
  {
    category: "Provider-side scribes",
    examples: "Abridge, Nuance DAX, Suki",
    gap: "Built for the clinician's chart and billing, in clinical language. Not for the patient or the family carrying context across systems.",
  },
];

const bundle = [
  "Patient- and caregiver-owned mobile app",
  "On-device visit transcription",
  "Medication OCR and intake tracking",
  "Facts-first medication Q&A grounded in trusted drug data",
  "Current medications and visit context fused into one local record",
  "An emergency “know me” handoff",
  "Caregiver sharing designed for complex-care families",
  "End-to-end encrypted, peer-to-peer sharing as a core architecture",
];

export default function LandscapePage() {
  // Unpublished for now — not part of what external contacts (e.g. the
  // Northwell introduction) should see. Content is kept in place, not
  // deleted, so this is a one-line revert when we want it public again.
  redirect("/");

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 lg:space-y-20 lg:py-14">
      {/* Hero */}
      <section className="space-y-5">
        <SectionLabel>Solution landscape</SectionLabel>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl">
          The field, and the gap
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {INTRO}
        </p>
      </section>

      {/* Category map */}
      <section className="space-y-6">
        <div className="space-y-2">
          <SectionLabel>Who owns which slice</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Six categories, each solving part of it
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((item) => (
            <Card key={item.category} className="card-hover">
              <CardHeader className="gap-1.5">
                <CardTitle className="text-lg">{item.category}</CardTitle>
                <p className="text-xs font-medium tracking-wide text-primary">
                  {item.examples}
                </p>
                <CardDescription className="pt-1">{item.gap}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Closest competitor */}
      <section className="space-y-4">
        <SectionLabel>The closest direct competitor</SectionLabel>
        <Card className="border-primary/15 bg-primary-light/40">
          <CardContent className="space-y-3 pt-5 text-sm leading-relaxed text-foreground">
            <p>
              AlignCare matches the consumer bundle on paper: visit recording,
              summaries, an AI assistant, medication reminders and logging,
              documents, and caregiver sharing. It is real competition, not a
              strawman.
            </p>
            <p>
              The openings it leaves: its app-store disclosures indicate cloud
              collection and tracking rather than on-device processing; it has no
              first-class emergency handoff for a patient who cannot explain
              themselves; and its medication answers are not described as
              deterministic, on-device, facts-first rendering. Those are
              Medscribe&apos;s wedges.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* The unowned bundle */}
      <section className="space-y-6">
        <div className="space-y-2">
          <SectionLabel>What no one owns as one bundle</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The combined job is the opening
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            Each box above has partial substitutes. No single incumbent unites
            all of this into one private, patient-owned record:
          </p>
        </div>
        <Card>
          <CardContent className="pt-5">
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {bundle.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-snug text-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">
          That intersection, the daily maintenance loop that keeps an
          emergency-ready record current and private by architecture, is the lane
          Medscribe is built to own.
        </p>
      </section>
    </div>
  );
}
