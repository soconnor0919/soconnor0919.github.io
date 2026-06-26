export const AUTH_COOKIE_NAME = "medscribe_site_access";

const ACCESS_PAYLOAD = "medscribe-site-access-v1";

async function signAccessToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(ACCESS_PAYLOAD),
  );

  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export async function verifyAccessToken(
  password: string,
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  const expected = await signAccessToken(password);
  return timingSafeEqual(expected, token);
}

export async function createAccessCookieValue(
  password: string,
): Promise<string> {
  return signAccessToken(password);
}

export function safeRedirectPath(path: string | null | undefined): string {
  if (!path?.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}
