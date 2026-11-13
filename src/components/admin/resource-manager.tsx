"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RESOURCES, type ResourceDef, type ResourceField } from "@/lib/admin-resources";
import { ICON_NAMES, getIcon } from "@/lib/icons";

type Row = Record<string, unknown> & { id: string };

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFmt = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function labelFor(def: ResourceDef, column: string): string {
  const field = def.fields.find((f) => f.name === column);
  if (field) return field.label;
  return column.charAt(0).toUpperCase() + column.slice(1);
}

function displayValue(column: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (column === "amount") return naira.format(Number(value));
  if (column === "createdAt" || column === "date") {
    const d = new Date(String(value));
    return Number.isNaN(d.getTime()) ? "—" : dateFmt.format(d);
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  const s = String(value);
  return s.length > 80 ? `${s.slice(0, 80)}…` : s;
}

/* ---------- form field editor ---------- */

function FormField({
  field,
  value,
  onChange,
}: {
  field: ResourceField;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          rows={field.name === "body" ? 10 : 3}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          value={value === null || value === undefined ? "" : String(value)}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="bg-white"
        />
      );
    case "boolean":
      return (
        <div className="flex items-center gap-3 pt-1">
          <Switch checked={Boolean(value)} onCheckedChange={(v) => onChange(v)} />
          <span className="text-sm text-muted-foreground">
            {value ? "Shown on the website" : "Hidden from the website"}
          </span>
        </div>
      );
    case "select":
      return (
        <Select value={String(value ?? "")} onValueChange={(v) => onChange(v)}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder={`Choose ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "icon": {
      const Icon = getIcon(String(value ?? ""));
      return (
        <div className="flex items-center gap-3">
          <Select value={String(value ?? "PiggyBank")} onValueChange={(v) => onChange(v)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {ICON_NAMES.map((name) => {
                const OptIcon = getIcon(name);
                return (
                  <SelectItem key={name} value={name}>
                    <span className="flex items-center gap-2">
                      <OptIcon className="size-4" aria-hidden="true" />
                      {name}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Icon className="size-5 text-brand-800" aria-hidden="true" />
          </span>
        </div>
      );
    }
    case "list":
      return (
        <Textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"One entry per line\ne.g. Free mobile banking\nInstant cards"}
          className="bg-white"
        />
      );
    case "date":
      return (
        <Input
          type="date"
          value={String(value ?? "").slice(0, 10)}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white"
        />
      );
    default:
      return (
        <Input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="bg-white"
        />
      );
  }
}

/* ---------- main resource manager ---------- */

export function ResourceManager({ resourceKey }: { resourceKey: string }) {
  const def = RESOURCES[resourceKey];
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/resource/${resourceKey}`);
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = (await res.json()) as { rows?: Row[] };
      setRows(data.rows ?? []);
    } catch {
      toast({
        title: "Could not load records",
        description: "Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [resourceKey, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const rowToForm = (row: Row): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    for (const field of def.fields) {
      const raw = row[field.name];
      if (field.type === "list") {
        let arr: unknown[] = [];
        try {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          arr = Array.isArray(parsed) ? parsed : [];
        } catch {
          arr = [];
        }
        out[field.name] = arr.join("\n");
      } else if (field.type === "date") {
        const d = raw ? new Date(String(raw)) : new Date();
        out[field.name] = Number.isNaN(d.getTime())
          ? new Date().toISOString().slice(0, 10)
          : d.toISOString().slice(0, 10);
      } else if (field.type === "boolean") {
        out[field.name] = Boolean(raw);
      } else if (field.type === "number") {
        out[field.name] = typeof raw === "number" ? raw : Number(raw ?? 0);
      } else {
        out[field.name] = raw === null || raw === undefined ? "" : String(raw);
      }
    }
    return out;
  };

  const blankForm = (): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    for (const field of def.fields) {
      if (field.type === "boolean") out[field.name] = true;
      else if (field.type === "number") out[field.name] = 0;
      else if (field.type === "date") out[field.name] = new Date().toISOString().slice(0, 10);
      else if (field.type === "list") out[field.name] = "";
      else if (field.type === "icon") out[field.name] = "PiggyBank";
      else if (field.type === "select") out[field.name] = field.options?.[0]?.value ?? "";
      else out[field.name] = "";
    }
    return out;
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(blankForm());
    setDialogOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditingId(row.id);
    setForm(rowToForm(row));
    setDialogOpen(true);
  };

  const buildPayload = () => {
    const payload: Record<string, unknown> = {};
    for (const field of def.fields) {
      const raw = form[field.name];
      if (field.type === "list") {
        payload[field.name] = String(raw ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
      } else if (field.type === "number") {
        payload[field.name] = Number(raw ?? 0);
      } else if (field.type === "boolean") {
        payload[field.name] = Boolean(raw);
      } else {
        payload[field.name] = raw ?? "";
      }
    }
    return payload;
  };

  const save = async () => {
    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/resource/${resourceKey}/${editingId}`
        : `/api/admin/resource/${resourceKey}`;
      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = (await res.json()) as { success?: boolean; row?: Row; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Save failed");
      toast({
        title: editingId ? "Changes saved" : "Record created",
        description: "The website has been updated.",
      });
      setDialogOpen(false);
      await load();
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

  const remove = async (row: Row) => {
    const title = String(row.title ?? row.name ?? row.question ?? "this record");
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/resource/${resourceKey}/${row.id}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Delete failed");
      toast({ title: "Deleted" });
      await load();
    } catch (error) {
      toast({
        title: "Could not delete",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const quickToggle = useMemo(() => def.fields.some((f) => f.name === "visible"), [def]);

  const toggleVisible = async (row: Row) => {
    try {
      const res = await fetch(`/api/admin/resource/${resourceKey}/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !row.visible }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Update failed");
      await load();
    } catch (error) {
      toast({
        title: "Could not update",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!def) {
    return (
      <div className="py-6">
        <h1 className="font-serif text-2xl font-bold text-brand-900">Unknown collection</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested content type does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-900">{def.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {editingId ? "Edit an entry below." : `${rows.length} ${rows.length === 1 ? "entry" : "entries"} — changes go live immediately.`}
          </p>
        </div>
        {def.canCreate && (
          <Button
            onClick={openCreate}
            className="rounded-full bg-brand-800 px-5 font-bold text-white hover:bg-brand-700"
          >
            <Plus className="size-4" />
            New {def.singular.toLowerCase()}
          </Button>
        )}
      </header>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" aria-hidden="true" />
          </div>
        ) : rows.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-semibold text-brand-900">No {def.title.toLowerCase()} yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {def.canCreate
                ? `Click "New ${def.singular.toLowerCase()}" to add the first one.`
                : "Customer submissions will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left">
                  {def.listColumns.map((col) => (
                    <th
                      key={col}
                      className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {labelFor(def, col)}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-secondary/50">
                    {def.listColumns.map((col) => {
                      const value = row[col];
                      if (col === "visible" && typeof value === "boolean") {
                        return (
                          <td key={col} className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => toggleVisible(row)}
                              aria-label={value ? "Hide from website" : "Show on website"}
                              className={cn(
                                "rounded-full px-3 py-1 text-[11px] font-bold transition-colors",
                                value
                                  ? "bg-brand-100 text-brand-800 hover:bg-brand-200"
                                  : "bg-muted text-muted-foreground hover:bg-secondary"
                              )}
                            >
                              {value ? "Visible" : "Hidden"}
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={col}
                          className="max-w-[280px] truncate px-4 py-3 text-foreground/90"
                        >
                          {displayValue(col, value)}
                        </td>
                      );
                    })}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(row)}
                        className="h-8 gap-1.5 px-2.5 text-brand-800 hover:text-brand-900"
                      >
                        <Pencil className="size-3.5" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(row)}
                        className="h-8 gap-1.5 px-2.5 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {quickToggle && (
        <p className="mt-3 text-xs text-muted-foreground">
          Tip: click the Visible/Hidden pill to quickly show or hide an entry on the website.
        </p>
      )}

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-brand-900">
              {editingId ? `Edit ${def.singular.toLowerCase()}` : `New ${def.singular.toLowerCase()}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pb-2">
            {def.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label className="text-brand-900">
                  {field.label}
                  {field.required && <span className="text-destructive"> *</span>}
                </Label>
                <FormField
                  field={field}
                  value={form[field.name]}
                  onChange={(next) => setForm((prev) => ({ ...prev, [field.name]: next }))}
                />
                {field.help && (
                  <p className="text-xs leading-relaxed text-muted-foreground">{field.help}</p>
                )}
              </div>
            ))}
            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
                className="rounded-full px-5"
              >
                Cancel
              </Button>
              <Button
                onClick={save}
                disabled={saving}
                className="rounded-full bg-brand-800 px-6 font-bold text-white hover:bg-brand-700"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {editingId ? "Save changes" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
