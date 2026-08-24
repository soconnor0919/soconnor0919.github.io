import Image from "next/image";

function PrintPage({
  page,
  children,
}: Readonly<{ page: number; children: React.ReactNode }>) {
  return (
    <article
      className={
        page === 1
          ? "northwell-print-page"
          : "northwell-print-page northwell-print-page--continuation"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="northwell-print-wash" src="/print-wash.svg" alt="" />
      {page === 1 ? (
        <header className="northwell-print-header">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-6 w-auto" src="/medscribe-ms-logo.svg" alt="" />
            <span className="font-serif text-[17px] font-semibold text-slate-950">
              Medscribe
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Executive summary · Northwell Health
          </span>
        </header>
      ) : null}

      <div className="northwell-print-content">{children}</div>

      <footer className="northwell-print-footer">
        <span>Page {page} of 3</span>
      </footer>
    </article>
  );
}

const people = [
  [
    "The student on their own",
    "Managing prescriptions and appointments for the first time, away from the parent who used to track it all.",
  ],
  [
    "The newly diagnosed",
    "A new routine, new instructions, and follow-ups that are a blur by the next visit.",
  ],
  [
    "The long-distance caregiver",
    "An adult child coordinating a parent's medications with siblings who cover different days.",
  ],
  [
    "The emergency",
    "An older patient at an out-of-network ER, where no one has met them or knows which medications cannot be delayed.",
  ],
] as const;

const productPillars = [
  [
    "Capture visits",
    "Type or paste notes, import a portal screenshot, attach a document, or use consent-gated recording, then review the important details.",
  ],
  [
    "Keep medications current",
    "Pill-bottle label recognition, reminders, refill tracking, dose history, and questions connected to the patient's list.",
  ],
  [
    "Be ready to hand off",
    "A patient-controlled Know Me record keeps critical context ready for a caregiver or care professional.",
  ],
] as const;

const northwellFit = [
  [
    "An experience patients can trust",
    "Visit summaries, medication routines, and important questions stay clear and reviewable for patients, privacy teams, and clinicians.",
  ],
  [
    "A Northwell story worth telling",
    "Northwell can lead with a concrete patient benefit: one private, emergency-ready picture that travels across systems. The experience could carry Northwell's brand without pretending to replace MyChart.",
  ],
  [
    "An everyday touchstone",
    "Reminders, refills, dose tracking, questions, and record updates create useful reasons to return between appointments. Each moment can point the patient back to the Northwell care team.",
  ],
] as const;

const recordContents = [
  "Active medications, doses, schedules, and refill status",
  "Allergies, conditions, baseline, and the context that changes a handoff",
  "Visit summaries, follow-up instructions, and questions for the next visit",
  "Emergency contacts and a concise, patient-controlled Know Me record",
] as const;

export function NorthwellPrintSummary() {
  return (
    <div className="northwell-print-only" aria-hidden="true">
      <PrintPage page={1}>
        <div className="grid grid-cols-[1.16fr_0.84fr] items-start gap-9 pt-5">
          <div>
            <p className="northwell-print-label">The patient-owned record</p>
            <h1 className="mt-4 font-serif text-[44px] leading-[0.98] font-semibold tracking-[-0.035em] text-slate-950">
              Be known when care gets complicated
            </h1>
            <p className="mt-5 text-[16px] leading-[1.55] text-slate-600">
              Medscribe keeps a patient&apos;s medications, visits, baseline,
              and critical care context current between appointments, then makes
              that picture ready for a caregiver, a new doctor, or an ER.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2 text-[8.5px] font-bold tracking-[0.08em] text-slate-600 uppercase">
              {[
                "Private by design",
                "Emergency-ready",
                "Patient-controlled",
                "iOS and Android",
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-teal-600" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-[210px]">
            <div>
              <Image
                src="/screenshots/product-bezel-2026-08-24-clipped/home-black.webp"
                alt="Medscribe home screen"
                width={1350}
                height={2760}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-teal-700/25 pt-5">
          <p className="northwell-print-label">The job</p>
          <p className="mt-3 font-serif text-[25px] leading-[1.2] font-semibold text-slate-950">
            One trustworthy picture that survives fragmented care, missed
            appointments, secondhand updates, and emergency handoffs.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-5">
          {[
            [
              "Keep it current",
              "Everyday visit and medication workflows maintain the record.",
            ],
            [
              "Make it obvious",
              "Time-critical medications and baseline context rise to the top.",
            ],
            [
              "Keep it controlled",
              "The patient decides what is shared, when, and with whom.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="pr-3">
              <p className="font-serif text-[16px] font-semibold text-slate-950">
                {title}
              </p>
              <p className="mt-2 text-[10.5px] leading-[1.5] text-slate-600">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-[0.72fr_1.28fr] gap-5">
          <div>
            <p className="northwell-print-label">One living picture</p>
            <p className="mt-2 text-[10.5px] leading-[1.5] text-slate-600">
              Everyday use keeps the record ready for the moments when a clear
              handoff matters most.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-[9.5px] leading-[1.45] text-slate-600">
            {recordContents.map((item) => (
              <li
                key={item}
                className="relative pl-3 before:absolute before:top-[0.42em] before:left-0 before:size-1 before:rounded-full before:bg-teal-500 before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PrintPage>

      <PrintPage page={2}>
        <section className="pt-3">
          <p className="northwell-print-label">What it is</p>
          <h2 className="northwell-print-title">
            A medical record the patient owns and carries
          </h2>
          <p className="northwell-print-lede">
            The daily tools work together as one clear, emergency-ready
            experience.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-5">
            {productPillars.map(([title, body], index) => (
              <div key={title} className="min-h-[120px] pr-3">
                <span className="text-[10px] font-bold text-teal-700">
                  0{index + 1}
                </span>
                <h3 className="mt-2 font-serif text-[17px] font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-[10.5px] leading-[1.5] text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <p className="northwell-print-label">Who it is for</p>
          <h2 className="northwell-print-title">
            Anyone holding care together
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-x-7 gap-y-2">
            {people.map(([title, body]) => (
              <div key={title} className="min-h-[70px] pr-4">
                <h3 className="font-serif text-[15px] font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-1.5 text-[10.5px] leading-[1.45] text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 border-l-4 border-teal-600 bg-teal-50/50 py-5 pr-5 pl-6">
          <p className="northwell-print-label">What makes it different</p>
          <h2 className="mt-3 font-serif text-[24px] font-semibold text-slate-950">
            Every alternative owns a slice. Medscribe owns the whole job.
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-6 text-[10.5px] leading-[1.55] text-slate-600">
            <p>
              Institutional records reflect their own care settings. Patients
              often move among urgent care, community specialists, pharmacies,
              and family caregivers.
            </p>
            <p>
              Medscribe connects visit memory, medication routines, and the
              handoff across those settings while keeping the patient&apos;s
              choices at the center.
            </p>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-7 border-t border-slate-300 pt-5">
          <div>
            <p className="northwell-print-label">Clear medication context</p>
            <p className="mt-2 text-[10px] leading-[1.5] text-slate-600">
              Medication details, routines, and questions stay connected in one
              readable view, with clinical decisions left to the care team.
            </p>
          </div>
          <div>
            <p className="northwell-print-label">Patient-controlled sharing</p>
            <p className="mt-2 text-[10px] leading-[1.5] text-slate-600">
              The patient reviews the context first and decides when a trusted
              caregiver or care professional should see it.
            </p>
          </div>
        </section>
      </PrintPage>

      <PrintPage page={3}>
        <section className="pt-3">
          <p className="northwell-print-label">The Northwell opportunity</p>
          <h2 className="northwell-print-title">
            A trusted touchstone between visits
          </h2>
          <p className="northwell-print-lede max-w-[650px]">
            Medscribe gives Northwell a useful presence in the part of care no
            portal owns: the ordinary days when patients remember, refill,
            question, coordinate, and try to follow the plan.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-7">
            {northwellFit.map(([title, body], index) => (
              <div key={title}>
                <span className="text-[10px] font-bold text-teal-700">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-[16px] font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-[10px] leading-[1.55] text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 bg-teal-50/60 px-6 py-5">
          <p className="northwell-print-label">The touchstone</p>
          <h2 className="mt-2 font-serif text-[24px] leading-[1.18] font-semibold text-slate-950">
            MyChart organizes the appointment. Medscribe helps the patient live
            the plan.
          </h2>
          <p className="mt-3 text-[11px] leading-[1.55] text-slate-600">
            A reminder, a refill, a quick question, or an update to the record
            becomes a small moment of continuity. Presented as part of the
            Northwell experience, those moments can reinforce the care plan and
            point the patient back to the team that knows them.
          </p>
        </section>

        <section className="mt-6 border-t border-slate-300 pt-5">
          <p className="northwell-print-label">How it fits the stack</p>
          <div className="mt-4 grid grid-cols-2 gap-9">
            <div>
              <h3 className="font-serif text-[16px] font-semibold text-slate-950">
                Epic remains the record of care
              </h3>
              <p className="mt-2 text-[10.5px] leading-[1.55] text-slate-600">
                Northwell&apos;s clinical workflows, orders, results, messages,
                and institutional history stay where they belong. Medscribe is
                not another EHR and does not need to displace MyChart.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[16px] font-semibold text-slate-950">
                The patient carries personal context
              </h3>
              <p className="mt-2 text-[10.5px] leading-[1.55] text-slate-600">
                Non-Epic visits, medication changes, caregiver knowledge, and
                emergency context stay with the patient. Consent governs when
                that picture is shared back into a Northwell interaction.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-[1.12fr_0.88fr] gap-9 border-t border-slate-300 pt-5">
          <div>
            <p className="northwell-print-label">The marketing value</p>
            <h3 className="mt-3 font-serif text-[19px] leading-[1.25] font-semibold text-slate-950">
              A patient promise people can understand
            </h3>
            <p className="mt-2 text-[10.5px] leading-[1.5] text-slate-600">
              Private by design. One current picture. Ready for the caregiver,
              the new doctor, or the ER. That is a human story people can
              understand, and it gives Northwell a visible way to stand for
              continuity beyond its own walls.
            </p>
          </div>
          <div>
            <p className="northwell-print-label">Built and live</p>
            <h3 className="mt-3 font-serif text-[19px] font-semibold text-slate-950">
              Sean O&apos;Connor
            </h3>
            <p className="mt-3 text-[10.5px] leading-[1.5] text-slate-600">
              A Bucknell computer science and engineering graduate who built
              Medscribe after watching his family lose the full picture of his
              grandfather&apos;s care. Medscribe is designed for iOS and
              Android.
            </p>
          </div>
        </section>
      </PrintPage>
    </div>
  );
}
