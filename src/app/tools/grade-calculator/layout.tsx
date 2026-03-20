import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grade Calculator — Weighted Grade Tool | CalcCanvas",
  description:
    "Calculate your weighted course grade and letter grade. Add assignments with scores, total points, and weights. Find what you need on your final exam.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
