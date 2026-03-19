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
