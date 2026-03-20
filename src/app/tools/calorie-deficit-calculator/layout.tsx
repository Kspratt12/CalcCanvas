import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Deficit Calculator — Free Weight Loss Calculator | CalcCanvas",
  description: "Calculate your exact calorie deficit for weight loss. Enter your stats and goal weight to get your daily calorie target, TDEE, and estimated time to reach your goal. Uses the Mifflin-St Jeor equation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
