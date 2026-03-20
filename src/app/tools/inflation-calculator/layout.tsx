import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inflation Calculator — Purchasing Power Tool | CalcCanvas",
  description:
    "Calculate how inflation affects your money over time. See what past dollars are worth today and how future purchasing power changes with our free inflation calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
