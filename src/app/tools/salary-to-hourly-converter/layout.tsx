import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary to Hourly Converter — Free Wage Calculator | CalcCanvas",
  description:
    "Convert annual salary to hourly wage or hourly rate to yearly salary. See your earnings broken down by hour, day, week, month, and year instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
