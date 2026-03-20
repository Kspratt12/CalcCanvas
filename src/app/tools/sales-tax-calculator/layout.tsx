import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tax Calculator — Free Tax Rate Tool | CalcCanvas",
  description:
    "Calculate sales tax amount and total price instantly. Quick-select buttons for common US state tax rates. Enter any price and tax rate to get results.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
