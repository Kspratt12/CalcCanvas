import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CD Calculator — Free Certificate of Deposit Calculator | CalcCanvas",
  description:
    "Calculate CD interest and maturity value instantly. Enter your deposit amount, APY, term length, and compounding frequency to see exactly how much your certificate of deposit will earn.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
