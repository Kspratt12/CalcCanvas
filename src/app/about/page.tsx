import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — CalcCanvas",
  description:
    "Learn about CalcCanvas, a free collection of online calculators and tools for finance, health, math, text, and development.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">About CalcCanvas</h1>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          CalcCanvas is a free collection of online calculators and utility tools
          built for everyday use. Whether you need to estimate a mortgage
          payment, check your BMI, format JSON, or generate a secure password,
          CalcCanvas has you covered.
        </p>

        <p>
          Every tool on CalcCanvas is designed to be fast, accurate, and
          mobile-friendly. There is no sign-up required and no data is stored on
          our servers — all calculations happen right in your browser.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What We Offer
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Financial Calculators</strong> — Mortgage, compound interest,
            loan payoff, retirement planning, and more.
          </li>
          <li>
            <strong>Health &amp; Fitness</strong> — BMI, calorie needs, body fat
            percentage, ideal weight, and pace calculators.
          </li>
          <li>
            <strong>Math Tools</strong> — Percentages, fractions, averages,
            standard deviation, and random number generation.
          </li>
          <li>
            <strong>Text Tools</strong> — Word counter, case converter, lorem
            ipsum generator, slug generator, and more.
          </li>
          <li>
            <strong>Developer Tools</strong> — JSON formatter, Base64
            encoder/decoder, password generator, UUID generator, and hash
            generator.
          </li>
          <li>
            <strong>Everyday Tools</strong> — Age calculator, date calculator,
            countdown timer, QR code generator, and unit converter.
          </li>
        </ul>

        <p>
          CalcCanvas is constantly growing. We regularly add new tools based on
          what people actually need. Bookmark us and come back anytime you need a
          quick calculation.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
        >
          Browse All Tools
        </Link>
      </div>
    </div>
  );
}
