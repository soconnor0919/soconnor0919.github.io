import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  AUTH_COOKIE_NAME,
  safeRedirectPath,
  verifyAccessToken,
} from "~/lib/site-auth";

/**
 * Site-wide password gate via a login page and signed session cookie.
 *
 * Set `SITE_PASSWORD_ENABLED=true` and `SITE_PASSWORD` to require a password
 * before the site loads. The gate is off by default.
 */
export async function proxy(req: NextRequest) {
  const password =
    process.env.SITE_PASSWORD_ENABLED === "true"
      ? process.env.SITE_PASSWORD
      : undefined;
  const { pathname } = req.nextUrl;

  if (!password) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthed = await verifyAccessToken(password, token);

  if (pathname === "/login" || pathname === "/api/auth") {
    if (isAuthed && pathname === "/login") {
      const from = safeRedirectPath(req.nextUrl.searchParams.get("from"));
      return NextResponse.redirect(new URL(from, req.url));
    }

    return NextResponse.next();
  }

  if (!isAuthed) {
    const loginUrl = new URL("/login", req.url);
    const returnPath = pathname + req.nextUrl.search;

    if (returnPath !== "/") {
      loginUrl.searchParams.set("from", returnPath);
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
