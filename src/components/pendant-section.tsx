import Image from "next/image";
import { Bell, ChevronRight, HeartHandshake, Mic } from "lucide-react";

export function PendantSection() {
  return (
    <section id="pendant" aria-labelledby="pendant-title" className="medscribe-hardware scroll-mt-24 overflow-hidden px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-4 lg:grid-cols-2 lg:gap-20">
        <figure className="mx-auto w-full max-w-[31rem] -rotate-3 drop-shadow-[12px_24px_24px_rgba(4,24,19,0.2)]">
          <Image src="/device/pendant-v4/pendant-card.webp" alt="Medscribe pendant with rounded edges, a continuous cord through the rear attachment, and a readable Know Me card" width={2000} height={2400} sizes="(min-width: 1024px) 496px, 90vw" quality={92} className="h-auto w-full" />
        </figure>
        <div className="pb-4">
          <h2 id="pendant-title" className="font-display max-w-lg text-[clamp(2.8rem,4.5vw,4rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance">Small enough to wear.<br />Personal enough to matter.</h2>
          <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed">When explaining everything feels like too much, start with your Know Me card. The pendant keeps the details you choose close enough to show someone.</p>
          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <Mic className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
              <div><h3 className="text-base font-semibold">A smaller appointment companion.</h3><p className="text-muted-foreground mt-1 max-w-md text-base leading-relaxed">Ask everyone’s permission, record your appointment on the pendant, then listen again and review the transcript in Medscribe.</p></div>
            </div>
            <div className="flex gap-4">
              <HeartHandshake className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
              <div><h3 className="text-base font-semibold">A quick introduction to you.</h3><p className="text-muted-foreground mt-1 max-w-md text-base leading-relaxed">Allergies, medications, care contacts, and what helps you communicate.</p></div>
            </div>
            <div className="flex gap-4">
              <ChevronRight className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
              <div><h3 className="text-base font-semibold">One button to find the detail.</h3><p className="text-muted-foreground mt-1 max-w-md text-base leading-relaxed">Press the lower side button to move through your card, one clear page at a time.</p></div>
            </div>
            <div className="flex gap-4">
              <Bell className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
              <div><h3 className="text-base font-semibold">A deliberate hold for help.</h3><p className="text-muted-foreground mt-1 max-w-md text-base leading-relaxed">Hold the upper side button to notify your caregiver when you need help.</p></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
