import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Medscribe",
  robots: { index: false, follow: false, nocache: true },
};

export default function LandscapePage() {
  redirect("/");
}
