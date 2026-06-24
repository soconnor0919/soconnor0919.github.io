"use client";

import { useState } from "react";
import {
  CalendarDays,
  Camera,
  ContactRound,
  Home,
  MessageCircle,
  Shield,
} from "lucide-react";

import { PhoneMockup } from "~/components/phone-mockup";
import { cn } from "~/lib/utils";

const features = [
  {
    id: "home",
    label: "Profile",
    icon: Home,
    title: "One profile for the person you care for",
    description:
      "Visits, medications, reminders, and questions live together under the person they belong to.",
    image: "/screenshots/home.png",
    alt: "Medscribe home dashboard with record visit, search, medications, and ask shortcuts",
  },
  {
    id: "context",
    label: "Context",
    icon: ContactRound,
    title: "The context behind the handoff",
    description:
      "Conditions, medication changes, visit summaries, and caregiver notes stay close enough to become useful when time is short.",
    image: "/screenshots/emergency-record.png",
    alt: "Medscribe emergency record with critical care context",
  },
  {
    id: "visits",
    label: "Visits",
    icon: CalendarDays,
    title: "Visit recordings that refresh the record",
    description:
      "A visit can become searchable context, so a medication change or follow-up instruction does not depend on memory alone.",
    image: "/screenshots/visit-timeline.png",
    alt: "Medscribe visit timeline with appointment cards",
  },
  {
    id: "meds",
    label: "Meds",
    icon: Camera,
    title: "Medication OCR, reminders, and history",
    description:
      "Prescription labels, reminders, refill alerts, and dose history help the family see what is supposed to happen and what actually happened.",
    image: "/screenshots/medications.png",
    alt: "Medscribe medications screen with active medications",
  },
  {
    id: "ask",
    label: "Ask",
    icon: MessageCircle,
    title: "Medication questions grounded in the record",
    description:
      "Plain-language questions can draw from the person's record and bundled FDA facts, while keeping diagnosis and dosing with clinicians.",
    image: "/screenshots/chat.png",
    alt: "Medscribe Ask chat answering a question about blood pressure medications",
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
    title: "Private by architecture, not policy",
    description:
      "The sensitive work happens on device, so the family record is not another cloud inbox waiting to be mined.",
    image: "/screenshots/settings.png",
    alt: "Medscribe settings showing on-device AI models and privacy notice",
  },
] as const;

export function FeatureShowcase() {
  const [activeId, setActiveId] = useState<(typeof features)[number]["id"]>("home");
  const active = features.find((f) => f.id === activeId) ?? features[0];

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(170px,220px)] lg:gap-10">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.id === activeId;

            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => setActiveId(feature.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-border-soft bg-surface text-muted-foreground hover:border-primary/20 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {feature.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            {active.title}
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {active.description}
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-[220px] items-start justify-center rounded-lg bg-surface-soft/70 p-4 shadow-[0_12px_38px_rgba(15,23,42,0.08)] lg:-mt-16 lg:justify-self-end">
        <PhoneMockup
          src={active.image}
          alt={active.alt}
          width={146}
        />
      </div>
    </div>
  );
}
