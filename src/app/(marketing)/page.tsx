import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  ContactRound,
  KeyRound,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

import { ProductDevice } from "~/components/product-device";
import { Button } from "~/components/ui/button";
import { productClaims, productRelease } from "~/content/product";
import { BETA_INVITE_MAILTO } from "~/lib/beta";

export const metadata: Metadata = {
  title: "Carry the context when care gets complicated",
  description:
    "Medscribe is a private, patient-controlled beta that helps keep visits, medications, and critical context together on your device.",
};

const visitMoments = [
  {
    number: "01",
    eyebrow: "Visits stay findable",
    title: "The visit has a place to land.",
    body: "Keep the recording, transcript, and reviewed summary together instead of reconstructing the appointment from memory.",
    image: "/screenshots/pitch/visits-natural.webp",
    darkImage: "/screenshots/pitch/visits-natural-dark.webp",
    alt: "Medscribe Visits screen in a natural titanium iPhone product bezel",
  },
  {
    number: "02",
    eyebrow: "Words stay checkable",
    title: "Go back to what was actually said.",
    body: "Search the local transcript and compare it with the generated summary before anything becomes part of the record you rely on.",
    image: "/screenshots/pitch/transcript-black.webp",
    darkImage: "/screenshots/pitch/transcript-black-dark.webp",
    alt: "Medscribe visit transcript in a black titanium iPhone product bezel",
  },
  {
    number: "03",
    eyebrow: "The next step stays visible",
    title: "Review the useful part. Keep the uncertainty.",
    body: "Medications, follow-ups, diagnoses, and instructions are prepared on-device. Suggestions remain suggestions until a person checks them.",
    image: "/screenshots/pitch/summary-natural.webp",
    darkImage: "/screenshots/pitch/summary-natural-dark.webp",
    alt: "Medscribe appointment summary in a natural titanium iPhone product bezel",
  },
] as const;

const proofStats = [
  {
    value: productRelease.drugFacts.toLocaleString("en-US"),
    label: "bundled medication records",
  },
  {
    value: productRelease.rxNormTerms.toLocaleString("en-US"),
    label: "RxNorm terms for matching",
  },
  {
    value: productRelease.interactionPairs.toLocaleString("en-US"),
    label: "known interaction pairs",
  },
] as const;

const privacyPrinciples = [
  {
    icon: Smartphone,
    title: "Your working record stays local",
    body: productClaims.localRecord.publicCopy,
  },
  {
    icon: LockKeyhole,
    title: "AI runs on the device",
    body: productClaims.localAi.publicCopy,
  },
  {
    icon: ShieldCheck,
    title: "Facts do not come from model memory",
    body: productClaims.medicationFacts.publicCopy,
  },
] as const;

