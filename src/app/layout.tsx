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
    const general = (await getSiteSettings()).general;
    return {
      title: `${general.bankName} | Community Banking in Niger State`,
      description: `${general.bankName} (${general.rcNumber}) is a Central Bank of Nigeria licensed microfinance bank providing savings, loans, payments and agent banking to individuals and small businesses in Suleja, Niger State and beyond.`,
      keywords: [
        "Muamala Micro-Finance Bank",
        "microfinance bank Nigeria",
        "Suleja",
        "Niger State",
        "savings",
        "loans",
        "agent banking",
        "CBN licensed",
      ],
      authors: [{ name: general.bankName }],
      openGraph: {
        title: general.bankName,
        description: general.tagline,
        siteName: general.bankName,
        type: "website",
      },
    };
  } catch {
    return {
      title: "Muamala Micro-Finance Bank Limited",
      description: "Community banking that grows with you.",
    };
  }
}

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
