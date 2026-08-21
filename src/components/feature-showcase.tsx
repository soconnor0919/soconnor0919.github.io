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
      "Type or paste notes, import a portal screenshot or document, or use consent-gated recording. The beta creates a local summary for the person to check.",
    points: [
      "Supported transcription and summarization run on device",
      "The person reviews generated information",
      "Structured visit-to-record change review is still roadmap",
    ],
    image: "/screenshots/product-glass-2026-08-20/visits-light.png",
    darkImage: "/screenshots/product-glass-2026-08-20/visits-dark.png",
    alt: "Synthetic Medscribe beta visit detail showing a visit summary and follow-up information",
  },
  {
    id: "medications",
    label: "Medications",
    icon: Pill,
    title: "Keep the daily medication picture close",
    description:
      "Scan a label, correct the extracted fields, set reminders, follow refills, and see a local intake history without asking a language model to invent drug facts.",
    points: [
      "Label text remains editable before it becomes the record",
      "Bundled facts and known pairs use named reference datasets",
      "Coverage is intentionally bounded, not a complete interaction check",
    ],
    image: "/screenshots/product-glass-2026-08-20/medication-detail-light.png",
    darkImage:
      "/screenshots/product-glass-2026-08-20/medication-detail-dark.png",
    alt: "Synthetic Medscribe beta medication detail with schedule and medication information",
  },
  {
    id: "questions",
    label: "Questions",
    icon: MessageCircle,
    title: "Facts first, fluent answers second",
    description:
      "Medication questions can use the person’s local record and bundled fields. Dosing changes, diagnosis, and treatment decisions stay with a clinician or pharmacist.",
    points: [
      "Known facts render from bundled data",
      "The local model helps with conversational phrasing",
      "High-risk or unsupported questions defer to a professional",
    ],
    image: "/screenshots/product-glass-2026-08-20/ask-light.png",
    darkImage: "/screenshots/product-glass-2026-08-20/ask-dark.png",
    alt: "Synthetic Medscribe beta answer with medication context and a safety boundary",
  },
  {
    id: "handoff",
    label: "Know Me",
    icon: ContactRound,
    title: "Prepare one readable handoff",
    description:
      "The Know Me view brings selected medications, allergies, conditions, baseline, and contacts together. Current, unconfirmed, and review-needed states make uncertainty visible.",
    points: [
      "Medication schedules can include source and confirmation",
      "The person can show or share the snapshot they reviewed",
      "It complements—not replaces—clinical verification",
    ],
    image: "/screenshots/product-glass-2026-08-20/know-me-light.png",
    darkImage: "/screenshots/product-glass-2026-08-20/know-me-dark.png",
    alt: "Synthetic Medscribe beta Know Me handoff with active medications and review state",
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
          aria-label="Explore the Medscribe beta"
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
                    : "border-border-soft bg-surface text-muted-foreground hover:border-primary/30 hover:text-foreground",
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
            Current beta
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
        <div className="border-border-soft bg-surface-soft/80 rounded-[2.5rem] border p-5 shadow-[0_30px_80px_rgba(15,23,42,0.10)] sm:p-7">
          <PhoneMockup
            src={active.image}
            darkSrc={active.darkImage}
            alt={active.alt}
            width={220}
          />
          <p className="text-muted-foreground mt-4 text-center text-xs">
            Synthetic demo data · beta interface
          </p>
        </div>
      </div>
    </div>
  );
}
