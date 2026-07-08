import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "anti_pulitzer_admin";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

function getSessionToken(): string | null {
  const password = getAdminPassword();
  if (!password) {
    return null;
  }

  return createHmac("sha256", password)
    .update("anti-pulitzer-admin-session")
    .digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getSessionToken();
  if (!expected) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) {
    return false;
  }

  try {
    const a = Buffer.from(session);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function verifyAdminPassword(
  password: string,
): Promise<boolean> {
  const expected = getAdminPassword();
  if (!expected) {
    return false;
  }

  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const token = getSessionToken();
  if (!token) {
    throw new Error("ADMIN_PASSWORD is not configured.");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
