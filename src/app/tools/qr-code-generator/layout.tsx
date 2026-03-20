import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator — Free Online QR Code Maker | CalcCanvas",
  description: "Create QR codes for URLs, text, phone numbers, email, and Wi-Fi credentials. Choose custom sizes and download as PNG. Free and instant.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
