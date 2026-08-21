import "~/styles/globals.css";

import { type Metadata } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";

import { UmamiAnalytics } from "~/components/umami-analytics";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Medscribe | Carry the context when care gets complicated",
    template: "Medscribe | %s",
  },
  description:
    "A private, patient-controlled beta that helps keep visits, medications, and critical context together on your device.",
  applicationName: "Medscribe",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Medscribe",
    description:
      "Carry the context when care gets complicated. Private, patient-controlled medical context on your device.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen">
        {children}
        <UmamiAnalytics />
      </body>
    </html>
  );
}
