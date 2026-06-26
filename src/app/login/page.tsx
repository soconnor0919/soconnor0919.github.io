import type { Metadata } from "next";

import { LoginForm } from "~/components/login-form";
import { safeRedirectPath } from "~/lib/site-auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return <LoginForm redirectTo={safeRedirectPath(from)} />;
}
