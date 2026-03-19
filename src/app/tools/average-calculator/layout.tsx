import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Average Calculator — Mean, Median, Mode, Range | CalcCanvas",
  description:
    "Calculate the mean, median, mode, range, sum, and count of a set of numbers. Paste a list or add numbers dynamically. Free online average calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
