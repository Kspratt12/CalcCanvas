import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Hours Calculator — Track Work Hours & Pay | CalcCanvas",
  description:
    "Calculate total hours worked, subtract breaks, and estimate weekly pay. Add multiple daily entries for a full weekly timesheet. Free online hours calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
