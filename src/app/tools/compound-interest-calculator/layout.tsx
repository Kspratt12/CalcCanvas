import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Free Investment Growth Tool | CalcCanvas",
  description:
    "See how your investments grow with compound interest and monthly contributions. Calculate future value, total interest earned, and year-by-year breakdown.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
