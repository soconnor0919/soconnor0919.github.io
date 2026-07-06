import {
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Lock,
  Mic,
  Pill,
  Shield,
  Users,
} from "lucide-react";

import { FeatureShowcase } from "~/components/feature-showcase";
import { PhoneMockup } from "~/components/phone-mockup";
import { SectionLabel } from "~/components/section-label";
import {
  BETA_CTA_BODY,
  BETA_CTA_TITLE,
  BETA_INVITE_MAILTO,
} from "~/lib/beta";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const quickActions = [
  {
    icon: HeartPulse,
    title: "Know Me card",
    meta: "Baseline, conditions, allergies",
    featured: true,
  },
  {
    icon: Pill,
    title: "Time-critical meds",
    meta: "Schedules caregivers can trust",
  },
  {
    icon: Mic,
    title: "Visit capture",
    meta: "Consent-gated, on-device",
  },
  {
    icon: Users,
    title: "Caregiver handoff",
    meta: "One current shared truth",
  },
];

const pillars = [
  {
    icon: ClipboardList,
    title: "Keep the record current",
    body: "Capture visits, scan labels, and keep conditions, medications, allergies, contacts, and caregiver notes in one portable record.",
  },
  {
    icon: AlertTriangle,
    title: "Make the critical context obvious",
    body: "The emergency view prioritizes the facts clinicians need fast: baseline, time-critical meds, active conditions, allergies, and who to call.",
  },
  {
    icon: Shield,
    title: "Stay private by architecture",
    body: "Transcription, OCR, and medication chat run locally. No cloud AI processing. Sharing should be explicit, revocable, and encrypted.",
  },
];

const impact = [
  {
    title: "Fewer blank handoffs",
    body: "When a caregiver is overwhelmed, the important facts are already assembled: conditions, medications, allergies, baseline, contacts, and recent changes.",
  },
  {
    title: "Safer medication moments",
    body: "Time-critical schedules and dose history stay visible, so a missed or delayed medication is easier to catch before it becomes a crisis.",
  },
  {
    title: "More confident families",
    body: "Caregivers can see what changed, where it came from, and what still needs a clinician or pharmacist instead of guessing from memory.",
  },
];

