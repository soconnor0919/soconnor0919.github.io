"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  ContactRound,
  MessageCircle,
  Pill,
} from "lucide-react";

import { PhoneMockup } from "~/components/phone-mockup";
import { cn } from "~/lib/utils";

const features = [
  {
    id: "visits",
    label: "Visits",
    icon: CalendarDays,
    title: "Turn a visit into context you can review",
    description:
      "Type or paste notes, import a portal screenshot or document, or use consent-gated recording to create a summary you can check.",
    points: [
      "Keep the visit and summary easy to revisit",
      "Review important details before relying on them",
      "Carry follow-ups into the next conversation",
    ],
    image: "/screenshots/product-bezel-2026-08-23/visits-natural.webp",
    darkImage: "/screenshots/product-bezel-2026-08-23/visits-natural-dark.webp",
    alt: "Illustrative Medscribe visit detail showing a visit summary and follow-up information",
  },
  {
    id: "medications",
    label: "Medications",
    icon: Pill,
    title: "Keep the daily medication picture close",
    description:
      "Scan a label, review the details, set reminders, follow refills, and see your medication routine in one calm view.",
    points: [
      "Review medication details before saving them",
      "Keep schedules and reminders easy to understand",
      "Bring important questions to a clinician or pharmacist",
    ],
    image:
      "/screenshots/product-bezel-2026-08-23/medication-detail-natural.webp",
    darkImage:
      "/screenshots/product-bezel-2026-08-23/medication-detail-natural-dark.webp",
    alt: "Illustrative Medscribe medication detail with schedule and medication information",
  },
  {
    id: "questions",
    label: "Questions",
    icon: MessageCircle,
    title: "Facts first, fluent answers second",
    description:
      "Ask about a visit or medication using the context you have already collected. Dosing changes, diagnosis, and treatment decisions stay with a clinician or pharmacist.",
    points: [
      "Keep answers connected to your own context",
      "Prepare for a clearer care conversation",
      "High-risk or unsupported questions defer to a professional",
    ],
    image: "/screenshots/product-bezel-2026-08-23/ask-black.webp",
    darkImage: "/screenshots/product-bezel-2026-08-23/ask-black-dark.webp",
    alt: "Illustrative Medscribe answer with medication context and a safety boundary",
  },
  {
    id: "handoff",
    label: "Know Me",
    icon: ContactRound,
    title: "Prepare one readable handoff",
    description:
      "The Know Me view brings selected medications, allergies, conditions, baseline, and contacts together. Current, unconfirmed, and review-needed states make uncertainty visible.",
    points: [
      "Medication schedules stay easy to review",
      "The person can show or share the snapshot they reviewed",
      "It complements—not replaces—clinical verification",
    ],
    image: "/screenshots/product-bezel-2026-08-23/know-me-natural.webp",
    darkImage:
      "/screenshots/product-bezel-2026-08-23/know-me-natural-dark.webp",
    alt: "Illustrative Medscribe Know Me handoff with active medications and review state",
  },
] as const;

type FeatureId = (typeof features)[number]["id"];

export function FeatureShowcase() {
  const [activeId, setActiveId] = useState<FeatureId>("visits");
  const active =
    features.find((feature) => feature.id === activeId) ?? features[0];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const activeIndex = features.findIndex(
      (feature) => feature.id === activeId,
    );
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (activeIndex + 1) % features.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (activeIndex - 1 + features.length) % features.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = features.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextFeature = features[nextIndex];
    if (!nextFeature) return;

    setActiveId(nextFeature.id);
    document.getElementById(`feature-tab-${nextFeature.id}`)?.focus();
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
      <div className="flex min-w-0 flex-col gap-6">
        <div
          role="tablist"
          aria-label="Explore Medscribe"
          className="flex max-w-full gap-2 overflow-x-auto pb-1"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.id === activeId;

            return (
              <button
                key={feature.id}
                id={`feature-tab-${feature.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`feature-panel-${feature.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(feature.id)}
                onKeyDown={onTabKeyDown}
                className={cn(
                  "focus-visible:ring-primary/40 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors outline-none focus-visible:ring-2",
                  isActive
                    ? "border-primary-button bg-primary-button text-white shadow-sm"
                    : "border-border-soft bg-surface/75 text-muted-foreground hover:border-primary/30 hover:text-foreground backdrop-blur-xl",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {feature.label}
              </button>
            );
          })}
        </div>

        <div
          id={`feature-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`feature-tab-${active.id}`}
          tabIndex={0}
          className="focus-visible:ring-primary/40 rounded-xl outline-none focus-visible:ring-2"
        >
          <p className="text-primary text-xs font-bold tracking-[0.14em] uppercase">
            Medscribe
          </p>
          <h3 className="text-foreground mt-3 max-w-xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {active.title}
          </h3>
          <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
            {active.description}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.points.map((point) => (
              <li
                key={point}
                className="text-foreground flex items-start gap-2.5 text-sm leading-relaxed"
              >
                <span className="bg-primary-light mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="text-primary size-3" aria-hidden="true" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="justify-self-center lg:justify-self-end">
        <div className="glass-panel rounded-[2.5rem] p-5 sm:p-7">
          <PhoneMockup
            src={active.image}
            darkSrc={active.darkImage}
            alt={active.alt}
            width={220}
          />
          <p className="text-muted-foreground mt-4 text-center text-xs">
            Illustrative profile · Medscribe interface
          </p>
        </div>
      </div>
    </div>
  );
}
