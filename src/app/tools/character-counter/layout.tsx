import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter — Free Online Character Count Tool | CalcCanvas",
  description:
    "Count characters, words, and lines in real time with an optional character limit. Perfect for tweets, meta descriptions, and SMS messages.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
