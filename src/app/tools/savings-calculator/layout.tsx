import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Calculator — Free Savings Growth Estimator | CalcCanvas",
  description:
    "Estimate how your savings will grow over time with regular deposits and compound interest. See total savings, interest earned, and a year-by-year breakdown.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
