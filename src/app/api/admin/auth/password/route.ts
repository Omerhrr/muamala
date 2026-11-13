import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const parsed = z
      .object({
        username: z.string().trim().min(3).max(60),
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8, "New password must be at least 8 characters").max(200),
      })
      .safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { username, currentPassword, newPassword } = parsed.data;
    const admin = await db.adminUser.findUnique({ where: { username } });
    if (!admin || !verifyPassword(currentPassword, admin.passwordHash)) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    await db.adminUser.update({
      where: { username },
      data: { passwordHash: hashPassword(newPassword) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json({ error: "Could not change password." }, { status: 500 });
  }
}
