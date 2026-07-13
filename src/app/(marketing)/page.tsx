import { HeartPulse, Layers, ShieldCheck } from "lucide-react";

import { PhoneMockup } from "~/components/phone-mockup";
import { SectionLabel } from "~/components/section-label";
import { BETA_INVITE_MAILTO } from "~/lib/beta";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const fit = [
  {
    icon: Layers,
    title: "Complements Epic — doesn't compete",
    body: "Different question. Epic answers “what does Northwell know about this patient?” Medscribe answers “what does the patient carry everywhere else?” With the patient's consent, the out-of-network and between-visit context it captures flows back into the workflows Northwell already runs — raising the value of the Epic investment rather than competing for it.",
  },
  {
    icon: HeartPulse,
    title: "Patient-centered where it counts",
    body: "The emergency handoff, the family caregiver covering a shift, the newly-diagnosed patient who half-remembers the plan. Fewer blank handoffs, safer medication moments, patients who stay engaged instead of going dark.",
  },
  {
    icon: ShieldCheck,
    title: "Private by architecture",
    body: "The sensitive work — transcription, medication questions, building the record — runs entirely on the device, not the cloud. No health data sent to a server for AI processing, no new inbox to breach, no BAA to negotiate.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Phone floats right on sm+; prose sections wrap around it like a newspaper column */}
      <div className="animate-fade-in-up-delay-1 mx-auto mb-8 flex justify-center sm:float-right sm:mx-0 sm:ml-8 sm:mb-4 lg:ml-10">
        <PhoneMockup
          src="/screenshots/home.png"
          alt="Medscribe home screen"
          width={200}
          priority
        />
      </div>

      <div className="space-y-10 lg:space-y-12">
        {/* Hero */}
        <section className="animate-fade-in-up space-y-5">
          <SectionLabel>Executive summary · Northwell Health</SectionLabel>
          <h1 className="font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Be known when care gets complicated
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Medscribe is a private, patient-owned medical record that lives on the
            patient&apos;s phone — and stays with them exactly where Epic
            can&apos;t follow.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">On-device · no cloud AI</Badge>
            <Badge variant="outline">Emergency-ready</Badge>
            <Badge variant="outline">Complements Epic</Badge>
            <Badge variant="outline">iOS · Android beta</Badge>
          </div>
        </section>

        {/* What it is */}
        <section className="animate-fade-in-up space-y-3">
          <SectionLabel>What it is</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            A medical record the patient owns and carries
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Current medications, allergies, baseline, visit summaries, and an
            emergency &ldquo;know-me&rdquo; record — kept current through everyday
            use, and ready to hand to a caregiver, a new doctor, or an ER in seconds.
            Everything runs on the device. Nothing is uploaded.
          </p>
        </section>

        {/* The gap Epic can't close */}
        <section className="animate-fade-in-up space-y-3">
          <SectionLabel>The gap Epic can&apos;t close</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The record that leaves the building with the patient
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Epic is Northwell&apos;s system of record — the definitive account of
            care inside the network. What no institutional EHR is built to be is the
            record the patient owns and carries everywhere else: the out-of-network
            ER, a specialist on a different Epic instance, the weeks at home between
            visits. That out-of-hospital stretch is a structural blind spot — the
            system loses sight of the patient the moment they leave, and often only
            learns what happened when they return, worse.
          </p>
        </section>

        {/* What makes it different */}
        <section className="animate-fade-in-up space-y-3">
          <SectionLabel>What makes it different</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            No one else owns the whole job
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            The market is full of single-purpose apps — visit recorders, medication
            trackers, record vaults, emergency-ID cards, caregiver portals. Each owns
            one slice. None keeps a private, patient-owned record that stays current
            through daily use, is ready to hand over in a crisis, and runs entirely on
            the patient&apos;s own device. Medscribe is that combination — and no
            existing product has it.
          </p>
        </section>

        {/* Why it fits Northwell — clear float so the card grid spans full width */}
        <section className="animate-fade-in-up clear-both space-y-6">
          <div className="space-y-2">
            <SectionLabel>Why it fits Northwell</SectionLabel>
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to strengthen the Epic investment, not compete with it
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {fit.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="card-hover">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-[10px] bg-primary-light">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.body}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Who's behind it + the ask */}
        <section className="animate-fade-in-up">
          <Card className="overflow-hidden border-primary-button/20 bg-primary-button text-white">
            <CardHeader className="gap-4">
              <div className="space-y-3">
                <CardTitle className="text-white">Who&apos;s behind it</CardTitle>
                <CardDescription className="leading-relaxed text-white/80">
                  Sean O&apos;Connor built Medscribe after watching his own family try
                  to hold this together for his grandfather — the record scattered
                  exactly when it mattered most. Bucknell computer-science engineer;
                  the app is live in beta on iOS and Android today.
                </CardDescription>
                <CardDescription className="leading-relaxed text-white/80">
                  The ask is a short conversation about whether an out-of-hospital,
                  patient-owned context layer — one that feeds Northwell&apos;s Epic
                  investment rather than competes with it — is worth exploring
                  together.
                </CardDescription>
              </div>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-fit border-white/30 bg-white text-primary-button hover:bg-white/90"
              >
                <a href={BETA_INVITE_MAILTO}>Start the conversation</a>
              </Button>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}
