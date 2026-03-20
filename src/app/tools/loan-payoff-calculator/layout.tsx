import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Payoff Calculator — Free Debt Payoff Estimator | CalcCanvas",
  description:
    "Find out when your loan will be paid off and how much interest you will pay. See how extra payments save you time and money on any loan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