const betaFit = [
  "Managing several medications or repeated visits",
  "Coordinating care with a family caregiver",
  "Willing to review generated information and report errors",
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20 lg:pt-24">
        <div className="bg-primary-light/55 absolute top-0 left-1/2 -z-10 h-[38rem] w-[68rem] max-w-[120vw] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-fade-in-up flex items-center justify-center gap-3">
            <span className="bg-success-light text-success rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.12em] uppercase">
              {productRelease.stage}
            </span>
            <span className="text-muted-foreground text-xs font-semibold tracking-[0.12em] uppercase">
              {productRelease.platforms}
            </span>
          </div>
          <h1 className="animate-fade-in-up-delay-1 text-foreground mx-auto mt-7 max-w-6xl font-serif text-[clamp(3.6rem,9vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
            Carry the context.
          </h1>
          <p className="animate-fade-in-up-delay-2 text-muted-foreground mx-auto mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl lg:text-2xl">
            Visits, medications, and the critical details between them—kept
            together on the device you carry.
          </p>
          <div className="animate-fade-in-up-delay-3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/beta">
                Request beta access
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-12 h-[36rem] max-w-5xl sm:h-[46rem] lg:mt-8 lg:h-[54rem]">
          <div className="absolute top-24 left-1/2 w-[17rem] -translate-x-[86%] -rotate-6 sm:top-28 sm:w-[22rem] lg:top-32 lg:w-[26rem]">
            <ProductDevice
              src="/screenshots/pitch/summary-natural.webp"
              darkSrc="/screenshots/pitch/summary-natural-dark.webp"
              alt="Medscribe visit summary in a natural titanium iPhone product bezel"
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 352px, 272px"
              priority
            />
          </div>
          <div className="absolute top-0 left-1/2 z-10 w-[18rem] -translate-x-[14%] rotate-5 sm:w-[23rem] lg:w-[28rem]">
            <ProductDevice
              src="/screenshots/pitch/home-black.webp"
              darkSrc="/screenshots/pitch/home-black-dark.webp"
              alt="Medscribe home screen in a black titanium iPhone product bezel"
              sizes="(min-width: 1024px) 448px, (min-width: 640px) 368px, 288px"
              priority
            />
          </div>
          <p className="text-muted-foreground absolute inset-x-0 bottom-5 text-center text-xs font-medium tracking-wide sm:bottom-10">
            Synthetic demo data · beta interface
          </p>
        </div>
      </section>

      <section className="pitch-lazy border-border-soft bg-surface/80 flex min-h-[78svh] items-center border-y px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            The missing picture
          </p>
          <h2 className="text-foreground mx-auto mt-7 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
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
            <h2 className="text-foreground mt-6 max-w-xl font-serif text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl">
              Turn what happened into something you can check.
            </h2>
            <p className="text-muted-foreground mt-7 max-w-lg text-lg leading-relaxed">
              Bring in typed notes, a portal screenshot, a document, or an
              optional consent-gated recording. The work happens locally. You
              decide what is useful.
            </p>
            <div className="border-primary/25 bg-primary-light/35 mt-8 max-w-lg rounded-2xl border p-5">
              <p className="text-foreground text-sm leading-relaxed">
                <strong className="font-semibold">The safety loop:</strong>{" "}
                review generated information before acting. Medscribe does not
                diagnose, prescribe, or replace clinical verification.
              </p>
            </div>
          </div>

          <ol className="space-y-8 sm:space-y-12">
            {visitMoments.map((moment) => (
              <li
                key={moment.number}
                className="border-border-soft bg-surface relative overflow-hidden rounded-[2.5rem] border px-5 pt-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:px-10 sm:pt-10 dark:shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
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
                  <h3 className="text-foreground mt-5 font-serif text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
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
                    sizes="(min-width: 1024px) 336px, (min-width: 640px) 320px, 72vw"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pitch-lazy relative isolate overflow-hidden bg-[#082f2c] px-4 py-24 text-white sm:px-6 lg:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(45,212,191,0.25),transparent_32%),radial-gradient(circle_at_16%_80%,rgba(20,184,166,0.15),transparent_28%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-200 uppercase">
              Between visits
            </p>
            <h2 className="mt-6 font-serif text-[clamp(3rem,7vw,6.7rem)] leading-[0.94] font-semibold tracking-[-0.045em]">
              Keep the medication picture from going stale.
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
                  src="/screenshots/pitch/medication-detail-natural.webp"
                  darkSrc="/screenshots/pitch/medication-detail-natural-dark.webp"
                  alt="Medscribe medication detail in a natural titanium iPhone product bezel"
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 336px, 272px"
                />
              </div>
              <div className="absolute top-0 right-[2%] z-10 w-[18rem] rotate-5 sm:w-[22rem] lg:w-[24rem]">
                <ProductDevice
                  src="/screenshots/pitch/medications-black.webp"
                  darkSrc="/screenshots/pitch/medications-black-dark.webp"
                  alt="Medscribe medication list in a black titanium iPhone product bezel"
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 352px, 288px"
                />
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/12 bg-white/12">
              {[
                {
                  title: "Show where a schedule came from",
                  body: "Schedules can carry their source, confirmation, timezone, and freshness state.",
                },
                {
                  title: "Keep facts deterministic",
                  body: productClaims.medicationFacts.publicCopy,
                },
                {
                  title: "Make uncertainty visible",
                  body: "Missing or stale details stay visible so the person or clinician can verify them.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="bg-[#0b3b37]/90 p-7 sm:p-9"
                >
                  <Check className="size-5 text-teal-200" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-2xl font-semibold sm:text-3xl">
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

      <section className="pitch-lazy bg-[#f0ece4] px-4 py-24 sm:px-6 lg:py-36 dark:bg-[#111827]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              Ask from the record
            </p>
            <h2 className="text-foreground mt-6 max-w-2xl font-serif text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.94] font-semibold tracking-[-0.045em]">
              Better questions begin with your context.
            </h2>
            <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              Ask about a visit or medication without uploading the record to a
              remote model. Answers are grounded in local history and bundled
              facts, with the boundary kept in view.
            </p>
            <p className="border-primary/35 text-muted-foreground mt-7 max-w-xl border-l-2 pl-5 text-sm leading-relaxed">
              Informational only. Medication changes still belong with a
              clinician or pharmacist.
            </p>
          </div>
          <div className="order-1 mx-auto w-[min(78vw,27rem)] lg:order-2">
            <ProductDevice
              src="/screenshots/pitch/ask-black.webp"
              darkSrc="/screenshots/pitch/ask-black-dark.webp"
              alt="Medscribe Ask response grounded in local health context, shown in a black titanium iPhone product bezel"
              sizes="(min-width: 1024px) 432px, (min-width: 640px) 384px, 78vw"
            />
          </div>
        </div>
      </section>

      <section className="pitch-lazy overflow-hidden px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
            <div className="relative mx-auto w-[min(80vw,28rem)]">
              <div className="bg-primary-light/70 absolute inset-[12%_-12%_8%] -z-10 rounded-[4rem] blur-2xl" />
              <ProductDevice
                src="/screenshots/pitch/know-me-natural.webp"
                darkSrc="/screenshots/pitch/know-me-natural-dark.webp"
                alt="Medscribe Know Me handoff record in a natural titanium iPhone product bezel"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 400px, 80vw"
              />
            </div>
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                At the handoff
              </p>
              <h2 className="text-foreground mt-6 max-w-2xl font-serif text-[clamp(3.2rem,6vw,6.2rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
                Bring the picture when the chart is incomplete.
              </h2>
              <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
                Know Me gathers selected medications, allergies, conditions,
                baseline, and contacts into one readable snapshot. Freshness
                signals show what may need another look.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <div className="border-border-soft bg-surface rounded-2xl border p-5">
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
                <div className="border-border-soft bg-surface rounded-2xl border p-5">
                  <ContactRound
                    className="text-primary size-6"
                    aria-hidden="true"
                  />
                  <p className="text-foreground mt-4 font-semibold">
                    Caregiver copy
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Manually export an encrypted copy for a paired recipient.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 overflow-hidden rounded-[2.5rem] bg-[#0f4f4b] p-7 text-white sm:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <KeyRound className="size-7 text-teal-200" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                  Share a snapshot. Not an invisible feed.
                </h3>
                <p className="mt-5 max-w-xl leading-relaxed text-teal-50/75">
                  Pair by QR code, compare a safety number, and choose when to
                  export. The caregiver imports a local copy on their device.
                </p>
              </div>
              <ol className="grid gap-3 sm:grid-cols-3">
                {[
                  ["1", "You review", "Choose the record to send"],
                  ["2", "Encrypted copy", "Protected for the recipient key"],
                  ["3", "They import", "A local, readable snapshot"],
                ].map(([number, title, body]) => (
                  <li
                    key={number}
                    className="rounded-2xl border border-white/15 bg-white/8 p-5"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/12 text-xs font-bold">
                      {number}
                    </span>
                    <p className="mt-8 font-serif text-xl font-semibold">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-teal-50/65">
                      {body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-8 border-t border-white/12 pt-6 text-xs leading-relaxed text-teal-50/60">
              Manual today—not live sync or a household cloud account.
              Import-side sender trust enforcement is still being hardened;
              revocation cannot recall a copy already exported.
            </p>
          </div>
        </div>
      </section>

      <section className="pitch-lazy relative isolate overflow-hidden bg-[#070d15] px-4 py-24 text-white sm:px-6 lg:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-300 uppercase">
              A precise privacy boundary
            </p>
            <h2 className="mt-6 font-serif text-[clamp(3.2rem,7vw,7rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
              Local changes what you have to trust.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              The working record and supported AI tasks stay on the device.
              Medication facts come from bundled references, not a model trying
              to remember medicine.
            </p>
          </div>

          <dl className="mt-20 grid border-y border-white/12 md:grid-cols-3 md:divide-x md:divide-white/12">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-white/12 px-5 py-10 text-center last:border-b-0 md:border-b-0 lg:py-14"
              >
                <dt className="text-sm text-slate-400">{stat.label}</dt>
                <dd className="mt-3 font-serif text-5xl font-semibold tracking-[-0.04em] text-teal-200 sm:text-6xl lg:text-7xl">
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
                  className="rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-7"
                >
                  <Icon className="size-6 text-teal-200" aria-hidden="true" />
                  <h3 className="mt-8 font-serif text-2xl font-semibold">
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
                Read privacy & evidence
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="pitch-lazy flex min-h-[82svh] items-center px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[3rem] border border-teal-900/10 bg-[linear-gradient(145deg,#ccfbf1_0%,#f0fdfa_44%,#ffffff_100%)] px-6 py-16 text-center shadow-[0_35px_110px_rgba(15,118,110,0.15)] sm:px-10 lg:px-20 lg:py-24 dark:border-teal-300/10 dark:bg-[linear-gradient(145deg,#134e4a_0%,#0f2930_48%,#111827_100%)]">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            The right beta participant
          </p>
          <h2 className="text-foreground mx-auto mt-6 max-w-4xl font-serif text-[clamp(3.2rem,7vw,7rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
            Help build the record people can actually carry.
          </h2>
          <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl">
            This is an internal beta. Expect close feedback, manual review,
            rough edges, and possible resets—not guaranteed continuity.
          </p>
          <ul className="mx-auto mt-9 grid max-w-4xl gap-3 text-left md:grid-cols-3">
            {betaFit.map((item) => (
              <li
                key={item}
                className="border-primary/15 bg-surface/65 text-foreground flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed"
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
              <a href={BETA_INVITE_MAILTO}>
                Draft beta request
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/beta">What to expect</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-xs leading-relaxed">
            Start with your platform and whether you are testing as a patient,
            caregiver, or both. Please do not email health details.
          </p>
        </div>
      </section>
    </>
  );
}
