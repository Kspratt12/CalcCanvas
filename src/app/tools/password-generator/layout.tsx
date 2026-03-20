import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator — Free Secure Random Passwords | CalcCanvas",
  description: "Generate strong, random passwords using the Web Crypto API. Customize length and character types. Cryptographically secure — nothing stored or transmitted.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
