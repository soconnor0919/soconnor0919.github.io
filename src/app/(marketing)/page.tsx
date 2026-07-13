import { HeartPulse, Layers, ShieldCheck, Users } from "lucide-react";

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
    title: "Complements Epic, doesn't compete",
    body: "Different job. Epic is the record of care inside Northwell. Medscribe is the patient-owned layer beside it, holding what Epic can't reach: the non-Epic care, the between-visit context, the emergency handoff. With the patient's consent, that context flows back into the workflows Northwell already runs, raising the value of the Epic investment rather than competing for it.",
  },
  {
    icon: Users,
    title: "Keeps patients active in their own care",
    body: "Reminders and refills the app sets for them, dose tracking, and, between visits, questions routed back to their own care team rather than out to a search engine. Low-friction by design, because a tool the patient actually uses is what turns into adherence, engagement, and in-network follow-through, the things Northwell is measured on.",
  },
  {
    icon: HeartPulse,
    title: "Patient-centered where it counts",
    body: "The emergency handoff, the family caregiver covering a shift, the newly-diagnosed patient who half-remembers the plan. Fewer blank handoffs, safer medication moments, patients who stay engaged instead of going dark.",
  },
  {
    icon: ShieldCheck,
    title: "Private by architecture",
    body: "The sensitive work (summarizing visits, answering medication questions, building the record) runs entirely on the device, not the cloud. No health data sent to a server for AI processing, no new inbox to breach, no BAA to negotiate.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Phone floats right on sm+; prose sections wrap around it like a newspaper column */}
      <div className="animate-fade-in-up-delay-1 mx-auto mb-8 flex justify-center sm:float-right sm:mx-0 sm:mb-4 sm:ml-8 lg:ml-10">
        <PhoneMockup
          src="/screenshots/home.png"
          alt="Medscribe home screen"
          width={200}
          priority
        />
      </div>

      <div className="space-y-10 lg:space-y-12">
        {/* Origin */}
        <section className="animate-fade-in-up space-y-5">
          <SectionLabel>Executive summary · Northwell Health</SectionLabel>
          <h1 className="text-foreground font-serif text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Be known when care gets complicated
          </h1>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed sm:text-lg">
            <p>
              A grandfather with three adult children, each living twenty to
              fifty minutes away. None able to be at every appointment. No
              shared, current view of his medications, his visits, or what had
              changed.
            </p>
            <p>
              Then came the emergency. A fall. A hospital that did not
              understand his condition. Some of his medications were
              time-critical. They were administered incorrectly, his decline was
              misread, the wrong path was taken, and he passed six weeks later.
              The clinicians were not negligent. The system was blind to who he
              was, and no trustworthy picture of him existed to hand over.
            </p>
            <p className="text-foreground font-medium">
              Medscribe is the private, patient-owned record built for that gap:
              the whole picture, held by the patient, ready to hand over the
              moment the chart in front of you doesn&apos;t have it.
            </p>
          </div>
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
          <p className="text-muted-foreground leading-relaxed">
            Current medications, allergies, baseline, visit summaries, and an
            emergency &ldquo;know-me&rdquo; record, kept current through
            everyday use, and ready to hand to a caregiver, a new doctor, or an
            ER in seconds. Everything runs on the device. Nothing is uploaded.
          </p>
          <div className="border-primary/30 space-y-2 border-l-2 pl-4">
            <p className="text-foreground text-sm font-medium">
              How the record stays current (live in beta today)
            </p>
            <ul className="text-muted-foreground space-y-1.5 text-sm leading-relaxed">
              <li>
                <span className="text-foreground">Visit summaries: </span>type
                or paste notes, import MyChart and portal after-visit summaries
                from a screenshot, or attach photos and documents; optional
                consent-gated audio recording for patients who want it. Any path
                feeds the same on-device summary.
              </li>
              <li>
                <span className="text-foreground">Medication management: </span>
                pill-bottle label recognition, reminders, and on-device Q&amp;A
                grounded in FDA drug facts
              </li>
              <li>
                <span className="text-foreground">Emergency handoff: </span>a
                know-me card and encrypted caregiver sharing, patient-controlled
              </li>
            </ul>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Structured MyChart / FHIR export import is on the roadmap:
              import-and-own, not write-back.
            </p>
          </div>
        </section>

        {/* The gap Epic's own tools can't close */}
        <section className="animate-fade-in-up space-y-3">
          <SectionLabel>Where the picture breaks</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Epic knows what Epic sees
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            MyChart is excellent inside the Epic walls. It puts the chart on the
            patient&apos;s phone, links their Epic portals through MyChart
            Central, and lets them share with a caregiver or a provider. What no
            institutional record can be is the whole picture: the urgent care,
            the community specialist, the facility that isn&apos;t on Epic; the
            changes between visits; the context a patient keeps themselves. Epic
            aggregates Epic. And when it matters most, at an out-of-network ER,
            or when the patient can&apos;t generate a share code, the record
            that&apos;s actually there is the one they already carry.
          </p>
        </section>

        {/* What makes it different */}
        <section className="animate-fade-in-up space-y-3">
          <SectionLabel>What makes it different</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            No one else owns the whole job
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Existing Electronic Health Record (EHR) systems owns the
            institutional view, and every institutional tool stops at its own
            walls. Around them, the market is full of single-purpose apps: visit
            notetakers, medication trackers, record vaults, emergency-ID cards.
            Each owns one slice. None holds a private, patient-owned record that
            spans every system, Epic and non-Epic alike, stays current through
            daily use, and is ready to hand over in a crisis, all on the
            patient&apos;s own device. Medscribe is that combination, beside
            Epic, not instead of it.
          </p>
        </section>

        {/* Why it fits Northwell: clear float so the card grid spans full width */}
        <section className="animate-fade-in-up clear-both space-y-6">
          <div className="space-y-2">
            <SectionLabel>Why it fits Northwell</SectionLabel>
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to strengthen the Epic investment, not compete with it
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {fit.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="card-hover">
                  <CardHeader>
                    <div className="bg-primary-light flex size-10 items-center justify-center rounded-[10px]">
                      <Icon className="text-primary size-5" />
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
          <Card className="border-primary-button/20 bg-primary-button overflow-hidden text-white">
            <CardHeader className="gap-4">
              <div className="space-y-3">
                <CardTitle className="text-white">
                  Who&apos;s behind it
                </CardTitle>
                <CardDescription className="leading-relaxed text-white/80">
                  Sean O&apos;Connor, a Bucknell computer science and engineering
                  graduate, built Medscribe after watching his own family try to
                  hold this together for his grandfather, when the record
                  scattered exactly at the moment it mattered most. It is live in
                  beta on iOS and Android today.
                </CardDescription>
                <CardDescription className="leading-relaxed text-white/80">
                  The ask is a short conversation about whether a patient-owned
                  record that spans the systems Epic can&apos;t reach, and feeds
                  that context back into Northwell&apos;s Epic, is worth
                  exploring together.
                </CardDescription>
              </div>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-primary-button w-fit border-white/30 bg-white hover:bg-white/90"
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
