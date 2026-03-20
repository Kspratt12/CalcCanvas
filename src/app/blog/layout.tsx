import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — CalcCanvas | Calculator Guides & Tips",
  description:
    "Free guides on mortgages, budgeting, health metrics, math concepts, and developer tools. Learn how to use calculators effectively.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
