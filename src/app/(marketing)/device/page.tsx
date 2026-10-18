import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CompanionAppSection } from "~/components/companion-app-section";
import { HardwareOptions } from "~/components/hardware-options";
import { PendantSection } from "~/components/pendant-section";
import { HardwareSection } from "~/components/hardware-section";
import { KnowMeSection } from "~/components/know-me-section";
import { HardwarePair } from "~/components/hardware-pair";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "The Medscribe companion & pendant",
  description:
    "Meet the Medscribe companion and wearable pendant. Record appointments, keep your Know Me card close, and stay connected to your care.",
};

export default function DevicePage() {
  return (
    <>
      <section className="overflow-hidden px-4 pt-12 pb-8 sm:px-6 lg:pt-16 lg:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-2 lg:grid-cols-[1fr_1.15fr] lg:gap-0">
          <div className="max-w-xl">
            <h1 className="font-display text-[clamp(3.5rem,6vw,5.6rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
              Your care.<br />Close at hand.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed sm:text-xl">
              Two ways to keep Medscribe close. Record appointments, carry your
              Know Me card, and bring the conversation back to your phone.
              Choose the companion or the wearable pendant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/access">
                  Request access{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#options">Explore both designs</Link>
              </Button>
            </div>

          </div>
          <HardwarePair />
        </div>
      </section>
      <HardwareOptions />
      <HardwareSection />
      <PendantSection />
      <KnowMeSection />
      <CompanionAppSection />
    </>
  );
}
