import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator — SHA-1, SHA-256, SHA-512 Online | CalcCanvas",
  description: "Generate SHA-1, SHA-256, and SHA-512 hashes from any text instantly. Uses the Web Crypto API — all hashing happens locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
