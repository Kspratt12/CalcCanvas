"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
  { name: "Ideal Weight Calculator", href: "/tools/ideal-weight-calculator" },
];

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", factor: 1.2 },
  { label: "Lightly active (1-3 days/week)", factor: 1.375 },
  { label: "Moderately active (3-5 days/week)", factor: 1.55 },
  { label: "Very active (6-7 days/week)", factor: 1.725 },
  { label: "Extra active (very hard exercise/physical job)", factor: 1.9 },
];

export default function BmrCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState<{ bmr: number; levels: { label: string; calories: number }[] } | null>(null);

  const calculate = () => {
    const ageVal = parseFloat(age);
    const weightKg = parseFloat(weight) * 0.453592;
    const heightCm = (parseFloat(heightFt) * 12 + parseFloat(heightIn || "0")) * 2.54;

    if (!ageVal || !weightKg || !heightCm) return;

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
    }

    bmr = Math.round(bmr);

    setResult({
      bmr,
      levels: ACTIVITY_LEVELS.map((a) => ({
        label: a.label,
        calories: Math.round(bmr * a.factor),
      })),
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">BMR Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Basal Metabolic Rate to understand how many calories your body needs at rest and at different activity levels.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="flex gap-2">
              <button onClick={() => setGender("male")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "male" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Male</button>
              <button onClick={() => setGender("female")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "female" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Female</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 160" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <div className="flex gap-2">
              <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="ft" />
              <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="in" />
            </div>
          </div>
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate BMR
        </button>
      </div>

      {result && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-4">
            <div className="text-sm text-gray-600 mb-1">Your Basal Metabolic Rate</div>
            <div className="text-5xl font-bold text-[#2563eb]">{result.bmr}</div>
            <div className="text-sm text-gray-500 mt-1">calories/day at rest</div>
          </div>

          <div className="space-y-2">
            {result.levels.map((l) => (
              <div key={l.label} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
                <span className="text-gray-700 text-sm">{l.label}</span>
                <span className="text-[#2563eb] font-bold text-lg">{l.calories} cal</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enter your age, gender, weight, and height.</li>
          <li>Click &quot;Calculate BMR&quot; to see your basal metabolic rate.</li>
          <li>Review your daily calorie needs at each activity level.</li>
          <li>Use these numbers to plan your nutrition and fitness goals.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          BMR is the number of calories your body burns at complete rest to maintain basic life functions like breathing and circulation. This calculator uses the <strong>Mifflin-St Jeor equation</strong>:
          Men: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) - 5 &times; age + 5.
          Women: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) - 5 &times; age - 161.
          Your BMR is then multiplied by activity factors ranging from 1.2 (sedentary) to 1.9 (extra active) to estimate your Total Daily Energy Expenditure (TDEE).
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
