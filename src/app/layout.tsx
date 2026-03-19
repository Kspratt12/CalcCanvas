import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlacement from "@/components/AdPlacement";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calccanvas.com"),
  title: "CalcCanvas — Free Online Calculators & Tools",
  description:
    "Free online calculators and tools for finance, health, math, text, and development. Fast, accurate, and easy to use — no sign-up required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <AdPlacement slot="header-leaderboard" format="leaderboard" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
