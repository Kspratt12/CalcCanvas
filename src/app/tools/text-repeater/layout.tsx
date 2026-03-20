import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Repeater — Free Online Text Repetition Tool | CalcCanvas",
  description:
    "Repeat any text up to 500 times with custom separators. Free online text repeater for testing, data generation, and creative projects.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
