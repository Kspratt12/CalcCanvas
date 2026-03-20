import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fraction Calculator — Add, Subtract, Multiply & Divide Fractions | CalcCanvas",
  description: "Free online fraction calculator with step-by-step solutions. Add, subtract, multiply, or divide fractions and get simplified results with detailed work shown.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
