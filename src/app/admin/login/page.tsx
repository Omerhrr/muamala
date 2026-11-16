import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";
import { getSettingsGroup } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login | Muamala MFB",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");
  const brand = await getSettingsGroup("brand");

  return (
    <main className="lattice-bg flex min-h-screen items-center justify-center bg-brand-950 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          {brand.logoMark && (
            <span className="mx-auto flex h-14 min-w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand.logoMark} alt={brand.logoAlt} className="max-h-full max-w-[200px] object-contain" />
            </span>
          )}
          <h1 className="mt-5 font-serif text-2xl font-bold text-white">{brand.adminName} Admin</h1>
          <p className="mt-2 text-sm text-brand-200">
            Sign in to manage website content and themes
          </p>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-xs text-brand-300/80">
          Protected area. Authorised bank staff only.
        </p>
      </div>
    </main>
  );
}
