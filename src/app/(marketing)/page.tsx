import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  ContactRound,
  Download,
  FileText,
  HeartHandshake,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

import { ProductDevice } from "~/components/product-device";
import { Button } from "~/components/ui/button";
import { productClaims, productRelease } from "~/content/product";
import { ACCESS_INVITE_MAILTO } from "~/lib/access";

export const metadata: Metadata = {
  title: "Carry the context when care gets complicated",
  description:
    "Medscribe is a private, patient-controlled companion that keeps visits, medications, and critical context together.",
};

const visitMoments = [
  {
    number: "01",
    eyebrow: "Visits stay findable",
    title: "The visit has a place to land.",
    body: "Keep the recording, transcript, and reviewed summary together instead of reconstructing the appointment from memory.",
    image: "/screenshots/product-bezel-2026-08-24-unified-type/visits-natural.webp",
    darkImage:
      "/screenshots/product-bezel-2026-08-24-unified-type/visits-natural-dark.webp",
    alt: "Medscribe Visits screen in an iPhone 17 Pro product bezel",
  },
  {
    number: "02",
    eyebrow: "Words stay checkable",
    title: "Go back to what was actually said.",
    body: "Search the transcript and compare it with the generated summary before relying on it later.",
    image:
      "/screenshots/product-bezel-2026-08-24-unified-type/transcript-populated-black.webp",
    darkImage:
      "/screenshots/product-bezel-2026-08-24-unified-type/transcript-populated-black-dark.webp",
    alt: "Medscribe visit transcript in an iPhone 17 Pro product bezel",
  },
  {
    number: "03",
    eyebrow: "The next step stays visible",
    title: "Review the useful part. Keep your judgment.",
    body: "Bring medications, follow-ups, diagnoses, and instructions into view, then check the details that matter.",
    image:
      "/screenshots/product-bezel-2026-08-24-unified-type/summary-reviewed-natural.webp",
    darkImage:
      "/screenshots/product-bezel-2026-08-24-unified-type/summary-reviewed-natural-dark.webp",
    alt: "Medscribe appointment summary in an iPhone 17 Pro product bezel",
  },
] as const;

const proofStats = [
  {
    value: "One place",
    label: "for visits, medications, and important context",
  },
  {
    value: "At a glance",
    label: "for daily routines and reminders",
  },
  {
    value: "Your choice",
    label: "when and what to share",
  },
] as const;

const privacyPrinciples = [
  {
    icon: Smartphone,
    title: "Built around the person",
    body: productClaims.localRecord.publicCopy,
  },
  {
    icon: LockKeyhole,
    title: "Private by design",
    body: productClaims.localAi.publicCopy,
  },
  {
    icon: ShieldCheck,
    title: "Care decisions stay human",
    body: productClaims.medicationFacts.publicCopy,
  },
] as const;

const accessFit = [
  "Managing several medications or repeated visits",
  "Coordinating care with a family caregiver",
  "Keeping a clear record for the next conversation",
] as const;

