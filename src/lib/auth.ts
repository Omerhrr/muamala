import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "muamala-mfb-admin-session-secret-v1";

export const SESSION_COOKIE = "mfb_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/* ---------- passwords (scrypt, no external deps) ---------- */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === test.length && timingSafeEqual(expected, test);
}

/* ---------- session tokens (HMAC-signed) ---------- */

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string): string {
  return b64url(createHmac("sha256", SECRET).update(payload).digest());
}

export function createSessionToken(username: string): string {
  const payload = b64url(
    JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS })
  );
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      u: string;
      exp: number;
    };
    if (!data.exp || data.exp < Date.now() || !data.u) return null;
    return data.u;
  } catch {
    return null;
  }
}

/* ---------- helpers for route handlers / server components ---------- */

export async function getSessionUser(): Promise<string | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  try {
    const admin = await db.adminUser.findUnique({ where: { username: user } });
    return Boolean(admin);
  } catch {
    return false;
  }
}
