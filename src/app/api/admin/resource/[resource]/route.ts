import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { getResource, coerceResourceValues } from "@/lib/admin-resources";

 

type Delegate = {
  findMany: (args: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
  create: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const delegate = (db as unknown as Record<string, Delegate>)[def.model];
  if (!delegate) return NextResponse.json({ error: "Unknown model" }, { status: 404 });

  const rows = await delegate.findMany({
    orderBy: [{ [def.orderBy.field]: def.orderBy.dir }],
  });
  return NextResponse.json({ rows });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  if (!def.canCreate) {
    return NextResponse.json({ error: "This collection does not accept new records via the admin." }, { status: 400 });
  }

  const delegate = (db as unknown as Record<string, Delegate>)[def.model];
  if (!delegate) return NextResponse.json({ error: "Unknown model" }, { status: 404 });

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const data = coerceResourceValues(def, body);
    const row = await delegate.create({ data });
    return NextResponse.json({ row });
  } catch (error) {
    console.error(`Create ${resource} failed:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Create failed" },
      { status: 400 }
    );
  }
}
