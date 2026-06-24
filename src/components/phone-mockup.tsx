"use client";

import Image from "next/image";
import { IPhoneMockup } from "react-device-mockup";

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
    <div className={cn("mx-auto w-fit drop-shadow-[0_18px_45px_rgba(15,23,42,0.14)]", className)}>
      <IPhoneMockup
        screenWidth={width}
        screenType="island"
        frameColor="#111827"
        statusbarColor="#f8fafc"
        hideStatusBar
        hideNavBar
        transparentNavBar
      >
        <div className="relative h-full w-full overflow-hidden bg-surface">
          <Image
            src={src}
            alt={alt}
            width={1206}
            height={2622}
            priority={priority}
            unoptimized
            className={cn(
              "h-full w-full object-cover",
              isSimulatorCapture
                ? "scale-[1.22] object-[50%_58%]"
                : "object-top",
            )}
          />
        </div>
      </IPhoneMockup>
    </div>
  );
}
