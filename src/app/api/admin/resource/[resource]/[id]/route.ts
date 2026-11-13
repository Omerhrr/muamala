import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { getResource, coerceResourceValues } from "@/lib/admin-resources";

 

type Delegate = {
  update: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
  delete: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { resource, id } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const delegate = (db as unknown as Record<string, Delegate>)[def.model];
  if (!delegate) return NextResponse.json({ error: "Unknown model" }, { status: 404 });

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const data = coerceResourceValues(def, body, true);
    const row = await delegate.update({ where: { id }, data });
    return NextResponse.json({ row });
  } catch (error) {
    console.error(`Update ${resource}/${id} failed:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { resource, id } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const delegate = (db as unknown as Record<string, Delegate>)[def.model];
  if (!delegate) return NextResponse.json({ error: "Unknown model" }, { status: 404 });

  try {
    await delegate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Delete ${resource}/${id} failed:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 400 }
    );
  }
}
