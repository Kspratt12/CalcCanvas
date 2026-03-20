import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter — Free Online Text Case Changer | CalcCanvas",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, and Sentence case instantly. Free online case converter — works right in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
