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
 * A precomposited iPhone 17 Pro capture using the calibrated Silver bezel in
 * `public/screenshots/product-bezel-2026-08-24-unified-type`. Keeping the frame in
 * the source image preserves its fine edge detail without adding layout or
 * client-side work.
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
    className: cn("h-auto w-full translate-z-0", className),
  };
  const { props: lightProps } = getImageProps({ src, ...shared });
  const darkProps = darkSrc
    ? getImageProps({ src: darkSrc, ...shared }).props
    : null;
  const darkSrcSet = darkProps?.srcSet ?? darkProps?.src;

  return (
    <picture className="block">
      {darkProps ? (
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={darkSrcSet}
          sizes={darkProps.sizes}
        />
      ) : null}
      {/* next/image cannot art-direct by color scheme without downloading both sources. */}
      <img {...lightProps} alt={alt} />
    </picture>
  );
}
