import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMR Calculator — Free Basal Metabolic Rate Calculator | CalcCanvas",
  description: "Calculate your Basal Metabolic Rate and daily calorie needs at every activity level. Uses the accurate Mifflin-St Jeor equation for men and women.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
