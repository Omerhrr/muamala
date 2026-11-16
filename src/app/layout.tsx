import type { Metadata } from "next";
import { Manrope, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getActiveTheme, getSiteSettings } from "@/lib/content";
import { themeToStyleTag } from "@/lib/theme";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { brand, general } = await getSiteSettings();
    const title = brand.siteTitle || general.bankName;
    return {
      title: { default: title, template: `%s | ${general.shortName || general.bankName}` },
      description: brand.siteDescription,
      keywords: brand.keywords,
      authors: [{ name: general.bankName }],
      icons: { icon: "/api/favicon" },
      openGraph: {
        title,
        description: brand.siteDescription || general.tagline,
        siteName: general.bankName,
        type: "website",
        ...(brand.ogImage ? { images: [{ url: "/api/og-image" }] } : {}),
      },
      twitter: { card: brand.ogImage ? "summary_large_image" : "summary", title, description: brand.siteDescription },
    };
  } catch {
    return {
      title: "Muamala Micro-Finance Bank Limited",
      description: "Community banking that grows with you.",
    };
  }
}

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#06231c" };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getActiveTheme();
  const themeStyle = themeToStyleTag(theme);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
