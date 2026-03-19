"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
];

function calcIdealWeights(heightInches: number, gender: "male" | "female") {
  const over5ft = heightInches - 60;
  if (over5ft < 0) return null;

  let devine: number, robinson: number, miller: number, hamwi: number;

  if (gender === "male") {
    devine = 50 + 2.3 * over5ft;
    robinson = 52 + 1.9 * over5ft;
    miller = 56.2 + 1.41 * over5ft;
    hamwi = 48 + 2.7 * over5ft;
  } else {
    devine = 45.5 + 2.3 * over5ft;
    robinson = 49 + 1.7 * over5ft;
    miller = 53.1 + 1.36 * over5ft;
    hamwi = 45.5 + 2.2 * over5ft;
  }

  // convert kg to lbs
  const toKg = (kg: number) => Math.round(kg * 10) / 10;
  const toLbs = (kg: number) => Math.round(kg * 2.20462);

  return [
    { formula: "Devine", kg: toKg(devine), lbs: toLbs(devine) },
    { formula: "Robinson", kg: toKg(robinson), lbs: toLbs(robinson) },
    { formula: "Miller", kg: toKg(miller), lbs: toLbs(miller) },
    { formula: "Hamwi", kg: toKg(hamwi), lbs: toLbs(hamwi) },
  ];
}

export default function IdealWeightCalculatorPage() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcIdealWeights>>(null);

  const calculate = () => {
    const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
    if (!totalInches || totalInches < 60) {
      setResult(null);
      return;
    }
    setResult(calcIdealWeights(totalInches, gender));
  };

  const minLbs = result ? Math.min(...result.map((r) => r.lbs)) : 0;
  const maxLbs = result ? Math.max(...result.map((r) => r.lbs)) : 0;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Ideal Weight Calculator</h1>
      <p className="text-gray-600 mb-6">
        Find your ideal body weight using four well-known formulas based on your height and gender.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="flex gap-2">
            <button onClick={() => setGender("male")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "male" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Male</button>
            <button onClick={() => setGender("female")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "female" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Female</button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
          <div className="flex gap-2">
            <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="ft" />
            <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="in" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Minimum height: 5 ft 0 in (formulas require at least 60 inches)</p>
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate Ideal Weight
        </button>
      </div>

      {result && (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Ideal Weight Range</div>
            <div className="text-4xl font-bold text-[#2563eb]">{minLbs} – {maxLbs} lbs</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {result.map((r) => (
              <div key={r.formula} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#2563eb]">{r.lbs} lbs</div>
                <div className="text-xs text-gray-400">{r.kg} kg</div>
                <div className="text-sm text-gray-600 mt-1 font-medium">{r.formula}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select your gender.</li>
          <li>Enter your height in feet and inches.</li>
          <li>Click &quot;Calculate Ideal Weight&quot; to see results from four formulas.</li>
          <li>The summary range shows the lowest to highest estimate across all formulas.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          This calculator uses four well-known formulas to estimate ideal body weight based on height. All formulas calculate a base weight for 5 feet of height and add an increment per inch above 5 feet.
          <strong> Devine (1974)</strong>: Most widely used in medicine.
          <strong> Robinson (1983)</strong>: A modification of Devine.
          <strong> Miller (1983)</strong>: Tends to give slightly higher values.
          <strong> Hamwi (1964)</strong>: One of the earliest formulas. Each formula produces a different estimate, so the range gives you a reasonable target.
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
