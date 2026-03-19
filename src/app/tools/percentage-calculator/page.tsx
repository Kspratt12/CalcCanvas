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
