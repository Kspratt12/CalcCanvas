import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator — Free Gratuity & Bill Splitter | CalcCanvas",
  description:
    "Calculate tip amount, total bill, and per-person split instantly. Preset buttons for 15%, 18%, 20%, and 25% tips make it fast and easy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
