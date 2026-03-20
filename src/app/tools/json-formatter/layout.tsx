import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool | CalcCanvas",
  description: "Format, minify, and validate JSON data instantly in your browser. Prettify with 2-space indentation, compress for production, and catch syntax errors fast.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
