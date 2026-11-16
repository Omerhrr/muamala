import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

// Simple in-memory brute-force guard: 8 failed attempts per IP per 10 minutes.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function clientKey(req: NextRequest): string {
  return (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
}

export async function POST(req: NextRequest) {
  const key = clientKey(req);
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }
  try {
    const body = await req.json();
    const parsed = z
      .object({
        username: z.string().trim().min(1).max(60),
        password: z.string().min(1).max(200),
      })
      .safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Please enter your username and password." },
        { status: 400 }
      );
    }

    const admin = await db.adminUser.findUnique({
      where: { username: parsed.data.username.toLowerCase() },
    });

    if (!admin || !verifyPassword(parsed.data.password, admin.passwordHash)) {
      const cur = attempts.get(key);
      attempts.set(key, cur && cur.resetAt > now ? { ...cur, count: cur.count + 1 } : { count: 1, resetAt: now + WINDOW_MS });
      return NextResponse.json(
        { success: false, error: "Incorrect username or password." },
        { status: 401 }
      );
    }

    attempts.delete(key);
    const token = createSessionToken(admin.username);
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
