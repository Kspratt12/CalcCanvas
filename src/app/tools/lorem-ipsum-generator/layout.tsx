import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Placeholder Text Tool | CalcCanvas",
  description:
    "Generate Lorem Ipsum placeholder text for your designs and mockups. Choose 1-20 paragraphs and copy instantly. Free online dummy text generator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
