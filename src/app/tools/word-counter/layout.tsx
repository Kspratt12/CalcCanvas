import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter — Free Online Word Count Tool | CalcCanvas",
  description:
    "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter with real-time stats — no sign-up required.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
