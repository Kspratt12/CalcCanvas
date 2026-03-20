import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Time Calculator — Add, Subtract & Compare | CalcCanvas",
  description:
    "Add or subtract days, hours, minutes, and seconds from any time. Calculate the exact duration between two dates and times. Free online time calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
