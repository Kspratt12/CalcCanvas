import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Deviation Calculator — Free Online Statistics Tool | CalcCanvas",
  description: "Calculate population and sample standard deviation, variance, and mean for any data set. Paste your numbers and get instant statistical analysis with this free tool.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
