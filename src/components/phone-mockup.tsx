import { ProductDevice } from "~/components/product-device";
import { cn } from "~/lib/utils";

interface PhoneMockupProps {
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Rendered mockup width in px. @default 280 */
  width?: number;
}

export function PhoneMockup({
  src,
  darkSrc,
  alt,
  className,
  priority,
  width = 280,
}: PhoneMockupProps) {
  return (
    <div
      className={cn("mx-auto", className)}
      style={{ width: `min(${width}px, 78vw)` }}
    >
      <ProductDevice
        src={src}
        darkSrc={darkSrc}
        alt={alt}
        priority={priority}
        sizes={`${width}px`}
      />
    </div>
  );
}
