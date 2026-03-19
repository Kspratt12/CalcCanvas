"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
  { name: "Ideal Weight Calculator", href: "/tools/ideal-weight-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
];

type Units = "imperial" | "metric";

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
  if (bmi < 25) return { label: "Normal", color: "text-green-600", bg: "bg-green-50 border-green-200" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
  return { label: "Obese", color: "text-red-600", bg: "bg-red-50 border-red-200" };
}

export default function BmiCalculatorPage() {
  const [units, setUnits] = useState<Units>("imperial");
  const [weightLbs, setWeightLbs] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: ReturnType<typeof getBmiCategory>;
    healthyMin: number;
    healthyMax: number;
  } | null>(null);

  const calculate = () => {
    let weightKgVal: number;
    let heightM: number;

    if (units === "imperial") {
      weightKgVal = parseFloat(weightLbs) * 0.453592;
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
      heightM = totalInches * 0.0254;
    } else {
      weightKgVal = parseFloat(weightKg);
      heightM = parseFloat(heightCm) / 100;
    }

    if (!weightKgVal || !heightM || weightKgVal <= 0 || heightM <= 0) return;

    const bmi = weightKgVal / (heightM * heightM);
    const category = getBmiCategory(bmi);
    const healthyMin = 18.5 * (heightM * heightM);
    const healthyMax = 24.9 * (heightM * heightM);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthyMin: units === "imperial" ? Math.round(healthyMin * 2.20462) : Math.round(healthyMin * 10) / 10,
      healthyMax: units === "imperial" ? Math.round(healthyMax * 2.20462) : Math.round(healthyMax * 10) / 10,
    });
  };

  const weightUnit = units === "imperial" ? "lbs" : "kg";

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Body Mass Index to find out if your weight falls within a healthy range for your height.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Unit toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUnits("imperial")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${units === "imperial" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Imperial (lbs, ft/in)
          </button>
          <button
            onClick={() => setUnits("metric")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${units === "metric" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Metric (kg, cm)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {units === "imperial" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="e.g. 160"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    placeholder="ft"
                  />
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    placeholder="in"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="e.g. 72"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="e.g. 175"
                />
              </div>
            </>
          )}
        </div>

        <button
          onClick={calculate}
          className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Calculate BMI
        </button>
      </div>

      {result && (
        <div className={`border rounded-lg p-6 mb-6 ${result.category.bg}`}>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{result.bmi}</div>
            <div className={`text-xl font-semibold ${result.category.color}`}>{result.category.label}</div>
            <p className="text-gray-600 mt-3">
              Healthy weight range for your height: <strong>{result.healthyMin} – {result.healthyMax} {weightUnit}</strong>
            </p>
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select your preferred unit system (Imperial or Metric).</li>
          <li>Enter your weight and height in the fields provided.</li>
          <li>Click &quot;Calculate BMI&quot; to see your result.</li>
          <li>Your BMI category and healthy weight range will be displayed.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          BMI is calculated using the formula: <strong>BMI = weight (kg) / height (m)&sup2;</strong>.
          A BMI below 18.5 is considered underweight, 18.5–24.9 is normal, 25–29.9 is overweight,
          and 30 or above is obese. While BMI is a useful screening tool, it does not directly
          measure body fat and may not be accurate for athletes or elderly individuals.
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
