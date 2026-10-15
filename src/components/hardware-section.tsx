import { ArrowRight, ContactRound, Mic, Smartphone } from "lucide-react";
import Link from "next/link";

import { MedscribeDevice } from "~/components/medscribe-device";
import { Button } from "~/components/ui/button";
import { productHardware } from "~/content/product";

const deviceFunctions = [
  {
    icon: Mic,
    title: "Be present for the conversation.",
    body: "With everyone’s permission, record an appointment on the companion. The original audio stays encrypted on the device.",
  },
  {
    icon: ContactRound,
    title: "Keep your Know Me card close.",
    body: "Carry your allergies, medications, care contacts, and what helps you communicate. Hand over the companion to give a care team a quick introduction to you.",
  },
  {
    icon: Smartphone,
    title: "Pick up in the Medscribe app.",
    body: "Connect to your iPhone to import a recording, transcribe it on the phone, and review it alongside the rest of your care context.",
  },
] as const;

export function HardwareSection() {
  return (
    <section
      id="device"
      aria-labelledby="device-title"
      className="medscribe-hardware scroll-mt-24 px-4 pt-4 pb-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <figure className="mx-auto w-full max-w-[40rem] lg:max-w-[34rem]">
          <div className="relative isolate aspect-[1.1] overflow-hidden lg:hidden">
            <div className="absolute top-[3%] -left-[8%] w-[82%] -rotate-4">
              <MedscribeDevice
                view="recording"
                sizes="(min-width: 768px) 525px, 82vw"
                className="drop-shadow-[0_18px_14px_rgba(12,44,38,0.18)]"
              />
            </div>
            <div className="absolute top-0 -right-[8%] z-10 w-[82%] rotate-3">
              <MedscribeDevice
                view="card"
                sizes="(min-width: 768px) 525px, 82vw"
                className="drop-shadow-[0_18px_14px_rgba(12,44,38,0.18)]"
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <MedscribeDevice view="card" />
          </div>
          <figcaption className="text-muted-foreground mt-2 text-center text-xs leading-relaxed">
            {productHardware.renderLabel}
          </figcaption>
        </figure>
        <div>
          <h2
            id="device-title"
            className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
          >
            A little space for the appointment.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            Meet the Medscribe companion. A dedicated e-paper device for your
            conversations and the context you choose to carry. Familiar physical
            controls. A quiet, readable screen. Just Medscribe.
          </p>
          <div className="divide-border-soft mt-8 divide-y">
            {deviceFunctions.map(({ icon: Icon, title, body }) => (
              <article key={title} className="flex gap-4 py-5 first:pt-0">
                <Icon
                  className="text-primary mt-1 size-5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {body}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
            {productHardware.availability} The current device connection is in
            the iPhone app; the Medscribe phone app also works on its own.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="#workflow">
              See how they work together{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
