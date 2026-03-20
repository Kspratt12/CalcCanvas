import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "401k Calculator — Free Retirement Savings Estimator | CalcCanvas",
  description:
    "Estimate your 401k balance at retirement with employer match, salary growth, and compound interest. See how your contributions grow over time with this free 401k calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
