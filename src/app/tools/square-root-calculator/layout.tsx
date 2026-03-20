import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Square Root Calculator — Free Online Root & Exponent Tool | CalcCanvas",
  description: "Calculate square roots, cube roots, and nth roots of any number instantly. Also shows perfect square detection and squared values. Free and easy to use.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
