"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DEFAULT_SETTINGS, SETTING_GROUPS } from "@/lib/site-settings";
import type { FieldDef, GroupDef } from "@/lib/site-settings";

type ValuesByGroup = Record<string, Record<string, unknown>>;

/* ---------- individual field editors ---------- */

function ListField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const text = value.join("\n");
  return (
    <Textarea
      rows={Math.max(3, value.length + 1)}
      value={text}
      onChange={(e) =>
        onChange(e.target.value.split("\n").map((line) => line.trimStart()).filter(Boolean))
      }
      placeholder="One entry per line"
      className="bg-white"
    />
  );
}

function ItemsField({
  field,
  items,
  onChange,
}: {
  field: FieldDef;
  items: Record<string, string>[];
  onChange: (next: Record<string, string>[]) => void;
}) {
  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Item {index + 1}
            </p>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >
                <ArrowUp className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                <ArrowDown className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 text-destructive"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                aria-label="Remove item"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(field.itemFields ?? []).map((sub) => (
              <div key={sub.name} className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">{sub.label}</Label>
                {sub.type === "textarea" ? (
                  <Textarea
                    rows={2}
                    value={item[sub.name] ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...next[index], [sub.name]: e.target.value };
                      onChange(next);
                    }}
                    className="bg-white"
                  />
                ) : (
                  <Input
                    value={item[sub.name] ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...next[index], [sub.name]: e.target.value };
                      onChange(next);
                    }}
                    className="bg-white"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          const blank: Record<string, string> = {};
          for (const sub of field.itemFields ?? []) blank[sub.name] = "";
          onChange([...items, blank]);
        }}
      >
        <Plus className="size-3.5" />
        Add item
      </Button>
    </div>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          rows={field.name === "smallprint" || field.name.endsWith("Body") ? 5 : 3}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="bg-white"
        />
      );
    case "list":
      return (
        <ListField
          value={Array.isArray(value) ? value.map(String) : []}
          onChange={(next) => onChange(next)}
        />
      );
    case "items":
      return (
        <ItemsField
          field={field}
          items={Array.isArray(value) ? (value as Record<string, string>[]) : []}
          onChange={(next) => onChange(next)}
        />
      );
    default:
      return (
        <Input
          type="text"
          inputMode={field.type === "url" ? "url" : undefined}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white"
        />
      );
  }
}

/* ---------- main settings editor ---------- */

export function SettingsEditor() {
  const { toast } = useToast();
  const [groups, setGroups] = useState<GroupDef[]>(SETTING_GROUPS);
  const [values, setValues] = useState<ValuesByGroup>({});
  const [active, setActive] = useState<string>(SETTING_GROUPS[0]?.key ?? "general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as { groups: GroupDef[]; values: ValuesByGroup };
        if (cancelled) return;
        // merge stored values over defaults so every field has a starting value
        const merged: ValuesByGroup = {};
        for (const group of SETTING_GROUPS) {
          merged[group.key] = {
            ...(DEFAULT_SETTINGS[group.key as keyof typeof DEFAULT_SETTINGS] as Record<string, unknown>),
            ...(data.values[group.key] ?? {}),
          };
        }
        setGroups(data.groups ?? SETTING_GROUPS);
        setValues(merged);
      } catch {
        if (!cancelled) {
          const merged: ValuesByGroup = {};
          for (const group of SETTING_GROUPS) {
            merged[group.key] = {
              ...(DEFAULT_SETTINGS[group.key as keyof typeof DEFAULT_SETTINGS] as Record<string, unknown>),
            };
          }
          setValues(merged);
          toast({
            title: "Using default content",
            description: "Could not load saved settings, showing defaults.",
            variant: "destructive",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const activeGroup = useMemo(
    () => groups.find((g) => g.key === active) ?? groups[0],
    [groups, active]
  );

  const updateField = useCallback(
    (groupKey: string, fieldName: string, next: unknown) => {
      setValues((prev) => ({
        ...prev,
        [groupKey]: { ...(prev[groupKey] ?? {}), [fieldName]: next },
      }));
      setDirty((prev) => ({ ...prev, [groupKey]: true }));
    },
    []
  );

  const saveGroup = async (groupKey: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: groupKey, data: values[groupKey] ?? {} }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Save failed");
      setDirty((prev) => ({ ...prev, [groupKey]: false }));
      toast({ title: "Saved", description: "The website has been updated." });
    } catch (error) {
      toast({
        title: "Could not save",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="py-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-900">Text & settings</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Edit every word on the website: headings, paragraphs, contact details, statistics,
            store links and more. Changes go live immediately after saving.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Group navigation */}
        <nav className="lg:sticky lg:top-6 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {groups.map((group) => (
              <li key={group.key}>
                <button
                  type="button"
                  onClick={() => setActive(group.key)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                    active === group.key
                      ? "bg-brand-800 text-white"
                      : "bg-card text-brand-900 hover:bg-secondary"
                  )}
                >
                  {group.title}
                  {dirty[group.key] && (
                    <span
                      className="ml-2 size-2 shrink-0 rounded-full bg-gold-500"
                      title="Unsaved changes"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Active group editor */}
        {activeGroup && (
          <section key={activeGroup.key} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-900">
                  {activeGroup.title}
                </h2>
                {activeGroup.description && (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {activeGroup.description}
                  </p>
                )}
              </div>
              <Button
                onClick={() => saveGroup(activeGroup.key)}
                disabled={saving}
                className="rounded-full bg-brand-800 px-6 font-bold text-white hover:bg-brand-700"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Save changes
              </Button>
            </div>

            <div className="mt-8 space-y-7">
              {activeGroup.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label className="text-brand-900">{field.label}</Label>
                  <FieldEditor
                    field={field}
                    value={values[activeGroup.key]?.[field.name]}
                    onChange={(next) => updateField(activeGroup.key, field.name, next)}
                  />
                  {field.help && (
                    <p className="text-xs leading-relaxed text-muted-foreground">{field.help}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end border-t border-border pt-5">
              <Button
                onClick={() => saveGroup(activeGroup.key)}
                disabled={saving}
                className="rounded-full bg-brand-800 px-6 font-bold text-white hover:bg-brand-700"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Save changes
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
