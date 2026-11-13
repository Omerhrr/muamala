import type { Metadata } from "next";
import { Manrope, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Muamala Micro-Finance Bank Limited | Community Banking in Niger State",
  description:
    "Muamala Micro-Finance Bank Limited (RC 7179149) is a Central Bank of Nigeria licensed microfinance bank providing savings, loans, payments and agent banking to individuals and small businesses in Niger State and beyond.",
  keywords: [
    "Muamala Micro-Finance Bank",
    "microfinance bank Nigeria",
    "Minna",
    "Niger State",
    "savings",
    "loans",
    "agent banking",
    "CBN licensed",
  ],
  authors: [{ name: "Muamala Micro-Finance Bank Limited" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Muamala Micro-Finance Bank Limited",
    description:
      "Community banking that grows with you — savings, loans, cards & payments and agent banking. Licensed by the Central Bank of Nigeria.",
    siteName: "Muamala Micro-Finance Bank Limited",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
