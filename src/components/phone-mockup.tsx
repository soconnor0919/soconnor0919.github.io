import Image from "next/image";

import { cn } from "~/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Rendered mockup width in px. @default 280 */
  width?: number;
  /** Use "simulator" only for captures that already include device chrome. */
  captureMode?: "simulator" | "raw";
}

export function PhoneMockup({
  src,
  alt,
  className,
  priority,
  width = 280,
  captureMode = "raw",
}: PhoneMockupProps) {
  const isSimulatorCapture = captureMode === "simulator";

  return (
    <div
      className={cn(
        "mx-auto overflow-hidden rounded-[2.25rem] border-[7px] border-slate-950 bg-slate-950 p-1 shadow-[0_24px_60px_rgba(15,23,42,0.18)]",
        className,
      )}
      style={{ width }}
    >
      <div className="bg-surface relative aspect-[1206/2622] overflow-hidden rounded-[1.65rem]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={`${width}px`}
          className={cn(
            "object-cover",
            isSimulatorCapture ? "scale-[1.22] object-[50%_58%]" : "object-top",
          )}
        />
      </div>
    </div>
  );
}
