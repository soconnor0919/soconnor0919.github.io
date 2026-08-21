import { getImageProps } from "next/image";

import { cn } from "~/lib/utils";

type ProductDeviceProps = {
  src: string;
  darkSrc?: string;
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
  darkSrc,
  alt,
  className,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 320px, 72vw",
  priority = false,
}: ProductDeviceProps) {
  const shared = {
    alt,
    width: 1350,
    height: 2760,
    sizes,
    priority,
    quality: 92,
    className: cn(
      "h-auto w-full translate-z-0 drop-shadow-[0_35px_35px_rgba(15,23,42,0.22)] dark:drop-shadow-[0_38px_42px_rgba(0,0,0,0.5)]",
      className,
    ),
  };
  const { props: lightProps } = getImageProps({ src, ...shared });
  const darkProps = darkSrc
    ? getImageProps({ src: darkSrc, ...shared }).props
    : null;

  return (
    <picture className="block">
      {darkProps ? (
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={darkProps.srcSet}
          sizes={darkProps.sizes}
        />
      ) : null}
      {/* next/image cannot art-direct by color scheme without downloading both sources. */}
      <img {...lightProps} alt={alt} />
    </picture>
  );
}