export default function HomePage() {
  return (
    <>
      <section className="section-wash relative isolate min-h-[calc(100svh-4rem)] overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-fade-in-up flex items-center justify-center gap-3">
            <span className="bg-success-light text-success rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.12em] uppercase">
              {productRelease.stage}
            </span>
            <span className="text-muted-foreground text-xs font-semibold tracking-[0.12em] uppercase">
              {productRelease.platforms}
            </span>
          </div>
          <h1 className="animate-fade-in-up-delay-1 text-foreground mx-auto mt-7 max-w-6xl font-display text-[clamp(3.6rem,9vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
            Carry the context.
          </h1>
          <p className="animate-fade-in-up-delay-2 text-muted-foreground mx-auto mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl lg:text-2xl">
            Visits, medications, and the critical details between them—kept
            together wherever care takes you.
          </p>
          <div className="animate-fade-in-up-delay-3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/access">
                Request access
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-12 h-[44rem] max-w-5xl sm:h-[58rem] lg:mt-8 lg:h-[64rem]">
          <div className="absolute top-24 left-1/2 w-[17rem] -translate-x-[86%] -rotate-6 sm:top-28 sm:w-[22rem] lg:top-32 lg:w-[26rem]">
            <ProductDevice
              src="/screenshots/product-bezel-2026-08-24-unified-type/summary-reviewed-natural.webp"
              darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/summary-reviewed-natural-dark.webp"
              alt="Medscribe visit summary in an iPhone 17 Pro product bezel"
              className="pitch-device-motion pitch-device-drift-left"
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 352px, 272px"
              priority
            />
          </div>
          <div className="absolute top-0 left-1/2 z-10 w-[18rem] -translate-x-[14%] rotate-5 sm:w-[23rem] lg:w-[28rem]">
            <ProductDevice
              src="/screenshots/product-bezel-2026-08-24-unified-type/home-black.webp"
              darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/home-black-dark.webp"
              alt="Medscribe home screen in an iPhone 17 Pro product bezel"
              className="pitch-device-motion pitch-device-drift-right"
              sizes="(min-width: 1024px) 448px, (min-width: 640px) 368px, 288px"
              priority
            />
          </div>
        </div>
        <p className="text-muted-foreground relative z-20 mx-auto pb-8 text-center text-xs font-medium tracking-wide">
          Illustrative profile · Medscribe interface
        </p>
      </section>

      <section className="pitch-lazy section-wash flex min-h-[78svh] items-center px-4 py-24 sm:px-6 lg:py-32">
        <div className="pitch-copy-motion mx-auto max-w-6xl text-center">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            The connected picture
          </p>
          <h2 className="text-foreground mx-auto mt-7 max-w-5xl font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
            Care happens in fragments. Your context shouldn&apos;t.
          </h2>
          <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl">
            One instruction lives in a portal. A medication label sits in a
            cabinet. The latest change lives in someone&apos;s memory. Medscribe
            is the patient-held thread between those moments.
          </p>
        </div>
      </section>

      <section className="pitch-lazy px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              After the visit
            </p>
            <h2 className="text-foreground mt-6 max-w-xl font-display text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl">
              Turn what happened into something you can check.
            </h2>
            <p className="text-muted-foreground mt-7 max-w-lg text-lg leading-relaxed">
              Bring the important details from a visit into one reviewable
              record. You decide what is useful and what belongs in the picture
              you carry forward.
            </p>
            <div className="surface-panel mt-8 max-w-lg rounded-2xl p-5">
              <p className="text-foreground text-sm leading-relaxed">
                <strong className="font-semibold">The safety loop:</strong>{" "}
                review generated information before acting. Medscribe does not
                diagnose, prescribe, or replace clinical verification.
              </p>
            </div>
          </div>

          <ol className="space-y-8 sm:space-y-12">
            {visitMoments.map((moment, index) => (
              <li
                key={moment.number}
                className="pitch-card-motion surface-panel relative overflow-hidden rounded-[2.5rem] px-5 pt-8 sm:px-10 sm:pt-10"
              >
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary-light text-primary flex size-9 items-center justify-center rounded-full text-xs font-bold">
                      {moment.number}
                    </span>
                    <p className="text-primary text-xs font-bold tracking-[0.16em] uppercase">
                      {moment.eyebrow}
                    </p>
                  </div>
                  <h3 className="text-foreground mt-5 font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
                    {moment.title}
                  </h3>
                  <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
                    {moment.body}
                  </p>
                </div>
                <div className="bg-primary-light/45 absolute -right-36 bottom-14 -z-0 size-96 rounded-full blur-3xl" />
                <div className="relative mx-auto mt-10 w-[min(72vw,21rem)] translate-y-14">
                  <ProductDevice
                    src={moment.image}
                    darkSrc={moment.darkImage}
                    alt={moment.alt}
                    className={`pitch-device-motion ${index % 2 === 0 ? "pitch-device-drift-right" : "pitch-device-drift-left"}`}
                    sizes="(min-width: 1024px) 336px, (min-width: 640px) 320px, 72vw"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pitch-lazy brand-night relative isolate overflow-hidden px-4 py-24 text-white sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="pitch-copy-motion mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-200 uppercase">
              Between visits
            </p>
            <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.7rem)] leading-[0.94] font-semibold tracking-[-0.045em]">
              Keep the medication picture current.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-teal-50/75 sm:text-xl">
              The list, the label, the schedule, and the latest confirmation
              belong in the same view—not scattered across paper and memory.
            </p>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-6">
            <div className="relative mx-auto h-[42rem] w-full max-w-2xl sm:h-[50rem] lg:h-[56rem]">
              <div className="absolute top-20 left-[4%] w-[17rem] -rotate-6 sm:w-[21rem] lg:w-[23rem]">
                <ProductDevice
                  src="/screenshots/product-bezel-2026-08-24-unified-type/medication-detail-lisinopril-natural.webp"
                  darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/medication-detail-lisinopril-natural-dark.webp"
                  alt="Medscribe medication detail in an iPhone 17 Pro product bezel"
                  className="pitch-device-motion pitch-device-drift-left"
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 336px, 272px"
                />
              </div>
              <div className="absolute top-0 right-[2%] z-10 w-[18rem] rotate-5 sm:w-[22rem] lg:w-[24rem]">
                <ProductDevice
                  src="/screenshots/product-bezel-2026-08-24-unified-type/medications-black.webp"
                  darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/medications-black-dark.webp"
                  alt="Medscribe medication list in an iPhone 17 Pro product bezel"
                  className="pitch-device-motion pitch-device-drift-right"
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 352px, 288px"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white/[0.055]">
              {[
                {
                  title: "Keep schedules easy to understand",
                  body: "See timing, reminders, and refill details together in one calm view.",
                },
                {
                  title: "See the important details",
                  body: productClaims.medicationFacts.publicCopy,
                },
                {
                  title: "Make review simple",
                  body: "Keep the details readable so you can check them with a clinician or pharmacist.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="border-white/10 border-t p-7 first:border-t-0 sm:p-9"
                >
                  <Check className="size-5 text-teal-200" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-teal-50/70">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pitch-lazy section-wash overflow-hidden px-4 py-24 sm:px-6 lg:py-36">
        <div
          id="questions"
          className="mx-auto grid max-w-7xl scroll-mt-4 items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20"
        >
          <div className="pitch-copy-motion">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              Questions for the doctor
            </p>
            <h2 className="text-foreground mt-6 max-w-2xl font-display text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.94] font-semibold tracking-[-0.045em]">
              Ask now. Save what belongs in the room.
            </h2>
            <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              Ask about a visit or medication. When the answer needs a care
              professional&apos;s judgment, Medscribe can suggest saving the
              question and who may be helpful to ask.
            </p>
            <div className="text-muted-foreground mt-7 flex max-w-xl items-start gap-3 text-sm leading-relaxed">
              <span className="bg-primary-light text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              <p>
                Keep a calm, ready list for your next appointment instead of
                relying on memory when the conversation begins.
              </p>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-[40rem] items-center justify-center gap-2 sm:grid-cols-2 lg:justify-end">
            <div className="mx-auto w-[min(72vw,18rem)] -rotate-2 sm:w-full">
              <ProductDevice
                src="/screenshots/product-bezel-2026-08-24-unified-type/ask-questions-black.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/ask-questions-black-dark.webp"
                alt="Medscribe Ask response shown in an iPhone 17 Pro product bezel"
                className="pitch-device-motion pitch-device-drift-left"
                sizes="(min-width: 640px) 288px, 72vw"
              />
            </div>
            <div className="mx-auto w-[min(72vw,18rem)] rotate-2 sm:w-full">
              <ProductDevice
                src="/screenshots/product-bezel-2026-08-24-unified-type/questions-black.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/questions-black-dark.webp"
                alt="Medscribe Questions to ask interface shown in an iPhone 17 Pro product bezel"
                className="pitch-device-motion pitch-device-drift-right"
                sizes="(min-width: 640px) 288px, 72vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pitch-lazy overflow-hidden px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
            <div className="relative mx-auto w-[min(80vw,28rem)]">
              <div className="bg-primary-light/70 absolute inset-[12%_-12%_8%] -z-10 rounded-[4rem] blur-2xl" />
              <ProductDevice
                src="/screenshots/product-bezel-2026-08-24-unified-type/know-me-natural.webp"
                darkSrc="/screenshots/product-bezel-2026-08-24-unified-type/know-me-natural-dark.webp"
                alt="Medscribe Know Me handoff record in an iPhone 17 Pro product bezel"
                className="pitch-device-motion pitch-device-drift-left"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 400px, 80vw"
              />
            </div>
            <div className="pitch-copy-motion">
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                At the handoff
              </p>
              <h2 className="text-foreground mt-6 max-w-2xl font-display text-[clamp(3.2rem,6vw,6.2rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
                Bring the picture when care gets complicated.
              </h2>
              <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
                Know Me gathers selected medications, allergies, conditions,
                baseline, and contacts into one readable snapshot that is easy
                to review together.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <div className="surface-panel rounded-2xl p-5">
                  <ScanLine
                    className="text-primary size-6"
                    aria-hidden="true"
                  />
                  <p className="text-foreground mt-4 font-semibold">
                    Quick handoff
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Show or share a selected, readable snapshot.
                  </p>
                </div>
                <div className="surface-panel rounded-2xl p-5">
                  <ContactRound
                    className="text-primary size-6"
                    aria-hidden="true"
                  />
                  <p className="text-foreground mt-4 font-semibold">
                    Caregiver copy
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Share selected context with someone you trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="night-card mt-24 overflow-hidden rounded-[2.5rem] p-7 text-white sm:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <HeartHandshake
                  className="size-7 text-teal-200"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-4xl leading-tight font-semibold sm:text-5xl">
                  Share with intention.
                </h3>
                <p className="mt-5 max-w-xl leading-relaxed text-teal-50/75">
                  Choose the context that helps, review it first, and share it
                  with a trusted caregiver when the moment calls for it.
                </p>
              </div>
              <ol className="grid gap-3 sm:grid-cols-3">
                {[
                  ["1", "You review", "Choose the context that helps"],
                  ["2", "You share", "Send it to someone you trust"],
                  ["3", "Stay aligned", "Keep the same picture in view"],
                ].map(([number, title, body]) => (
                  <li
                    key={number}
                    className="rounded-2xl bg-white/[0.065] p-5"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/12 text-xs font-bold">
                      {number}
                    </span>
                    <p className="mt-8 font-display text-xl font-semibold">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-teal-50/65">
                      {body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="pitch-lazy brand-night relative isolate overflow-hidden px-4 py-24 text-white sm:px-6 lg:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="pitch-copy-motion mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-300 uppercase">
              Privacy that feels personal
            </p>
            <h2 className="mt-6 font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
              Your health story stays centered on you.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Medscribe keeps the experience focused on your choices: what you
              keep, what you review, and what you share with people you trust.
            </p>
          </div>

          <dl className="mt-20 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/12">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-2 text-center md:py-10 lg:py-14"
              >
                <dt className="text-sm text-slate-400">{stat.label}</dt>
                <dd className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-teal-200 sm:text-6xl lg:text-7xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {privacyPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-[1.75rem] bg-white/[0.05] p-7"
                >
                  <Icon className="size-6 text-teal-200" aria-hidden="true" />
                  <h3 className="mt-8 font-display text-2xl font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {principle.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/privacy">
                Read about privacy
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="partners"
        className="pitch-lazy overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
      >
        <div className="section-wash surface-panel mx-auto grid max-w-6xl gap-10 rounded-[2.75rem] px-6 py-12 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16">
          <div className="pitch-copy-motion max-w-3xl">
            <div className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-2xl">
              <FileText className="size-6" aria-hidden="true" />
            </div>
            <p className="text-primary mt-7 text-xs font-bold tracking-[0.2em] uppercase">
              For partners
            </p>
            <h2 className="text-foreground mt-4 font-display text-4xl leading-tight font-semibold tracking-[-0.035em] sm:text-5xl">
              See the partnership story.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
              An eight-slide overview of the problem Medscribe addresses, the
              product in practice, and the opportunity to bring it to more
              patients and caregivers.
            </p>
            <p className="text-foreground mt-6 text-sm font-semibold tracking-[-0.01em]">
              <span className="block">Hadlock Holdings LLC</span>
              <span className="text-muted-foreground mt-1 block">
                Sean O&apos;Connor · Bill Vitriol
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg">
              <a
                href="/medscribe-corporate-partner-overview.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View pitch deck
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/medscribe-corporate-partner-overview.pdf" download>
                Download PDF
                <Download className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="pitch-lazy flex min-h-[82svh] items-center px-4 py-24 sm:px-6 lg:py-32">
        <div className="pitch-copy-motion section-wash surface-panel mx-auto w-full max-w-6xl overflow-hidden rounded-[3rem] px-6 py-16 text-center sm:px-10 lg:px-20 lg:py-24">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Made for people who carry a lot
          </p>
          <h2 className="text-foreground mx-auto mt-6 max-w-4xl font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
            Carry the record that helps you move forward.
          </h2>
          <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Bring visits, medication routines, and trusted caregivers into one
            clearer picture—without losing your place at the center.
          </p>
          <ul className="mx-auto mt-9 grid max-w-4xl gap-3 text-left md:grid-cols-3">
            {accessFit.map((item) => (
              <li
                key={item}
                className="bg-surface/65 text-foreground flex items-start gap-3 rounded-2xl p-4 text-sm leading-relaxed"
              >
                <span className="bg-primary-light mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="text-primary size-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={ACCESS_INVITE_MAILTO}>
                Request access
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/access">Explore Medscribe</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-xs leading-relaxed">
            Start with your platform and whether you are interested as a
            patient, caregiver, or both. Please do not email health details.
          </p>
        </div>
      </section>
    </>
  );
}
