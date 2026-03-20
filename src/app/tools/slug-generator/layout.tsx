import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slug Generator — Free URL Slug Creator Tool | CalcCanvas",
  description:
    "Convert any text into a clean, SEO-friendly URL slug instantly. Supports hyphens and underscores. Free online slug generator for blogs and websites.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
