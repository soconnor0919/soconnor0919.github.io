import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CompanionAppSection } from "~/components/companion-app-section";
import { HardwareSection } from "~/components/hardware-section";
import { KnowMeSection } from "~/components/know-me-section";
import { MedscribeDevice } from "~/components/medscribe-device";
import { Button } from "~/components/ui/button";
import { productHardware } from "~/content/product";

export const metadata: Metadata = {
  title: "The Medscribe companion",
  description:
    "A dedicated e-paper companion for recording appointments and carrying your reviewed Know Me card. Hardware in development.",
};

export default function DevicePage() {
  return (
    <>
      <section className="px-4 pt-12 pb-8 sm:px-6 lg:pt-16 lg:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-4">
          <div className="max-w-xl">
            <h1 className="font-display text-[clamp(3.5rem,6vw,5.6rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
              Stay in the conversation.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed sm:text-xl">
              A quiet e-paper companion for the moments that matter. Record the
              appointment, carry your Know Me card, and pick up the details in
              Medscribe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/access">
                  Request access{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#workflow">See how it works</Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
              {productHardware.availability}
            </p>
          </div>
          <figure className="mx-auto hidden w-full max-w-[38rem] lg:block">
            <MedscribeDevice
              view="recording"
              priority
              sizes="(min-width: 1024px) 590px, (min-width: 640px) 560px, 100vw"
            />
            <figcaption className="text-muted-foreground text-center text-xs leading-relaxed">
              Recording preview
              <br />
              {productHardware.renderLabel}
            </figcaption>
          </figure>
        </div>
      </section>
      <HardwareSection />
      <KnowMeSection />
      <CompanionAppSection />
    </>
  );
}
