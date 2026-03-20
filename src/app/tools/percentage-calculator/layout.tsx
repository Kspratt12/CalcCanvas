import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator — Free Online Percent Calculator | CalcCanvas",
  description: "Calculate percentages instantly with three modes: find X% of a number, determine what percent one number is of another, or find the original value before a percentage was applied.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
