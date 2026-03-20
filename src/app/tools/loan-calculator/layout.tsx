import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator — Free Monthly Payment Estimator | CalcCanvas",
  description:
    "Calculate your monthly loan payment, total interest, and amortization schedule for any loan. Enter amount, rate, and term to plan your finances.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
