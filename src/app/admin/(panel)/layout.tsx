import { redirect } from "next/navigation";
import { isAuthenticated, getSessionUser } from "@/lib/auth";
import { AdminShell } from "@/components/admin/shell";
import { getSettingsGroup } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Muamala MFB",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const [user, brand] = await Promise.all([getSessionUser(), getSettingsGroup("brand")]);

  return (
    <AdminShell user={user ?? "admin"} brand={brand}>
      {children}
    </AdminShell>
  );
}
