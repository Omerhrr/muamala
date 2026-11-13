"use client";

import { useState } from "react";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function AccountForm({ user }: { user: string }) {
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) {
      toast({
        title: "Passwords do not match",
        description: "Please retype the new password.",
        variant: "destructive",
      });
      return;
    }
    if (next.length < 8) {
      toast({
        title: "Password too short",
        description: "Use at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          currentPassword: current,
          newPassword: next,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Could not change password");
      toast({
        title: "Password updated",
        description: "Use your new password the next time you sign in.",
      });
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (error) {
      toast({
        title: "Could not change password",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="py-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-brand-900">Account & password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You are signed in as <span className="font-bold text-brand-900">{user}</span>. Keep your
          password strong — this panel controls everything published on the website.
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-brand-900">
            <KeyRound className="size-5 text-gold-600" aria-hidden="true" />
            Change password
          </h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current" className="text-brand-900">
                Current password
              </Label>
              <Input
                id="current"
                required
                type="password"
                autoComplete="current-password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="next" className="text-brand-900">
                New password (min. 8 characters)
              </Label>
              <Input
                id="next"
                required
                type="password"
                autoComplete="new-password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-brand-900">
                Confirm new password
              </Label>
              <Input
                id="confirm"
                required
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="bg-white"
              />
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-brand-800 py-6 font-bold text-white hover:bg-brand-700"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              Update password
            </Button>
          </form>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-brand-900">
            <ShieldCheck className="size-5 text-gold-600" aria-hidden="true" />
            Security tips
          </h2>
          <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Use at least 12 characters mixing letters, numbers and symbols.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Do not share the admin password over WhatsApp or email — share access in person.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Sign out when using a shared or public computer.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Change the default password immediately after the website goes live.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
