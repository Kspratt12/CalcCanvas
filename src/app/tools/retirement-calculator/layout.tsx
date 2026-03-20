import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator — Free Savings & Income Estimator | CalcCanvas",
  description:
    "Estimate your retirement savings and projected monthly income using the 4% rule. Enter your age, savings, contributions, and expected returns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
