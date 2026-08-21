import Image from "next/image";

import { cn } from "~/lib/utils";

type ProductDeviceProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A precomposited product capture using the licensed device bezels in
 * `public/screenshots/pitch`. Keeping the frame in the source image preserves
 * the bezel details without adding layout or client-side work.
 */
export function ProductDevice({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 320px, 72vw",
  priority = false,
}: ProductDeviceProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={810}
      height={1656}
      sizes={sizes}
      priority={priority}
      className={cn(
        "h-auto w-full drop-shadow-[0_35px_35px_rgba(15,23,42,0.22)] dark:drop-shadow-[0_38px_42px_rgba(0,0,0,0.5)]",
        className,
      )}
    />
  );
}
