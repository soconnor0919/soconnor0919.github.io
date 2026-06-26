import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  createAccessCookieValue,
} from "~/lib/site-auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(req: Request) {
  const password = process.env.SITE_PASSWORD;

  if (!password) {
    return NextResponse.json({ ok: true });
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supplied = body.password ?? "";
  if (supplied !== password) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createAccessCookieValue(password);
  const response = NextResponse.json({ ok: true });

  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
}
