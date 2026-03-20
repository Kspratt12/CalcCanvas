import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Free Online Tool | CalcCanvas",
  description: "Encode text to Base64 or decode Base64 strings back to plain text. Supports full Unicode and UTF-8. Runs locally in your browser — no data sent to servers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
