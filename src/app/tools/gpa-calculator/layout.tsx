import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator — Free College GPA Tool | CalcCanvas",
  description:
    "Calculate your weighted college GPA on a 4.0 scale. Add multiple courses with letter grades and credit hours to get your cumulative GPA instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
