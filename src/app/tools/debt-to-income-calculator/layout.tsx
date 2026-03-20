import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt to Income Ratio Calculator — Free DTI Calculator | CalcCanvas",
  description:
    "Calculate your debt to income ratio instantly. See your front-end and back-end DTI, check if you qualify for conventional or FHA loans, and get tips to improve your ratio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
