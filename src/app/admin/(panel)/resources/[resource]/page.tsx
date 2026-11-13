import { ResourceManager } from "@/components/admin/resource-manager";
import { RESOURCES } from "@/lib/admin-resources";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ resource: string }> };

export async function generateMetadata({ params }: Props) {
  const { resource } = await params;
  const def = RESOURCES[resource];
  return { title: def ? `${def.title} | Admin` : "Admin" };
}

export default async function AdminResourcePage({ params }: Props) {
  const { resource } = await params;
  if (!RESOURCES[resource]) notFound();
  return <ResourceManager resourceKey={resource} />;
}
