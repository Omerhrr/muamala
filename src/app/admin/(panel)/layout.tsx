import { redirect } from "next/navigation";
import { isAuthenticated, getSessionUser } from "@/lib/auth";
import { AdminShell } from "@/components/admin/shell";

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
  const user = await getSessionUser();

  return <AdminShell user={user ?? "admin"}>{children}</AdminShell>;
}
