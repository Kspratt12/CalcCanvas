import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Macro Calculator — Free Macronutrient Calculator | CalcCanvas",
  description: "Calculate your ideal daily macros for protein, carbs, and fat based on your age, weight, height, activity level, and fitness goal. Uses the Mifflin-St Jeor equation to estimate TDEE and optimal macro splits for weight loss, maintenance, or muscle gain.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
