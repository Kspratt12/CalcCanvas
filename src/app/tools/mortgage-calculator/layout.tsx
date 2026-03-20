import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Free Online Monthly Payment Estimator | CalcCanvas",
  description:
    "Calculate your monthly mortgage payment, total interest, and loan cost. Enter home price, down payment, rate, and term to plan your home purchase.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
