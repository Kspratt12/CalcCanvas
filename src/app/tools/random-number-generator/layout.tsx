import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator — Free Online RNG Tool | CalcCanvas",
  description: "Generate random numbers within any range with customizable quantity and duplicate control. Perfect for raffles, games, sampling, and educational exercises.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
