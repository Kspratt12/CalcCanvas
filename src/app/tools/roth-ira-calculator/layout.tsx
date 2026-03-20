import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roth IRA Calculator — Free Tax-Free Retirement Estimator | CalcCanvas",
  description:
    "Estimate your Roth IRA growth with tax-free compounding. Enter your age, contributions, and expected return to see your projected retirement balance, total tax-free growth, and estimated monthly income.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
