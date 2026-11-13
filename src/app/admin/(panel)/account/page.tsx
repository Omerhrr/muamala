import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { AccountForm } from "@/components/admin/account-form";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return <AccountForm user={user} />;
}
