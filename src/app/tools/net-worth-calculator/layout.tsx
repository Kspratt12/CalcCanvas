import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Net Worth Calculator — Free Financial Health Tracker | CalcCanvas",
  description:
    "Calculate your net worth by listing assets and liabilities. Add or remove items dynamically to get a clear snapshot of your financial health.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
