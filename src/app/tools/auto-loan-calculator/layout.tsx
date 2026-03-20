import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator — Free Car Payment Estimator | CalcCanvas",
  description:
    "Calculate your monthly car payment, total interest, and overall financing cost. Compare loan terms from 24 to 84 months for any vehicle purchase.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
