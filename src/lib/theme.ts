/**
 * Theme utilities — pure colour maths shared by server (layout injection)
 * and client (admin live preview).
 */

export type ThemeConfig = {
  id: string;
  name: string;
  brand: string;
  gold: string;
  bg: string;
  isActive: boolean;
  isPreset: boolean;
};

export const DEFAULT_THEME = {
  id: "default",
  name: "Teal & Gold",
  brand: "#0e7c7b",
  gold: "#c9a227",
  bg: "#faf7f0",
  isActive: true,
  isPreset: true,
};

export const THEME_PRESETS: ThemeConfig[] = [
  { ...DEFAULT_THEME },
  {
    id: "emerald",
    name: "Emerald & Gold",
    brand: "#2e8362",
    gold: "#c9a227",
    bg: "#faf7f0",
    isActive: false,
    isPreset: true,
  },
  {
    id: "forest",
    name: "Forest & Copper",
    brand: "#35604a",
    gold: "#b45309",
    bg: "#f7f6f2",
    isActive: false,
    isPreset: true,
  },
  {
    id: "royal",
    name: "Royal Purple & Champagne",
    brand: "#5b3a8e",
    gold: "#c9a227",
    bg: "#faf7f2",
    isActive: false,
    isPreset: true,
  },
  {
    id: "crimson",
    name: "Crimson & Gold",
    brand: "#8e1f2f",
    gold: "#c9a227",
    bg: "#faf6f2",
    isActive: false,
    isPreset: true,
  },
];

/* ---------------- colour maths ---------------- */

export function hexToHsl(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  return [hue * 360, s, l];
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function hslToHex(hDeg: number, s: number, l: number): string {
  const h = ((hDeg % 360) + 360) % 360 / 360;
  const ss = clamp01(s);
  const ll = clamp01(l);
  if (ss === 0) {
    const v = Math.round(ll * 255);
    return `#${v.toString(16).padStart(2, "0").repeat(3)}`;
  }
  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  const conv = (tRaw: number) => {
    let t = tRaw;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const r = Math.round(conv(h + 1 / 3) * 255);
  const g = Math.round(conv(h) * 255);
  const b = Math.round(conv(h - 1 / 3) * 255);
  const hex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** Adjust lightness of a hex colour by delta (-1..1). */
export function tuneLightness(hex: string, delta: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, clamp01(l + delta));
}

/** Mix two hex colours. t=0 → a, t=1 → b. */
export function mixHex(a: string, b: string, t: number): string {
  const [ha, sa, la] = hexToHsl(a);
  const [hb, sb, lb] = hexToHsl(b);
  // mix in RGB space for predictable results
  const toRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = toRgb(a);
  const [r2, g2, b2] = toRgb(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  void ha; void sa; void la; void hb; void sb; void lb;
  const hex2 = (v: number) => Math.min(255, Math.max(0, v)).toString(16).padStart(2, "0");
  return `#${hex2(r)}${hex2(g)}${hex2(bl)}`;
}

const LIGHTNESS_STEPS: [string, number, number][] = [
  ["50", 0.955, 0.55],
  ["100", 0.915, 0.7],
  ["200", 0.84, 0.8],
  ["300", 0.74, 0.9],
  ["400", 0.64, 0.95],
  ["500", -1, 1], // -1 → keep base lightness
  ["600", 0.44, 1],
  ["700", 0.37, 1],
  ["800", 0.3, 1],
  ["900", 0.24, 1],
  ["950", 0.16, 1],
];

/** Build a Tailwind-style 50–950 scale from a base hex. */
export function scaleFromHex(base: string): Record<string, string> {
  const [h, s0, l0] = hexToHsl(base);
  const out: Record<string, string> = {};
  for (const [step, lTarget, sFactor] of LIGHTNESS_STEPS) {
    const l = lTarget === -1 ? l0 : lTarget;
    const s = clamp01(s0 * sFactor);
    out[step] = hslToHex(h, s, l);
  }
  return out;
}

export type CssVarMap = Record<string, string>;

/**
 * Build the full CSS variable overrides for a theme:
 * brand + gold scales and all shadcn semantic tokens.
 */
export function themeToCssVars(theme: { brand: string; gold: string; bg: string }): CssVarMap {
  const brand = scaleFromHex(theme.brand);
  const gold = scaleFromHex(theme.gold);
  const bg = theme.bg;
  const brandDark = brand["900"];

  const vars: CssVarMap = {};
  for (const [step, value] of Object.entries(brand)) {
    vars[`--color-brand-${step}`] = value;
  }
  for (const [step, value] of Object.entries(gold)) {
    vars[`--color-gold-${step}`] = value;
  }

  vars["--background"] = bg;
  vars["--foreground"] = tuneLightness(brandDark, -0.02);
  vars["--card"] = mixHex(bg, "#ffffff", 0.55);
  vars["--card-foreground"] = vars["--foreground"];
  vars["--popover"] = vars["--card"];
  vars["--popover-foreground"] = vars["--foreground"];
  vars["--primary"] = brand["800"];
  vars["--primary-foreground"] = mixHex(bg, "#ffffff", 0.5);
  vars["--secondary"] = mixHex(brand["100"], bg, 0.35);
  vars["--secondary-foreground"] = brand["900"];
  vars["--muted"] = mixHex(bg, "#ffffff", 0.28);
  vars["--muted-foreground"] = mixHex(brand["800"], "#8b8f7d", 0.45);
  vars["--accent"] = mixHex(gold["100"], bg, 0.45);
  vars["--accent-foreground"] = brand["900"];
  vars["--destructive"] = "#b3382c";
  vars["--border"] = mixHex(bg, brand["700"], 0.14);
  vars["--input"] = mixHex(bg, brand["700"], 0.2);
  vars["--ring"] = gold["500"];
  vars["--chart-1"] = brand["500"];
  vars["--chart-2"] = gold["500"];
  vars["--chart-3"] = brand["700"];
  vars["--chart-4"] = brand["300"];
  vars["--chart-5"] = gold["700"];
  vars["--sidebar"] = vars["--card"];
  vars["--sidebar-foreground"] = vars["--foreground"];
  vars["--sidebar-primary"] = brand["800"];
  vars["--sidebar-primary-foreground"] = vars["--primary-foreground"];
  vars["--sidebar-accent"] = vars["--accent"];
  vars["--sidebar-accent-foreground"] = vars["--accent-foreground"];
  vars["--sidebar-border"] = vars["--border"];
  vars["--sidebar-ring"] = gold["500"];
  return vars;
}

export function themeToStyleTag(theme: { brand: string; gold: string; bg: string }): string {
  const vars = themeToCssVars(theme);
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");
  return `:root{${body}}`;
}
