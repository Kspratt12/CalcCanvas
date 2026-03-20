import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Calculator — Future Value Tool | CalcCanvas",
  description:
    "Calculate the future value of your investments with monthly contributions. See total invested vs. total returns and plan your financial growth over time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
