import Image from "next/image";
import { ProductDevice } from "~/components/product-device";

export function KnowMeSection() {
  return (
    <section
      id="know-me"
      aria-labelledby="know-me-title"
      className="bg-muted/40 scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <h2
            id="know-me-title"
            className="font-display max-w-lg text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance"
          >
            Your Know Me card. Keep it with you.
          </h2>
          <p className="max-w-lg text-lg leading-relaxed">
            Meeting a new care team or finding it hard to explain? Hand over your
            companion. Allergies, medications, care contacts, and what helps you
            communicate give someone a starting point.
          </p>
        </div>
        <figure className="mx-auto mt-8 max-w-[40rem] sm:mt-12">
          <div className="relative isolate aspect-square">
            <div className="absolute top-[2%] right-[12%] w-[40%] rotate-6 drop-shadow-[0_18px_20px_rgba(12,44,38,0.16)]">
              <ProductDevice
                src="/device/phone-know-me-v1/know-me.webp"
                darkSrc="/device/phone-know-me-v1/know-me-dark.webp"
                alt="Alex Morgan’s Know Me record in the Medscribe iPhone app, with matching allergies, conditions, medications, and care contact"
                sizes="(min-width: 640px) 256px, 40vw"
              />
            </div>
            <div className="absolute top-[14%] left-[8%] z-10 w-[49%] -rotate-6 drop-shadow-[12px_24px_18px_rgba(12,44,38,0.24)]">
              <Image
                src="/device/pearl-v5/medscribe-sd-card-cutout.webp"
                alt="The complete Medscribe companion showing Alex Morgan’s Know Me card"
                width={1454}
                height={2114}
                sizes="(min-width: 640px) 314px, 49vw"
                quality={92}
                className="h-auto w-full"
              />
            </div>
          </div>
          <figcaption className="mt-4 text-center text-sm font-medium">
            Carry it on your companion. Review it in Medscribe.
          </figcaption>
        </figure>
        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed">
          Choose what to share in the app and update your handheld card as your
          needs change. Your details stay on the e-paper screen, ready for the
          next conversation.
        </p>
      </div>
    </section>
  );
}
