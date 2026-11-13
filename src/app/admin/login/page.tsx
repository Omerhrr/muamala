import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login | Muamala MFB",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="lattice-bg flex min-h-screen items-center justify-center bg-brand-950 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white shadow-lg">
            { }
            <img
              src="/logo-mark.png"
              alt="Muamala MFB emblem"
              width={44}
              height={44}
              className="size-11"
            />
          </span>
          <h1 className="mt-5 font-serif text-2xl font-bold text-white">Muamala MFB Admin</h1>
          <p className="mt-2 text-sm text-brand-200">
            Sign in to manage website content and themes
          </p>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-xs text-brand-300/80">
          Protected area — authorised bank staff only.
        </p>
      </div>
    </main>
  );
}
