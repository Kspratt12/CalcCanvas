import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator — Free Ideal Body Weight by Height | CalcCanvas",
  description: "Find your ideal body weight using four trusted formulas (Devine, Robinson, Miller, Hamwi). Enter your height and gender to get a healthy weight range instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
