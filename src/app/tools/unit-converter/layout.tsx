import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter — Length, Weight, Temperature & More | CalcCanvas",
  description: "Convert between units of length, weight, temperature, volume, speed, and area. Supports metric, imperial, and US customary units with precise results.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
