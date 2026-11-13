/** Client-safe helper: wa.me link from a display phone number. */
export function waLink(whatsapp: string): string {
  const digits = whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}
