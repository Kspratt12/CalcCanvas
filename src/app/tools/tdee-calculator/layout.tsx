import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator — Free Daily Calorie Estimator | CalcCanvas",
  description:
    "Calculate your Total Daily Energy Expenditure (TDEE) for free. Uses the Mifflin-St Jeor equation to estimate BMR and daily calories for weight loss, maintenance, or muscle gain.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
