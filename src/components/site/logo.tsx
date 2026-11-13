import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <a
      href="/"
      className={cn("flex items-center gap-2.5 rounded-md", className)}
      aria-label="Muamala Micro-Finance Bank, back to home"
    >
      <Image
        src="/logo-mark.png"
        alt="Muamala Micro-Finance Bank Limited emblem"
        width={40}
        height={40}
        priority
        className="size-9 lg:size-10"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-xl font-bold tracking-tight",
            isLight ? "text-white" : "text-brand-900"
          )}
        >
          Muamala
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
            isLight ? "text-gold-300" : "text-gold-600"
          )}
        >
          Micro-Finance Bank
        </span>
      </span>
    </a>
  );
}

/** The mark wrapped in a white chip, used on dark surfaces like the footer. */
export function LogoMarkChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-xl bg-white shadow-sm",
        className
      )}
    >
      <Image
        src="/logo-mark.png"
        alt="Muamala Micro-Finance Bank emblem"
        width={40}
        height={40}
        className="size-10"
      />
    </span>
  );
}
