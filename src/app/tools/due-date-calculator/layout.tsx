import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Due Date Calculator — Pregnancy Due Date | CalcCanvas",
  description:
    "Calculate your estimated pregnancy due date from your last menstrual period or conception date. See current week, trimester, and full timeline.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
