import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Scientific Calculator — Trig, Log & More | CalcCanvas",
  description:
    "Full-featured scientific calculator with trigonometry, logarithms, exponents, factorials, memory functions, and calculation history. Free online tool.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
