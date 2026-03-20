import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pace Calculator — Free Running Pace & Race Time Calculator | CalcCanvas",
  description: "Calculate your running pace, finish time, or distance. Get estimated race times for 5K, 10K, half marathon, and marathon. Supports miles and kilometers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
