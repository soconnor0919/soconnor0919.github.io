import Image from "next/image";

import { cn } from "~/lib/utils";

const screenDescriptions = {
  recording: "appointment recording with a waveform",
  home: "appointment recording, Know Me, and phone connection actions",
  card: "the resting Know Me card with allergies, medications, conditions, care contacts, and support preferences",
  connect: "instructions for connecting inside the Medscribe iPhone app",
} as const;

/** Copied CAD geometry with a capture of the actual SD app in C/LVGL + WAMR. */
export function MedscribeDevice({
  view = "home",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 520px, (min-width: 640px) 440px, 90vw",
}: {
  view?: keyof typeof screenDescriptions;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={`/device/pearl-v5/medscribe-sd-${view}.webp`}
      alt={`Medscribe e-paper companion CAD render with an actual SD app simulator capture showing ${screenDescriptions[view]}`}
      width={2400}
      height={2400}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={92}
      className={cn("h-auto w-full", className)}
    />
  );
}
