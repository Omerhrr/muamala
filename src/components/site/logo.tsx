import { cn } from "@/lib/utils";
import type { BrandSettings } from "@/lib/site-settings";

type LogoProps = {
  brand: BrandSettings;
  variant?: "dark" | "light";
  className?: string;
  /** hide the image (used where the mark is shown separately) */
  hideMark?: boolean;
};

/**
 * Site logo, fully driven by the Logo & branding settings in the admin.
 * Uses a plain <img> so uploaded data-URLs, SVGs and remote URLs all work.
 */
export function Logo({ brand, variant = "dark", className, hideMark }: LogoProps) {
  const isLight = variant === "light";
  const mode = brand.logoMode ?? "image-text";
  const height = Math.min(72, Math.max(24, Number(brand.logoHeight) || 40));
  const showImage = !hideMark && mode !== "text-only" && !!brand.logoMark;
  const showText = mode !== "image-only" && (!!brand.wordmark || !!brand.wordmarkSub);
  const label = brand.wordmark ? `${brand.wordmark} ${brand.wordmarkSub ?? ""}`.trim() : brand.logoAlt;

  return (
    <a
      href="/"
      className={cn(
        "flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400",
        className
      )}
      aria-label={`${label}, home`}
    >
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoMark}
          alt={showText ? "" : brand.logoAlt}
          style={{ height, maxHeight: height, ["--logo-h" as string]: `${height}px` }}
          className={cn(
            "logo-img w-auto shrink-0 object-contain",
            mode === "image-only" ? "max-w-[180px] sm:max-w-[260px]" : "max-w-[72px] sm:max-w-[120px]"
          )}
        />
      )}
      {showText && (
        <span className="flex min-w-0 flex-col leading-none">
          {brand.wordmark && (
            <span
              className={cn(
                "truncate font-serif text-xl font-bold tracking-tight",
                isLight ? "text-white" : "text-brand-900"
              )}
            >
              {brand.wordmark}
            </span>
          )}
          {brand.wordmarkSub && (
            <span
              className={cn(
                "mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.22em]",
                isLight ? "text-gold-300" : "text-gold-600"
              )}
            >
              {brand.wordmarkSub}
            </span>
          )}
        </span>
      )}
    </a>
  );
}

/** The mark on a white chip, used on dark surfaces. */
export function LogoMarkChip({ brand, className }: { brand: BrandSettings; className?: string }) {
  if (!brand.logoMark || brand.logoMode === "text-only") return null;
  return (
    <span
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm",
        brand.logoMode === "image-only" ? "h-14 px-3" : "w-12",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.logoMark} alt={brand.logoAlt} className="max-h-full max-w-full object-contain" />
    </span>
  );
}
