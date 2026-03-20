import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paycheck Calculator — Free Take-Home Pay Estimator | CalcCanvas",
  description:
    "Estimate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions. Free paycheck calculator with 2024 tax brackets.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
