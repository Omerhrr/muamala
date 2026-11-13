"use client";

import { useState } from "react";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Reveal } from "@/components/site/reveal";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Head Office",
    lines: ["Plot 14, Bosso Road, by Tungan Gari Market,", "Minna, Niger State, Nigeria"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["0803 123 4567", "0805 765 4321"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@muamalamfb.com.ng", "support@muamalamfb.com.ng"],
  },
  {
    icon: Clock,
    title: "Opening hours",
    lines: ["Mon – Fri: 8:00am – 4:00pm", "Sat: 9:00am – 1:00pm"],
  },
];

const SUBJECTS = [
  "General enquiry",
  "Open an account",
  "Loan application",
  "Agent partnership",
  "Complaints & feedback",
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof EMPTY_FORM) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Message sent",
          description:
            data.message ?? "Thank you for reaching out. Our team will contact you shortly.",
        });
        setForm(EMPTY_FORM);
      } else {
        toast({
          title: "Could not send message",
          description: data.error ?? "Please check your details and try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            Get in touch
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Talk to us today
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Opening an account, applying for a loan, becoming an agent or just asking a question —
            we usually respond within one business day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Info cards */}
          <div className="space-y-4">
            {CONTACT_INFO.map(({ icon: Icon, title, lines }, index) => (
              <Reveal key={title} delay={index * 0.07}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-800">
                    <Icon className="size-5 text-gold-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-900">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="rounded-2xl bg-brand-950 p-6">
                <p className="font-serif text-lg font-bold text-white">
                  Prefer to walk into a branch?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-200">
                  Walk into our Minna head office or call any of our agents around you — bring your
                  BVN and valid ID and we&rsquo;ll have you banking in minutes.
                </p>
                <a
                  href="tel:+2348031234567"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-brand-950 transition-colors hover:bg-gold-400"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  0803 123 4567
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name")(e.target.value)}
                    placeholder="e.g. Aisha Mohammed"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone")(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    required
                    minLength={7}
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email")(e.target.value)}
                    placeholder="you@example.com"
                    maxLength={120}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={form.subject} onValueChange={update("subject")} required>
                    <SelectTrigger id="subject" className="w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    placeholder="Tell us how we can help…"
                    required
                    minLength={5}
                    maxLength={2000}
                    rows={5}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-xs text-[11px] leading-relaxed text-muted-foreground">
                  By submitting, you consent to Muamala MFB contacting you about this enquiry. We
                  never share your details with third parties.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 min-w-44 gap-2 rounded-full bg-brand-800 text-sm font-bold text-white shadow-lg hover:bg-brand-900"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="size-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
