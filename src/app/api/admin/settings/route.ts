import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { SETTING_GROUPS } from "@/lib/site-settings";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rows = await db.siteSetting.findMany();
    const out: Record<string, unknown> = {};
    for (const row of rows) {
      try {
        out[row.key] = JSON.parse(row.value);
      } catch {
        // skip malformed
      }
    }
    return NextResponse.json({ groups: SETTING_GROUPS, values: out });
  } catch (error) {
    console.error("Settings GET failed:", error);
    return NextResponse.json({ error: "Could not load settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { group?: string; data?: Record<string, unknown> };
    const group = body.group ?? "";
    if (!SETTING_GROUPS.some((g) => g.key === group)) {
      return NextResponse.json({ error: "Unknown settings group" }, { status: 400 });
    }
    const value = JSON.stringify(body.data ?? {});
    if (value.length > 8_000_000) {
      return NextResponse.json({ error: "These changes are too large to save. Use smaller images." }, { status: 413 });
    }
    await db.siteSetting.upsert({
      where: { key: group },
      update: { value },
      create: { key: group, value },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings PUT failed:", error);
    return NextResponse.json({ error: "Could not save settings" }, { status: 500 });
  }
}
