import Image from "next/image";
import { MedscribeDevice } from "~/components/medscribe-device";

export function HardwarePair() {
  return (
    <figure className="relative isolate mx-auto aspect-[1/1.05] w-full max-w-[40rem]" aria-label="The Medscribe companion and wearable pendant">
      <div className="absolute top-[3%] -left-[9%] w-[88%] -rotate-[9deg] drop-shadow-[14px_28px_24px_rgba(4,24,19,0.24)]">
        <MedscribeDevice view="recording" priority sizes="(min-width: 1024px) 550px, 85vw" />
      </div>
      <div className="absolute top-[8%] right-[0%] z-10 w-[55%] rotate-[9deg] drop-shadow-[12px_24px_18px_rgba(4,24,19,0.3)]">
        <Image src="/device/pendant-v4/pendant-card.webp" alt="Rounded Medscribe pendant with a threaded neck cord and Alex Morgan’s Know Me card" width={2000} height={2400} priority sizes="(min-width: 1024px) 344px, 55vw" quality={92} className="h-auto w-full" />
      </div>
      <figcaption className="text-muted-foreground absolute right-0 bottom-[4%] left-0 text-center text-xs">The companion & the pendant. Two ways to keep Medscribe close.</figcaption>
    </figure>
  );
}
