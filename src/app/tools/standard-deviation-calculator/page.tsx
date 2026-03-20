"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Average Calculator", href: "/tools/average-calculator" },
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Fraction Calculator", href: "/tools/fraction-calculator" },
  { name: "Random Number Generator", href: "/tools/random-number-generator" },
];

interface Stats {
  mean: number;
  populationSD: number;
  sampleSD: number;
  populationVariance: number;
  sampleVariance: number;
  count: number;
  sum: number;
  min: number;
  max: number;
}

function computeStats(nums: number[]): Stats | null {
  if (nums.length === 0) return null;

  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / nums.length;

  const squaredDiffs = nums.map((n) => (n - mean) ** 2);
  const populationVariance = squaredDiffs.reduce((a, b) => a + b, 0) / nums.length;
  const sampleVariance =
    nums.length > 1
      ? squaredDiffs.reduce((a, b) => a + b, 0) / (nums.length - 1)
      : 0;

  const sorted = [...nums].sort((a, b) => a - b);

  return {
    mean: Math.round(mean * 10000) / 10000,
    populationSD: Math.round(Math.sqrt(populationVariance) * 10000) / 10000,
    sampleSD: Math.round(Math.sqrt(sampleVariance) * 10000) / 10000,
    populationVariance: Math.round(populationVariance * 10000) / 10000,
    sampleVariance: Math.round(sampleVariance * 10000) / 10000,
    count: nums.length,
    sum: Math.round(sum * 10000) / 10000,
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
}

export default function StandardDeviationPage() {
  const [pasteText, setPasteText] = useState("");
  const [result, setResult] = useState<Stats | null>(null);

  const calculate = () => {
    const nums = pasteText
      .split(/[,\n\s]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    setResult(computeStats(nums));
  };

  const reset = () => {
    setPasteText("");
    setResult(null);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the difference between population and sample standard deviation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Population standard deviation is used when your data set includes every member of the group you're studying. Sample standard deviation applies when you're working with a subset of the full population. The sample version divides by N-1 instead of N (Bessel's correction)."
                }
              },
              {
                "@type": "Question",
                "name": "When should I use variance instead of standard deviation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Variance is simply the standard deviation squared. It's useful in certain statistical formulas. However, standard deviation is generally more intuitive because it's expressed in the same units as your original data."
                }
              },
              {
                "@type": "Question",
                "name": "What does a standard deviation of zero mean?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard deviation of zero means every value in your data set is exactly the same. There is no spread or variation at all."
                }
              },
              {
                "@type": "Question",
                "name": "Can I paste data from a spreadsheet?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Copy a column of numbers from Excel, Google Sheets, or any spreadsheet and paste it directly into the text area. The calculator accepts numbers separated by commas, spaces, or newlines."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Standard Deviation Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate the standard deviation, variance, and mean of any data set.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your numbers (comma, space, or newline separated)
        </label>
        <textarea
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
          placeholder="e.g. 4, 8, 6, 5, 3, 7, 2, 9"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Population SD (\u03C3)", value: result.populationSD },
            { label: "Sample SD (s)", value: result.sampleSD },
            { label: "Population Variance", value: result.populationVariance },
            { label: "Sample Variance", value: result.sampleVariance },
            { label: "Mean", value: result.mean },
            { label: "Count", value: result.count },
            { label: "Sum", value: result.sum },
            { label: "Min", value: result.min },
            { label: "Max", value: result.max },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-[#2563eb]">{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enter your numbers separated by commas, spaces, or newlines.</li>
          <li>Click &quot;Calculate&quot; to see all statistical measures.</li>
          <li>Both population and sample standard deviation are computed.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          <strong>Standard deviation</strong> measures how spread out numbers are from the mean.
          The <strong>population standard deviation (\u03C3)</strong> divides by N, while the
          <strong> sample standard deviation (s)</strong> divides by N-1 (Bessel&apos;s correction).
          <strong> Variance</strong> is the square of the standard deviation.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is Standard Deviation?</h2>
        <p className="text-gray-700 mb-4">
          Standard deviation is a measure of how spread out numbers are in a data set. A low standard deviation means the values tend to cluster close to the average (mean), while a high standard deviation indicates the values are spread over a wider range. Think of it as a way to quantify consistency &mdash; the lower the number, the more consistent your data.
        </p>
        <p className="text-gray-700 mb-4">
          You&apos;ll encounter standard deviation in science, finance, quality control, and academics. A manufacturer might use it to check if products stay within acceptable tolerances. An investor might use it to measure the volatility of a stock&apos;s returns. Teachers use it to understand how test scores are distributed across a class. This calculator gives you both the population and sample versions, along with variance, mean, and other key statistics in one shot.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the difference between population and sample standard deviation?</h3>
        <p className="text-gray-700 mb-4">
          Population standard deviation is used when your data set includes every member of the group you&apos;re studying. Sample standard deviation applies when you&apos;re working with a subset of the full population. The sample version divides by N-1 instead of N (Bessel&apos;s correction) to account for the fact that a sample tends to underestimate the true variability.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">When should I use variance instead of standard deviation?</h3>
        <p className="text-gray-700 mb-4">
          Variance is simply the standard deviation squared. It&apos;s useful in certain statistical formulas and when comparing variability across data sets. However, standard deviation is generally more intuitive because it&apos;s expressed in the same units as your original data, while variance is in squared units.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What does a standard deviation of zero mean?</h3>
        <p className="text-gray-700 mb-4">
          A standard deviation of zero means every value in your data set is exactly the same. There is no spread or variation at all. For instance, the data set {"{"}5, 5, 5, 5{"}"} has a mean of 5 and a standard deviation of 0.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How many decimal places does this calculator use?</h3>
        <p className="text-gray-700 mb-4">
          Results are rounded to 4 decimal places for readability. This level of precision is more than sufficient for most practical applications, including academic homework, business analysis, and scientific measurements.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I paste data from a spreadsheet?</h3>
        <p className="text-gray-700 mb-4">
          Yes. Copy a column of numbers from Excel, Google Sheets, or any spreadsheet and paste it directly into the text area. The calculator accepts numbers separated by commas, spaces, or newlines, so most paste formats will work automatically.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-2">
          <strong>Scenario:</strong> A teacher wants to understand how her students performed on a quiz. The scores are: 72, 85, 90, 68, 95, 78, 82, 88.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 1:</strong> Enter the data: 72, 85, 90, 68, 95, 78, 82, 88.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 2:</strong> The mean is (72 + 85 + 90 + 68 + 95 + 78 + 82 + 88) &divide; 8 = <strong>82.25</strong>.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 3:</strong> The population standard deviation comes out to approximately <strong>8.4779</strong>, meaning most scores fall within about 8.5 points of the average.
        </p>
        <p className="text-gray-700">
          <strong>Interpretation:</strong> A standard deviation of ~8.5 on a quiz scored out of 100 suggests moderate spread. The class performed fairly consistently, with no extreme outliers pulling the average up or down.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-blue-50 text-[#2563eb] rounded-lg hover:bg-blue-100 transition text-sm font-medium"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
