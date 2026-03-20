"use client";

import { useState } from "react";
import Link from "next/link";


const RELATED_TOOLS = [
  { name: "Fraction Calculator", href: "/tools/fraction-calculator" },
  { name: "Average Calculator", href: "/tools/average-calculator" },
  { name: "Random Number Generator", href: "/tools/random-number-generator" },
  { name: "Tip Calculator", href: "/tools/tip-calculator" },
];

type Mode = "of" | "is" | "what";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;

    if (mode === "of") {
      // What is X% of Y?
      setResult(((x / 100) * y).toFixed(4).replace(/\.?0+$/, ""));
    } else if (mode === "is") {
      // X is what % of Y?
      if (y === 0) return;
      setResult(((x / y) * 100).toFixed(4).replace(/\.?0+$/, "") + "%");
    } else {
      // X is Y% of what?
      if (y === 0) return;
      setResult((x / (y / 100)).toFixed(4).replace(/\.?0+$/, ""));
    }
  };

  const tabs: { key: Mode; label: string }[] = [
    { key: "of", label: "X% of Y" },
    { key: "is", label: "X is ?% of Y" },
    { key: "what", label: "X is Y% of ?" },
  ];

  const getLabels = () => {
    if (mode === "of") return { aLabel: "Percentage (%)", bLabel: "Number", question: `What is ${a || "X"}% of ${b || "Y"}?` };
    if (mode === "is") return { aLabel: "Number (X)", bLabel: "Number (Y)", question: `${a || "X"} is what % of ${b || "Y"}?` };
    return { aLabel: "Number (X)", bLabel: "Percentage (%)", question: `${a || "X"} is ${b || "Y"}% of what?` };
  };

  const labels = getLabels();

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
                "name": "How do I calculate a percentage of a number?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To find X% of a number Y, multiply Y by X and then divide by 100. For example, 15% of 200 is (200 x 15) / 100 = 30."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between percentage and percentile?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A percentage represents a portion out of 100, like scoring 85% on a test. A percentile tells you how you rank compared to others. Being in the 90th percentile means you scored higher than 90% of all test-takers."
                }
              },
              {
                "@type": "Question",
                "name": "How do I find the original price before a discount?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use Mode 3 (\"X is Y% of what?\"). If an item costs $60 after a 25% discount, the sale price represents 75% of the original. Enter 60 as X and 75 as Y% to find the original price was $80."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for percentage increase or decrease?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. To find the percentage change, use Mode 2. Subtract the old value from the new value, then enter that difference as X and the old value as Y. The result tells you the percentage increase or decrease."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
      <p className="text-gray-600 mb-6">
        Quickly solve percentage problems with three calculation modes.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex gap-1 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setMode(t.key); setResult(null); }}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${mode === t.key ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-gray-600 text-center mb-4 font-medium">{labels.question}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{labels.aLabel}</label>
            <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="Enter value" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{labels.bLabel}</label>
            <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="Enter value" />
          </div>
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate
        </button>
      </div>

      {result !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
          <div className="text-sm text-gray-600 mb-1">Result</div>
          <div className="text-4xl font-bold text-[#2563eb]">{result}</div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Choose a calculation mode using the tabs at the top.</li>
          <li>Enter the two values needed for your chosen mode.</li>
          <li>Click &quot;Calculate&quot; to see the result instantly.</li>
          <li>Switch between modes to solve different types of percentage problems.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          <strong>Mode 1 — &quot;What is X% of Y?&quot;</strong>: Multiplies Y by X/100.
          <strong> Mode 2 — &quot;X is what % of Y?&quot;</strong>: Divides X by Y and multiplies by 100.
          <strong> Mode 3 — &quot;X is Y% of what?&quot;</strong>: Divides X by Y/100.
          These three formulas cover all common percentage calculations you encounter in everyday math, finance, and statistics.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Percentage?</h2>
        <p className="text-gray-700 mb-4">
          A percentage is a way of expressing a number as a fraction of 100. The word itself comes from the Latin &quot;per centum,&quot; meaning &quot;by the hundred.&quot; When you see 25%, that simply means 25 out of every 100. Percentages show up everywhere in daily life &mdash; from sales tax and restaurant tips to interest rates and exam scores. They give us a universal way to compare proportions, regardless of the original numbers involved.
        </p>
        <p className="text-gray-700 mb-4">
          This calculator handles the three most common percentage questions people run into. Whether you need to find a specific percentage of a number (like calculating a 20% tip), figure out what percentage one number is of another (like your test score), or work backward to find the original number before a percentage was applied (like the pre-sale price), this tool covers it all in one place.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How do I calculate a percentage of a number?</h3>
        <p className="text-gray-700 mb-4">
          To find X% of a number Y, multiply Y by X and then divide by 100. For example, 15% of 200 is (200 &times; 15) &divide; 100 = 30. You can also think of it as moving the decimal point two places to the left in the percentage and then multiplying.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the difference between percentage and percentile?</h3>
        <p className="text-gray-700 mb-4">
          A percentage represents a portion out of 100, like scoring 85% on a test. A percentile, on the other hand, tells you how you rank compared to others. Being in the 90th percentile means you scored higher than 90% of all test-takers. They measure different things entirely.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How do I find the original price before a discount?</h3>
        <p className="text-gray-700 mb-4">
          Use Mode 3 (&quot;X is Y% of what?&quot;). If an item costs $60 after a 25% discount, the sale price represents 75% of the original. Enter 60 as X and 75 as Y% to find the original price was $80. This works because the discounted price is always (100 &minus; discount%) of the original.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I use this for percentage increase or decrease?</h3>
        <p className="text-gray-700 mb-4">
          Yes. To find the percentage change, use Mode 2. Subtract the old value from the new value, then enter that difference as X and the old value as Y. The result tells you the percentage increase (if positive) or decrease (if negative). For example, going from 80 to 100 is a 25% increase.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why does my calculator show a slightly different result?</h3>
        <p className="text-gray-700 mb-4">
          This tool removes unnecessary trailing zeros for cleaner output, so 25.0000 displays as 25. The underlying math is the same. If you see minor differences from other calculators, it&apos;s usually due to rounding at different decimal places.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-2">
          <strong>Scenario:</strong> You&apos;re shopping and see a jacket originally priced at $120 with a 35% discount. How much do you save, and what&apos;s the final price?
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 1:</strong> Use Mode 1 &mdash; &quot;What is 35% of 120?&quot; Enter 35 as the percentage and 120 as the number. Result: <strong>$42</strong> (that&apos;s your savings).
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 2:</strong> Subtract the discount from the original price: $120 &minus; $42 = <strong>$78</strong> (the price you pay).
        </p>
        <p className="text-gray-700">
          <strong>Verification:</strong> Use Mode 2 &mdash; &quot;78 is what % of 120?&quot; Result: 65%, which confirms the jacket is 65% of its original price (100% &minus; 35% = 65%).
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
