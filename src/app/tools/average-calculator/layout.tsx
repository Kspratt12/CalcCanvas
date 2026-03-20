import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Average Calculator — Find Mean, Median & Mode Online | CalcCanvas",
  description: "Calculate the mean, median, mode, range, sum, and count of any number set. Enter values individually or paste a list for instant statistical results.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
