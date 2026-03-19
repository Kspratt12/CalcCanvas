import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Date Calculator — Days Between Dates & Add/Subtract Days | CalcCanvas",
  description:
    "Calculate the number of days between two dates or add/subtract days from a date. Includes business days calculation. Free online date calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
