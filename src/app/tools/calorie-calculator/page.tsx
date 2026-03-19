"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
  { name: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
  { name: "Ideal Weight Calculator", href: "/tools/ideal-weight-calculator" },
];

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Lightly active (1-3 days/week)", value: 1.375 },
  { label: "Moderately active (3-5 days/week)", value: 1.55 },
  { label: "Very active (6-7 days/week)", value: 1.725 },
  { label: "Extra active (very hard exercise)", value: 1.9 },
];

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [activity, setActivity] = useState(1.55);
  const [result, setResult] = useState<{ maintenance: number; loss: number; gain: number } | null>(null);

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

    const maintenance = Math.round(bmr * activity);
    setResult({
      maintenance,
      loss: maintenance - 500,
      gain: maintenance + 500,
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Calorie Calculator</h1>
      <p className="text-gray-600 mb-6">
        Estimate your daily caloric needs based on your age, gender, weight, height, and activity level using the Mifflin-St Jeor equation.
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate Calories
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{result.loss}</div>
            <div className="text-sm text-gray-600 mt-1">Weight Loss</div>
            <div className="text-xs text-gray-400">-500 cal/day</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#2563eb]">{result.maintenance}</div>
            <div className="text-sm text-gray-600 mt-1">Maintenance</div>
            <div className="text-xs text-gray-400">maintain weight</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">{result.gain}</div>
            <div className="text-sm text-gray-600 mt-1">Weight Gain</div>
            <div className="text-xs text-gray-400">+500 cal/day</div>
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
          <li>Select your typical activity level from the dropdown.</li>
          <li>Click &quot;Calculate Calories&quot; to see your daily calorie needs.</li>
          <li>Use the results to plan your diet for weight loss, maintenance, or gain.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          This calculator uses the <strong>Mifflin-St Jeor equation</strong>, widely considered the most accurate formula for estimating Basal Metabolic Rate (BMR).
          For men: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) - 5 &times; age - 5.
          For women: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) - 5 &times; age - 161.
          The BMR is then multiplied by an activity factor to estimate Total Daily Energy Expenditure (TDEE). A deficit of 500 calories per day leads to roughly 1 lb of weight loss per week.
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
