import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/content";

/** Floating WhatsApp support bubble (hidden when no number is configured). */
export function FloatingWhatsApp({ whatsapp }: { whatsapp: string }) {
  if (!whatsapp) return null;
  return (
    <a
      href={waLink(whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center rounded-full bg-brand-700 text-white shadow-xl shadow-brand-900/30 transition-all hover:-translate-y-0.5 hover:bg-brand-800 md:bottom-7 md:right-7"
      style={{ width: 52, height: 52 }}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
