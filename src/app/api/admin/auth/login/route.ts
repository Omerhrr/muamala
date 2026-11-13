import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
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
      return NextResponse.json(
        { success: false, error: "Incorrect username or password." },
        { status: 401 }
      );
    }

    const token = createSessionToken(admin.username);
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
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
