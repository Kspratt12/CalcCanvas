"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Fraction Calculator", href: "/tools/fraction-calculator" },
  { name: "Random Number Generator", href: "/tools/random-number-generator" },
  { name: "Tip Calculator", href: "/tools/tip-calculator" },
];

function computeStats(nums: number[]) {
  if (nums.length === 0) return null;

  const sorted = [...nums].sort((a, b) => a - b);
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / nums.length;

  let median: number;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  const freq: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of nums) {
    freq[n] = (freq[n] || 0) + 1;
    if (freq[n] > maxFreq) maxFreq = freq[n];
  }
  const modes = Object.entries(freq)
    .filter(([, f]) => f === maxFreq)
    .map(([n]) => parseFloat(n));
  const modeStr = maxFreq === 1 ? "No mode" : modes.join(", ");

  const range = sorted[sorted.length - 1] - sorted[0];

  return {
    mean: Math.round(mean * 10000) / 10000,
    median: Math.round(median * 10000) / 10000,
    mode: modeStr,
    range: Math.round(range * 10000) / 10000,
    sum: Math.round(sum * 10000) / 10000,
    count: nums.length,
  };
}

export default function AverageCalculatorPage() {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [pasteText, setPasteText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof computeStats>>(null);

  const addInput = () => setInputs([...inputs, ""]);
  const removeInput = (idx: number) => {
    const next = inputs.filter((_, i) => i !== idx);
    setInputs(next.length ? next : [""]);
  };
  const updateInput = (idx: number, val: string) => {
    const next = [...inputs];
    next[idx] = val;
    setInputs(next);
  };

  const calculate = () => {
    let nums: number[];

    if (pasteText.trim()) {
      nums = pasteText
        .split(/[,\n\s]+/)
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n));
    } else {
      nums = inputs.map((s) => parseFloat(s)).filter((n) => !isNaN(n));
    }

    setResult(computeStats(nums));
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
                "name": "What is the difference between mean, median, and mode?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The mean is the sum of all values divided by the count. The median is the middle value when data is sorted from smallest to largest. The mode is the value that appears most frequently. Each measure highlights a different aspect of your data, and they can differ significantly when outliers are present."
                }
              },
              {
                "@type": "Question",
                "name": "When is the median more useful than the mean?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The median is more useful when your data has extreme outliers or is heavily skewed. For example, median household income is a better measure of typical earnings than mean income, because a few very high earners can pull the mean way up without reflecting what most people actually earn."
                }
              },
              {
                "@type": "Question",
                "name": "What does \"No mode\" mean?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If every value in your data set appears exactly once, there is no mode — no single value is more common than any other. The calculator displays \"No mode\" in this case. If multiple values tie for the highest frequency, all of them are listed as modes."
                }
              },
              {
                "@type": "Question",
                "name": "Can I paste data from a spreadsheet?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Copy a row or column of numbers from Excel or Google Sheets and paste it into the text area. The calculator handles numbers separated by commas, spaces, tabs, and newlines, so most common formats will be parsed correctly without any manual reformatting."
                }
              },
              {
                "@type": "Question",
                "name": "How is the range calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The range is simply the difference between the largest and smallest values in your data set. It gives you a quick sense of how spread out the data is, though it can be heavily influenced by a single outlier."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Average Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate the mean, median, mode, range, sum, and count of any set of numbers.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter numbers individually</label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {inputs.map((val, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => updateInput(i, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder={`Number ${i + 1}`}
                />
                <button onClick={() => removeInput(i)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button onClick={addInput} className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            + Add Number
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Or paste a list (comma or newline separated)</label>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
            placeholder="e.g. 10, 20, 30, 40, 50"
          />
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Mean", value: result.mean },
            { label: "Median", value: result.median },
            { label: "Mode", value: result.mode },
            { label: "Range", value: result.range },
            { label: "Sum", value: result.sum },
            { label: "Count", value: result.count },
          ].map((s) => (
            <div key={s.label} className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
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
          <li>Add numbers one by one using the input fields, or paste a list.</li>
          <li>Click &quot;+ Add Number&quot; to add more input fields as needed.</li>
          <li>Click &quot;Calculate&quot; to see all statistical measures.</li>
          <li>The paste field accepts numbers separated by commas, spaces, or newlines.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          <strong>Mean</strong> is the sum of all numbers divided by the count.
          <strong> Median</strong> is the middle value when numbers are sorted (or the average of the two middle values for even-length sets).
          <strong> Mode</strong> is the most frequently occurring value(s). If all values appear once, there is no mode.
          <strong> Range</strong> is the difference between the largest and smallest values.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is an Average?</h2>
        <p className="text-gray-700 mb-4">
          In everyday language, &quot;average&quot; usually refers to the arithmetic mean &mdash; add up all the numbers and divide by how many there are. But in statistics, there are actually several types of averages, each telling you something different about your data. The mean gives you the overall balance point, the median gives you the true middle value, and the mode tells you which value appears most often.
        </p>
        <p className="text-gray-700 mb-4">
          This calculator computes all three averages at once, along with the range, sum, and count. That&apos;s useful because no single average tells the whole story. For example, if you have incomes of $30k, $35k, $40k, $45k, and $500k, the mean ($130k) is misleading &mdash; the median ($40k) gives a much better picture of what&apos;s typical. Having all the measures side by side helps you understand your data more completely.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the difference between mean, median, and mode?</h3>
        <p className="text-gray-700 mb-4">
          The mean is the sum of all values divided by the count. The median is the middle value when data is sorted from smallest to largest. The mode is the value that appears most frequently. Each measure highlights a different aspect of your data, and they can differ significantly when outliers are present.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">When is the median more useful than the mean?</h3>
        <p className="text-gray-700 mb-4">
          The median is more useful when your data has extreme outliers or is heavily skewed. For example, median household income is a better measure of typical earnings than mean income, because a few very high earners can pull the mean way up without reflecting what most people actually earn.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What does &quot;No mode&quot; mean?</h3>
        <p className="text-gray-700 mb-4">
          If every value in your data set appears exactly once, there is no mode &mdash; no single value is more common than any other. The calculator displays &quot;No mode&quot; in this case. If multiple values tie for the highest frequency, all of them are listed as modes.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I paste data from a spreadsheet?</h3>
        <p className="text-gray-700 mb-4">
          Yes. Copy a row or column of numbers from Excel or Google Sheets and paste it into the text area. The calculator handles numbers separated by commas, spaces, tabs, and newlines, so most common formats will be parsed correctly without any manual reformatting.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How is the range calculated?</h3>
        <p className="text-gray-700 mb-4">
          The range is simply the difference between the largest and smallest values in your data set. It gives you a quick sense of how spread out the data is, though it can be heavily influenced by a single outlier. For a more robust measure of spread, consider looking at standard deviation as well.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-2">
          <strong>Scenario:</strong> You tracked your daily step counts for a week: 8200, 6500, 9100, 7800, 10500, 6500, 8400. You want to know your average daily steps.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Mean:</strong> (8200 + 6500 + 9100 + 7800 + 10500 + 6500 + 8400) &divide; 7 = <strong>8,142.86</strong> steps per day on average.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Median:</strong> Sorted data is 6500, 6500, 7800, 8200, 8400, 9100, 10500. The middle value is <strong>8,200</strong>.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Mode:</strong> 6,500 appears twice while all other values appear once, so the mode is <strong>6,500</strong>.
        </p>
        <p className="text-gray-700">
          <strong>Range:</strong> 10,500 &minus; 6,500 = <strong>4,000</strong>. This tells you your most active day had 4,000 more steps than your least active day.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          {RELATED_TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="px-4 py-2 bg-blue-50 text-[#2563eb] rounded-lg hover:bg-blue-100 transition text-sm font-medium">
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
