"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Loader2,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Reveal } from "@/components/site/reveal";
import { waLink } from "@/lib/wa";
import type { ApplySettings, GeneralSettings } from "@/lib/site-settings";
import type { LoanProductRecord } from "@/lib/content";
import type { UiSettings } from "@/lib/site-settings";

type Props = {
  settings: ApplySettings;
  general: GeneralSettings;
  loans: LoanProductRecord[];
  ui: UiSettings;
};

const STEP_ICONS = [Wallet, BadgeCheck, ShieldCheck];


type SuccessState = { title: string; message: string } | null;

function SuccessCard({
  title,
  message,
  whatsapp,
  onReset,
  ui,
}: {
  title: string;
  message: string;
  whatsapp: string;
  onReset: () => void;
  ui: UiSettings;
}) {
  return (
    <div className="rounded-3xl border border-gold-300/70 bg-gold-50 p-8 text-center sm:p-10">
      <CheckCircle2 className="mx-auto size-12 text-brand-600" aria-hidden="true" />
      <h3 className="mt-4 font-serif text-2xl font-bold text-brand-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/80">{message}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {whatsapp && (
          <a
            href={waLink(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
          >
            {ui.apSuccessWa}
          </a>
        )}
        <Button variant="outline" onClick={onReset} className="rounded-full px-5">
          {ui.apSuccessAgain}
        </Button>
      </div>
    </div>
  );
}

export function ApplyForms({ settings, general, loans, ui }: Props) {
  const { toast } = useToast();
  const ACCOUNT_TYPES = [
    { value: "individual", label: ui.apTypeIndividual },
    { value: "group", label: ui.apTypeGroup },
    { value: "business", label: ui.apTypeBusiness },
  ];
  const [success, setSuccess] = useState<SuccessState>(null);

  /* ---------- account form ---------- */
  const [acc, setAcc] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "individual",
    bvn: "",
    note: "",
  });
  const [accBusy, setAccBusy] = useState(false);

  const submitAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccBusy(true);
    try {
      const res = await fetch("/api/apply/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(acc),
      });
      const data = (await res.json()) as { success: boolean; message?: string; error?: string };
      if (data.success) {
        setSuccess({
          title: ui.apAccSuccessTitle,
          message:
            data.message ??
            ui.apAccSuccessMsg,
        });
      } else {
        toast({
          title: ui.apErrTitle,
          description: data.error ?? ui.apErrBody,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: ui.apNetTitle,
        description: ui.apNetBody,
        variant: "destructive",
      });
    } finally {
      setAccBusy(false);
    }
  };

  /* ---------- loan form ---------- */
  const [loan, setLoan] = useState({
    name: "",
    phone: "",
    product: loans[0]?.name ?? "",
    amount: "",
    term: "6",
    purpose: "",
  });
  const [loanBusy, setLoanBusy] = useState(false);

  const selectedLoan = loans.find((l) => l.name === loan.product);

  const submitLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoanBusy(true);
    try {
      const res = await fetch("/api/apply/loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: loan.name,
          phone: loan.phone,
          product: loan.product,
          amount: Number(loan.amount),
          term: Number(loan.term),
          purpose: loan.purpose,
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string; error?: string };
      if (data.success) {
        setSuccess({
          title: ui.apLoanSuccessTitle,
          message:
            data.message ??
            ui.apLoanSuccessMsg,
        });
      } else {
        toast({
          title: ui.apErrTitle,
          description: data.error ?? ui.apErrBody,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: ui.apNetTitle,
        description: ui.apNetBody,
        variant: "destructive",
      });
    } finally {
      setLoanBusy(false);
    }
  };

  const inputCls = "bg-white";
  const labelCls = "text-brand-900";

  if (success) {
    return (
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SuccessCard
            title={success.title}
            message={success.message}
            whatsapp={general.whatsapp}
            onReset={() => setSuccess(null)}
            ui={ui}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ---------- Account opening ---------- */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-800">
                  <PiggyBank className="size-5 text-gold-300" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold text-brand-900">
                    {ui.apAccTitle}
                  </h2>
                  <p className="text-xs text-muted-foreground">{ui.apAccSub}</p>
                </div>
              </div>

              <form onSubmit={submitAccount} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-name" className={labelCls}>
                      {ui.apName}
                    </Label>
                    <Input
                      id="acc-name"
                      required
                      value={acc.name}
                      onChange={(e) => setAcc({ ...acc, name: e.target.value })}
                      placeholder={ui.apNamePh}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-phone" className={labelCls}>
                      {ui.apPhone}
                    </Label>
                    <Input
                      id="acc-phone"
                      required
                      type="tel"
                      value={acc.phone}
                      onChange={(e) => setAcc({ ...acc, phone: e.target.value })}
                      placeholder={ui.apPhonePh}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-email" className={labelCls}>
                      {ui.apEmail}
                    </Label>
                    <Input
                      id="acc-email"
                      type="email"
                      value={acc.email}
                      onChange={(e) => setAcc({ ...acc, email: e.target.value })}
                      placeholder={ui.apEmailPh}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="acc-type" className={labelCls}>
                      {ui.apType}
                    </Label>
                    <Select
                      value={acc.type}
                      onValueChange={(value) => setAcc({ ...acc, type: value })}
                    >
                      <SelectTrigger id="acc-type" className={inputCls}>
                        <SelectValue placeholder={ui.apTypePh} />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCOUNT_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="acc-address" className={labelCls}>
                    {ui.apAddress}
                  </Label>
                  <Input
                    id="acc-address"
                    value={acc.address}
                    onChange={(e) => setAcc({ ...acc, address: e.target.value })}
                    placeholder={ui.apAddressPh}
                    className={inputCls}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="acc-bvn" className={labelCls}>
                    {ui.apBvn}
                  </Label>
                  <Input
                    id="acc-bvn"
                    inputMode="numeric"
                    maxLength={11}
                    value={acc.bvn}
                    onChange={(e) => setAcc({ ...acc, bvn: e.target.value.replace(/[^0-9]/g, "") })}
                    placeholder={ui.apBvnPh}
                    className={inputCls}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="acc-note" className={labelCls}>
                    {ui.apNote}
                  </Label>
                  <Textarea
                    id="acc-note"
                    rows={3}
                    value={acc.note}
                    onChange={(e) => setAcc({ ...acc, note: e.target.value })}
                    placeholder={ui.apNotePh}
                    className={inputCls}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={accBusy}
                  className="w-full rounded-full bg-brand-800 py-6 text-sm font-bold text-white hover:bg-brand-700"
                >
                  {accBusy ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      {ui.apSubmitting}
                    </>
                  ) : (
                    ui.apAccSubmit
                  )}
                </Button>
                <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                  {settings.accountNote}
                </p>
              </form>
            </div>
          </Reveal>

          {/* ---------- Loan application ---------- */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gold-500">
                  <Banknote className="size-5 text-brand-950" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold text-brand-900">{ui.apLoanTitle}</h2>
                  <p className="text-xs text-muted-foreground">
                    {ui.apLoanSub}
                  </p>
                </div>
              </div>

              <form onSubmit={submitLoan} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="loan-name" className={labelCls}>
                      {ui.apName}
                    </Label>
                    <Input
                      id="loan-name"
                      required
                      value={loan.name}
                      onChange={(e) => setLoan({ ...loan, name: e.target.value })}
                      placeholder={ui.apLoanNamePh}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="loan-phone" className={labelCls}>
                      {ui.apPhone}
                    </Label>
                    <Input
                      id="loan-phone"
                      required
                      type="tel"
                      value={loan.phone}
                      onChange={(e) => setLoan({ ...loan, phone: e.target.value })}
                      placeholder={ui.apPhonePh}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="loan-product" className={labelCls}>
                    {ui.apLoanProduct}
                  </Label>
                  <Select
                    value={loan.product}
                    onValueChange={(value) => setLoan({ ...loan, product: value })}
                  >
                    <SelectTrigger id="loan-product" className={inputCls}>
                      <SelectValue placeholder={ui.apLoanProductPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {loans.map((l) => (
                        <SelectItem key={l.id} value={l.name}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedLoan && (
                    <p className="text-xs text-muted-foreground">
                      {selectedLoan.desc} · from ₦
                      {selectedLoan.minAmount.toLocaleString("en-NG")} · up to{" "}
                      {selectedLoan.maxTerm} months
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="loan-amount" className={labelCls}>
                      {ui.apAmount}
                    </Label>
                    <Input
                      id="loan-amount"
                      required
                      inputMode="numeric"
                      value={loan.amount}
                      onChange={(e) =>
                        setLoan({ ...loan, amount: e.target.value.replace(/[^0-9]/g, "") })
                      }
                      placeholder="e.g. 250000"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="loan-term" className={labelCls}>
                      {ui.apTerm}
                    </Label>
                    <Select
                      value={loan.term}
                      onValueChange={(value) => setLoan({ ...loan, term: value })}
                    >
                      <SelectTrigger id="loan-term" className={inputCls}>
                        <SelectValue placeholder={ui.apTermPh} />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 6, 9, 12, 18, 24].map((m) => (
                          <SelectItem key={m} value={String(m)}>
                            {m} {ui.apMonths}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="loan-purpose" className={labelCls}>
                    {ui.apPurpose}
                  </Label>
                  <Textarea
                    id="loan-purpose"
                    rows={3}
                    value={loan.purpose}
                    onChange={(e) => setLoan({ ...loan, purpose: e.target.value })}
                    placeholder={ui.apPurposePh}
                    className={inputCls}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loanBusy}
                  className="w-full rounded-full bg-gold-500 py-6 text-sm font-bold text-brand-950 hover:bg-gold-400"
                >
                  {loanBusy ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      {ui.apSubmitting}
                    </>
                  ) : (
                    ui.apLoanSubmit
                  )}
                </Button>
                <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                  {settings.loanNote}
                </p>
              </form>
            </div>
          </Reveal>
        </div>

        {/* How it works (editable in admin: Text & settings, Apply page) */}
        <Reveal className="mt-12">
          <div className="grid gap-4 rounded-3xl bg-brand-950 p-8 text-brand-100 sm:grid-cols-3 sm:p-10">
            {(settings.steps ?? []).map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              return (
                <div key={`${step.title}-${index}`} className="flex gap-4">
                  <Icon className="size-6 shrink-0 text-gold-400" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-brand-200">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