export default function HomePage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-8 sm:px-6 sm:py-12 lg:space-y-20 lg:py-14">

      {/* Hero */}
      <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(230px,280px)] lg:gap-14">
        <div className="space-y-6">
          <div className="animate-fade-in-up space-y-5">
            <SectionLabel>Medscribe · Private complex-care context</SectionLabel>
            <h1 className="max-w-2xl font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Be known when care gets complicated
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A private medical context app for families managing complex care.
              It keeps visits, medications, baseline, contacts, allergies, and
              emergency facts ready before the chart catches up.
            </p>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>

          <div className="animate-fade-in-up-delay-1 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="/executive-summary">
                Read executive summary
                <ChevronRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">See how it works</a>
            </Button>
          </div>

          <div className="animate-fade-in-up-delay-2 flex flex-wrap gap-2">
            <Badge variant="success">Beta available</Badge>
            <Badge variant="outline">iOS · TestFlight</Badge>
            <Badge variant="outline">Android · Play internal</Badge>
            <Badge variant="outline">Emergency-ready</Badge>
            <Badge variant="outline">No cloud AI</Badge>
          </div>
        </div>

        <div className="animate-fade-in-up-delay-3 flex justify-center lg:justify-end">
          <div className="flex w-fit items-start justify-center">
            <PhoneMockup
              src="/screenshots/home.png"
              alt="Medscribe home dashboard"
              priority
              width={190}
            />
          </div>
        </div>
      </section>

      {/* Strategic spine */}
      <section className="animate-fade-in-up space-y-5">
        <SectionLabel>The story</SectionLabel>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              The story scatters right when it matters
            </h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              A daughter remembers the medication schedule. A spouse knows what
              normal looks like. A specialist mentioned a change three visits ago.
              In a crisis, those details are scattered across people, portals, and
              memory.
            </p>
          </div>
          <div className="rounded-lg border border-border-soft bg-surface p-5 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-3">
              <HeartPulse className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-semibold tracking-tight">
                  One current story
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Medscribe gives the family a private place to keep that context
                  alive: current meds, timing, baseline, allergies, recent visit
                  summaries, emergency contacts, and the source trail behind each
                  fact.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Card
                key={action.title}
                className={`card-hover ${action.featured ? "border-primary-button/20 bg-primary-button text-white" : ""}`}
              >
                <CardHeader className="gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-[10px] ${
                      action.featured ? "bg-white/18" : "bg-primary-light"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${action.featured ? "text-white" : "text-primary"}`}
                    />
                  </div>
                  <div>
                    <CardTitle className={action.featured ? "text-white" : ""}>
                      {action.title}
                    </CardTitle>
                    <CardDescription
                      className={action.featured ? "text-white/72" : ""}
                    >
                      {action.meta}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Interactive feature showcase */}
      <section id="features" className="animate-fade-in-up scroll-mt-24 space-y-5">
        <div className="space-y-2">
          <SectionLabel>The record</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The pieces that keep the story current
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Visits, medications, reminders, search, and questions all point toward
            the same outcome: a record the family can trust when the stakes rise.
          </p>
        </div>
        <FeatureShowcase />
      </section>

      {/* Privacy */}
      <section id="privacy" className="animate-fade-in-up scroll-mt-24 space-y-6">
        <div className="space-y-3">
          <SectionLabel>Why this is different</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for the family record, not another cloud inbox
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            The crowded space already has visit recorders, medication apps, and
            caregiver portals. Medscribe&apos;s wedge is the private, portable
            context layer families control before an institution is ready.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <Card key={pillar.title} className="card-hover">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-[10px] bg-primary-light">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{pillar.title}</CardTitle>
                  <CardDescription>{pillar.body}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Card className="border-primary/15 bg-primary-light/40">
          <CardContent className="flex items-start gap-4 pt-5">
            <Lock className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              All AI models run on your device. No health data is uploaded for
              processing. The medication chatbot stays in drug-information
              territory. It defers dosing and diagnosis questions to your
              clinician or pharmacist.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Screenshot strip */}
      <section className="animate-fade-in-up space-y-6">
        <SectionLabel>What travels with them</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { src: "/screenshots/emergency-record.png", label: "Emergency record" },
            { src: "/screenshots/appointment-summary.png", label: "Visit summary" },
            { src: "/screenshots/medications.png", label: "Medication list" },
            { src: "/screenshots/chat.png", label: "Medication questions" },
          ].map((shot) => (
            <Card key={shot.src} className="card-hover overflow-hidden">
              <div className="flex min-h-[270px] items-start justify-center bg-surface-soft p-4">
                <PhoneMockup src={shot.src} alt={shot.label} width={112} />
              </div>
              <p className="border-t border-border-soft px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                {shot.label}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="animate-fade-in-up scroll-mt-24 space-y-6">
        <div className="space-y-3">
          <SectionLabel>Potential impact</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Less panic, more context, better handoffs
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            The goal is simple: make the person easier to understand at the exact
            moment their care team has the least context.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {impact.map((item) => (
            <Card key={item.title} className="card-hover">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="animate-fade-in-up">
        <Card className="overflow-hidden border-primary-button/20 bg-primary-button text-white">
          <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-white">{BETA_CTA_TITLE}</CardTitle>
              <CardDescription className="text-white/75">
                {BETA_CTA_BODY}
              </CardDescription>
            </div>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white text-primary-button hover:bg-white/90"
            >
              <a href={BETA_INVITE_MAILTO}>Request an invite</a>
            </Button>
          </CardHeader>
        </Card>
      </section>

    </div>
  );
}
