import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Calculator — Free Daily Calorie Needs Estimator | CalcCanvas",
  description: "Estimate your daily calorie needs for weight loss, maintenance, or gain. Uses the Mifflin-St Jeor equation with your age, gender, height, weight, and activity level.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
