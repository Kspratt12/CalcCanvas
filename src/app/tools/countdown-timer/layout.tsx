import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countdown Timer — Free Online Timer & Date Countdown | CalcCanvas",
  description: "Set a countdown timer by duration or count down to a specific date and time. Features pause, resume, and reset controls. Runs entirely in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
