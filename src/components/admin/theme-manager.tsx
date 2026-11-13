"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { themeToCssVars } from "@/lib/theme";
import type { ThemeConfig } from "@/lib/theme";

type Draft = { id?: string; name: string; brand: string; gold: string; bg: string };

const EMPTY_DRAFT: Draft = { name: "", brand: "#0e7c7b", gold: "#c9a227", bg: "#faf7f0" };

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const safe = HEX_RE.test(value) ? value : "#000000";
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={safe}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} colour picker`}
          className="size-9 shrink-0 cursor-pointer rounded-lg border border-border bg-white p-1"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#0e7c7b"
          className="bg-white font-mono text-xs uppercase"
        />
      </div>
    </div>
  );
}

/** Mini website preview painted with the draft's CSS variables. */
function ThemePreview({ theme, className }: { theme: Draft; className?: string }) {
  const vars = useMemo(
    () => (HEX_RE.test(theme.brand) ? themeToCssVars(theme) : {}),
    [theme]
  );
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border text-left shadow-inner",
        className
      )}
      style={vars as React.CSSProperties}
    >
      <div className="bg-brand-950 px-4 pb-4 pt-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">
          Muamala MFB
        </p>
        <p className="mt-1 font-serif text-sm font-bold leading-snug text-white">
          Banking that grows with you
        </p>
        <span className="mt-2.5 inline-block rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold text-brand-950">
          Open an Account
        </span>
      </div>
      <div className="bg-background px-4 py-3">
        <div className="rounded-xl border border-border bg-card p-3">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold text-brand-900">
            Savings
          </span>
          <p className="mt-1.5 text-[11px] font-bold text-brand-900">
            Individual & group savings
          </p>
          <p className="text-[9px] text-muted-foreground">
            Deposits insured by the NDIC
          </p>
        </div>
      </div>
    </div>
  );
}

export function ThemeManager() {
  const { toast } = useToast();
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null); // null = list mode

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/theme");
      const data = (await res.json()) as { themes?: ThemeConfig[] };
      setThemes(data.themes ?? []);
    } catch {
      toast({
        title: "Could not load themes",
        description: "Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
     
  }, []);

  const save = async () => {
    if (!draft) return;
    if (!draft.name.trim()) {
      toast({ title: "Please give the theme a name", variant: "destructive" });
      return;
    }
    for (const key of ["brand", "gold", "bg"] as const) {
      if (!HEX_RE.test(draft[key])) {
        toast({
          title: "Invalid colour",
          description: `${key} must be a 6-digit hex like #0e7c7b`,
          variant: "destructive",
        });
        return;
      }
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, activate: true }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Save failed");
      toast({
        title: "Theme applied",
        description: `"${draft.name}" is now live on the website.`,
      });
      setDraft(null);
      await load();
    } catch (error) {
      toast({
        title: "Could not save theme",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const activate = async (theme: ThemeConfig) => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: theme.id,
          name: theme.name,
          brand: theme.brand,
          gold: theme.gold,
          bg: theme.bg,
          activate: true,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Activation failed");
      toast({ title: "Theme applied", description: `"${theme.name}" is now live.` });
      await load();
    } catch (error) {
      toast({
        title: "Could not activate theme",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (theme: ThemeConfig) => {
    if (!window.confirm(`Delete the theme "${theme.name}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/theme?id=${theme.id}`, { method: "DELETE" });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Delete failed");
      toast({ title: "Theme deleted" });
      await load();
    } catch (error) {
      toast({
        title: "Could not delete theme",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" aria-hidden="true" />
      </div>
    );
  }

  /* ---------- editor mode ---------- */
  if (draft) {
    return (
      <div className="py-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-900">
              {draft.id ? "Edit theme" : "New theme"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a brand colour, an accent colour and a background tone. The whole website
              adapts automatically — buttons, headings, cards and charts.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setDraft(null)}
            className="rounded-full px-5"
            disabled={busy}
          >
            Cancel
          </Button>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-brand-900">Theme name</Label>
                <Input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="e.g. Teal & Gold"
                  className="bg-white"
                />
              </div>
              <ColorInput
                label="Brand colour (buttons, headings, sidebar)"
                value={draft.brand}
                onChange={(brand) => setDraft({ ...draft, brand })}
              />
              <ColorInput
                label="Accent / gold colour (highlights, badges)"
                value={draft.gold}
                onChange={(gold) => setDraft({ ...draft, gold })}
              />
              <ColorInput
                label="Background tone (page canvas)"
                value={draft.bg}
                onChange={(bg) => setDraft({ ...draft, bg })}
              />
              <Button
                onClick={save}
                disabled={busy}
                className="w-full rounded-full bg-brand-800 py-6 font-bold text-white hover:bg-brand-700"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                Save & apply to website
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Applying immediately switches the public website to this theme.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-gold-600">
              Live preview
            </p>
            <ThemePreview theme={draft} />
          </section>
        </div>
      </div>
    );
  }

  /* ---------- list mode ---------- */
  return (
    <div className="py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-900">Theme & colours</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            One click switches the entire public website to a new colour scheme. Edit the presets
            or create your own combination — the preview shows exactly what customers will see.
          </p>
        </div>
        <Button
          onClick={() => setDraft({ ...EMPTY_DRAFT })}
          className="rounded-full bg-brand-800 px-5 font-bold text-white hover:bg-brand-700"
        >
          <Plus className="size-4" />
          New theme
        </Button>
      </header>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={cn(
              "rounded-3xl border bg-card p-5 transition-shadow hover:shadow-lg",
              theme.isActive ? "border-gold-400 ring-2 ring-gold-500/40" : "border-border"
            )}
          >
            <ThemePreview theme={theme} />
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-brand-900">{theme.name}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {[theme.brand, theme.gold, theme.bg].map((c) => (
                    <span
                      key={c}
                      title={c}
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                    {theme.brand}
                  </span>
                </div>
              </div>
              {theme.isActive && (
                <span className="shrink-0 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-brand-950">
                  Live
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              {!theme.isActive && (
                <Button
                  size="sm"
                  onClick={() => activate(theme)}
                  disabled={busy}
                  className="flex-1 rounded-full bg-brand-800 font-bold text-white hover:bg-brand-700"
                >
                  Apply to site
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setDraft({
                    id: theme.id,
                    name: theme.name,
                    brand: theme.brand,
                    gold: theme.gold,
                    bg: theme.bg,
                  })
                }
                disabled={busy}
                aria-label={`Edit ${theme.name}`}
                className="rounded-full px-3"
              >
                <Pencil className="size-3.5" />
              </Button>
              {!theme.isActive && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => remove(theme)}
                  disabled={busy}
                  aria-label={`Delete ${theme.name}`}
                  className="rounded-full px-3 text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
