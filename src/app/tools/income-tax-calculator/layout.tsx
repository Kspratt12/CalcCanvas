import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator — 2024 Federal Tax | CalcCanvas",
  description:
    "Estimate your 2024 federal income tax using official tax brackets. See total tax, effective rate, marginal rate, and take-home pay for any filing status.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
