import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator — Free Online v4 UUID Tool | CalcCanvas",
  description: "Generate random v4 UUIDs instantly. Create 1 to 50 universally unique identifiers at a time. Uses crypto.randomUUID() for cryptographic randomness.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
