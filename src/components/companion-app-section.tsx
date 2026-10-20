import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProductDevice } from "~/components/product-device";
import { Button } from "~/components/ui/button";

const captures = "/screenshots/native-marketing-2026-10-20-v2";
const phoneSteps = [
  {
    title: "Your visits, together on your phone.",
    body: "Keep upcoming appointments and saved visits together. Open a visit to prepare your questions or review the original material afterward.",
    image: "visits",
    alt: "Native Medscribe Visits screen showing Alex Morgan’s upcoming appointments",
  },
  {
    title: "Return to the original words.",
    body: "Review a recording’s transcript or imported document text beside the summary. Check the wording before keeping a takeaway or preparing your next question.",
    image: "visit-text",
    alt: "Native Medscribe showing timestamped dialogue from Alex Morgan’s diabetes and blood pressure visit",
  },
] as const;

export function CompanionAppSection() {
  return (
    <section id="workflow" aria-labelledby="workflow-title" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="workflow-title" className="font-display text-4xl leading-[1.06] font-semibold tracking-tight sm:text-5xl">
            Leave the appointment.<br className="hidden sm:block" />{" "}Keep the conversation.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            A question before the visit. A detail to check afterward. Medscribe
            keeps appointments, original words, and next steps close, so you
            can pick up where the conversation left off.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">
          {phoneSteps.map((step) => (
            <article key={step.image} className="min-w-0">
              <figure className="mx-auto max-w-[18rem] sm:max-w-[20rem]">
                <ProductDevice src={`${captures}/${step.image}.webp`} darkSrc={`${captures}/${step.image}-dark.webp`} alt={step.alt} sizes="(min-width: 640px) 320px, 288px" />
              </figure>
              <div className="border-border-soft mt-7 border-t pt-5">
                <h3 className="text-xl leading-snug font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-3 text-base leading-relaxed">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="border-border-soft mt-12 border-t pt-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            Transcription runs on your phone. Review your Know Me details in
            Medscribe and send your card back to the companion for the next visit.
          </p>
          <Button asChild variant="outline" className="mt-5 shrink-0 sm:mt-0"><Link href="/">Explore the Medscribe app<ArrowRight className="size-4" aria-hidden="true" /></Link></Button>
        </div>
      </div>
    </section>
  );
}
