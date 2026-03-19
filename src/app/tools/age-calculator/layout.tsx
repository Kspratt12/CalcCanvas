import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Age Calculator — Calculate Your Exact Age | CalcCanvas",
  description:
    "Calculate your exact age in years, months, and days. Find your zodiac sign, day of birth, total days alive, and days until your next birthday. Free online age calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
