import Script from "next/script";

import { env } from "~/env";

const DEFAULT_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";

/**
 * Privacy-friendly page analytics via Umami. Enabled when
 * `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set in `.env`.
 */
export function UmamiAnalytics() {
  const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  const src = env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? DEFAULT_UMAMI_SCRIPT_URL;

  return (
    <Script
      defer
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
