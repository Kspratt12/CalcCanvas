import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator — Free Online Body Mass Index Calculator | CalcCanvas",
  description: "Calculate your Body Mass Index instantly with our free BMI calculator. Enter your height and weight to find out if you're in a healthy range. Supports imperial and metric units.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
