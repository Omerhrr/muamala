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
      href="#home"
      className={cn("flex items-center gap-2.5 rounded-md", className)}
      aria-label="Muamala Micro-Finance Bank — back to top"
    >
      <Image
        src="/logo.svg"
        alt="Muamala Micro-Finance Bank Limited emblem"
        width={42}
        height={42}
        priority
        className="size-10 lg:size-[42px]"
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
