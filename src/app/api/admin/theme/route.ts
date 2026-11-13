import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

const hex = /^#[0-9a-fA-F]{6}$/;

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const themes = await db.themeConfig.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ themes });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const parsed = z
      .object({
        id: z.string().optional(),
        name: z.string().trim().min(1).max(60),
        brand: z.string().regex(hex, "Brand colour must be a hex value"),
        gold: z.string().regex(hex, "Gold colour must be a hex value"),
        bg: z.string().regex(hex, "Background colour must be a hex value"),
        activate: z.boolean().default(true),
      })
      .safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid theme" },
        { status: 400 }
      );
    }

    const { id, name, brand, gold, bg, activate } = parsed.data;

    const theme = id
      ? await db.themeConfig.update({
          where: { id },
          data: { name, brand: brand.toLowerCase(), gold: gold.toLowerCase(), bg: bg.toLowerCase() },
        })
      : await db.themeConfig.create({
          data: {
            name,
            brand: brand.toLowerCase(),
            gold: gold.toLowerCase(),
            bg: bg.toLowerCase(),
            isPreset: false,
          },
        });

    if (activate) {
      await db.themeConfig.updateMany({ data: { isActive: false } });
      await db.themeConfig.update({ where: { id: theme.id }, data: { isActive: true } });
    }

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error("Theme save failed:", error);
    return NextResponse.json({ error: "Could not save theme" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const theme = await db.themeConfig.findUnique({ where: { id } });
  if (!theme) return NextResponse.json({ error: "Theme not found" }, { status: 404 });
  if (theme.isActive) {
    return NextResponse.json({ error: "Deactivate this theme before deleting it." }, { status: 400 });
  }
  await db.themeConfig.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
