import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hex to RGB Color Converter — Free Online Tool | CalcCanvas",
  description: "Convert colors between hex, RGB, and HSL formats instantly. Pick a color or type values manually. Perfect for web developers and designers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
