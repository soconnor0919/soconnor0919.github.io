import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HardwareOptions() {
  return (
    <section id="options" aria-labelledby="options-title" className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:pb-24">
      <div className="border-border-soft mx-auto max-w-6xl border-t pt-8">
        <h2 id="options-title" className="sr-only">Find your Medscribe companion</h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-20">
          <Link href="#device" className="group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl font-semibold tracking-tight">The companion</h3>
              <ArrowUpRight className="text-primary size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none" aria-hidden="true" />
            </div>
            <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed">For the appointment. A larger Know Me card and a dedicated place to record, with everyone’s permission.</p>
          </Link>
          <Link href="#pendant" className="group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl font-semibold tracking-tight">The pendant</h3>
              <ArrowUpRight className="text-primary size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none" aria-hidden="true" />
            </div>
            <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed">For care on the go. Record appointments, wear your Know Me card, and reach your caregiver with a dedicated help button.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
