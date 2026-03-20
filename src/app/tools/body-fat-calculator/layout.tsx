import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator — Free Body Fat Percentage Estimator | CalcCanvas",
  description: "Estimate your body fat percentage using the US Navy method. Enter simple body measurements to see your fat mass, lean mass, and fitness category instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
