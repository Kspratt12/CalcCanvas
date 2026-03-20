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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is BMI accurate for athletes and bodybuilders?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMI does not differentiate between muscle and fat, so people with a lot of muscle mass may get a higher BMI reading that doesn't reflect their actual health status. If you train regularly and carry significant muscle, a body fat percentage test will give you a more accurate assessment."
                }
              },
              {
                "@type": "Question",
                "name": "Does BMI apply to children and teenagers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For children and teens aged 2 to 19, BMI is calculated the same way but interpreted differently using age- and sex-specific percentile charts. A pediatrician can help determine whether a young person's BMI falls within a healthy range for their developmental stage."
                }
              },
              {
                "@type": "Question",
                "name": "What BMI should I aim for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most health organizations recommend keeping your BMI between 18.5 and 24.9. However, your optimal weight depends on many individual factors including age, muscle composition, bone density, and overall health."
                }
              },
              {
                "@type": "Question",
                "name": "How often should I check my BMI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Checking your BMI once every few months is generally sufficient for tracking long-term trends. Daily or weekly fluctuations in weight are normal and don't necessarily indicate meaningful changes in your health."
                }
              },
              {
                "@type": "Question",
                "name": "Can BMI predict heart disease or diabetes risk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Research shows that higher BMI values are associated with increased risk of heart disease, type 2 diabetes, and certain cancers. However, BMI alone is not a diagnostic tool. Your doctor will consider BMI alongside blood pressure, cholesterol levels, blood sugar, and family history to evaluate your overall risk."
                }
              }
            ]
          })
        }}
      />
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
        <h2 className="text-xl font-semibold mb-3">What Is BMI?</h2>
        <p className="text-gray-700 mb-4">
          Body Mass Index, or BMI, is a simple numeric value derived from your weight and height. It was developed in the early 19th century by Belgian mathematician Adolphe Quetelet as a way to quickly assess whether a person&apos;s weight is proportional to their height. Today, doctors, nutritionists, and public health organizations around the world use BMI as a first-pass screening tool to identify potential weight-related health risks.
        </p>
        <p className="text-gray-700 mb-4">
          Your BMI number falls into one of four main categories: underweight (below 18.5), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 and above). While BMI is incredibly useful as a quick health indicator, it has limitations. It doesn&apos;t distinguish between muscle mass and fat mass, which means a muscular athlete might register as &quot;overweight&quot; despite having very low body fat. For a more complete picture, consider pairing your BMI result with a body fat percentage measurement or a waist circumference check.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Is BMI accurate for athletes and bodybuilders?</h3>
        <p className="text-gray-700 mb-4">
          BMI does not differentiate between muscle and fat, so people with a lot of muscle mass may get a higher BMI reading that doesn&apos;t reflect their actual health status. If you train regularly and carry significant muscle, a body fat percentage test will give you a more accurate assessment.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does BMI apply to children and teenagers?</h3>
        <p className="text-gray-700 mb-4">
          For children and teens aged 2 to 19, BMI is calculated the same way but interpreted differently using age- and sex-specific percentile charts. A pediatrician can help determine whether a young person&apos;s BMI falls within a healthy range for their developmental stage.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What BMI should I aim for?</h3>
        <p className="text-gray-700 mb-4">
          Most health organizations recommend keeping your BMI between 18.5 and 24.9. However, your optimal weight depends on many individual factors including age, muscle composition, bone density, and overall health. Talk with your healthcare provider to set a personalized goal.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How often should I check my BMI?</h3>
        <p className="text-gray-700 mb-4">
          Checking your BMI once every few months is generally sufficient for tracking long-term trends. Daily or weekly fluctuations in weight are normal and don&apos;t necessarily indicate meaningful changes in your health. Focus on the overall trend rather than any single reading.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can BMI predict heart disease or diabetes risk?</h3>
        <p className="text-gray-700 mb-4">
          Research shows that higher BMI values are associated with increased risk of heart disease, type 2 diabetes, and certain cancers. However, BMI alone is not a diagnostic tool. Your doctor will consider BMI alongside blood pressure, cholesterol levels, blood sugar, and family history to evaluate your overall risk.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-4">
          Let&apos;s say you weigh 160 pounds and stand 5 feet 8 inches tall. First, convert to metric: 160 lbs = 72.6 kg, and 5&apos;8&quot; = 68 inches = 1.727 meters. Then apply the formula: BMI = 72.6 / (1.727 &times; 1.727) = 72.6 / 2.982 = <strong>24.3</strong>. This falls within the &quot;Normal&quot; category (18.5 to 24.9), meaning your weight is proportional to your height. Your healthy weight range at this height would be approximately 122 to 164 lbs.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">BMI Categories Explained</h2>
        <p className="text-gray-700 mb-4">
          While most people are familiar with the four broad BMI categories, the World Health Organization actually breaks BMI into seven distinct classifications. Each category carries different health implications, and understanding where you fall can help you have a more informed conversation with your doctor.
        </p>
        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="flex items-center justify-between border border-purple-200 bg-purple-50 rounded-lg px-4 py-3">
            <span className="font-medium text-purple-800">Severely Underweight</span>
            <span className="text-purple-700 font-semibold">Below 16.0</span>
          </div>
          <div className="flex items-center justify-between border border-blue-200 bg-blue-50 rounded-lg px-4 py-3">
            <span className="font-medium text-blue-800">Underweight</span>
            <span className="text-blue-700 font-semibold">16.0 – 18.4</span>
          </div>
          <div className="flex items-center justify-between border border-green-200 bg-green-50 rounded-lg px-4 py-3">
            <span className="font-medium text-green-800">Normal Weight</span>
            <span className="text-green-700 font-semibold">18.5 – 24.9</span>
          </div>
          <div className="flex items-center justify-between border border-yellow-200 bg-yellow-50 rounded-lg px-4 py-3">
            <span className="font-medium text-yellow-800">Overweight</span>
            <span className="text-yellow-700 font-semibold">25.0 – 29.9</span>
          </div>
          <div className="flex items-center justify-between border border-orange-200 bg-orange-50 rounded-lg px-4 py-3">
            <span className="font-medium text-orange-800">Obese Class I</span>
            <span className="text-orange-700 font-semibold">30.0 – 34.9</span>
          </div>
          <div className="flex items-center justify-between border border-red-200 bg-red-50 rounded-lg px-4 py-3">
            <span className="font-medium text-red-800">Obese Class II</span>
            <span className="text-red-700 font-semibold">35.0 – 39.9</span>
          </div>
          <div className="flex items-center justify-between border border-red-300 bg-red-100 rounded-lg px-4 py-3">
            <span className="font-medium text-red-900">Obese Class III</span>
            <span className="text-red-800 font-semibold">40.0 and above</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          People in the <strong>severely underweight</strong> range face elevated risks of malnutrition, weakened immune function, and bone loss. The <strong>underweight</strong> category still warrants attention, as it can signal inadequate nutrition or an underlying medical condition. The <strong>normal weight</strong> range is associated with the lowest overall risk of chronic disease and the best long-term health outcomes.
        </p>
        <p className="text-gray-700 mb-4">
          On the higher end, <strong>overweight</strong> individuals have a moderately increased risk of developing conditions like type 2 diabetes, high blood pressure, and sleep apnea. <strong>Obese Class I</strong> carries a higher risk, while <strong>Class II</strong> and <strong>Class III</strong> (sometimes called morbid obesity) are associated with significantly elevated risks of cardiovascular disease, joint problems, and reduced life expectancy. If your BMI places you in any of these higher categories, working with a healthcare provider to develop a personalized plan is a smart first step.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">BMI Chart by Height and Weight</h2>
        <p className="text-gray-700 mb-4">
          The table below shows approximate BMI values for common height and weight combinations. Find your height on the left, then scan across to find the weight closest to yours. This gives you a quick reference without needing to plug numbers into the calculator every time.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left text-gray-700">Height</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">120 lbs</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">140 lbs</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">160 lbs</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">180 lbs</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">200 lbs</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">220 lbs</th>
                <th className="border border-gray-300 px-3 py-2 text-center text-gray-700">250 lbs</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 px-3 py-2 font-medium">5&apos;0&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">23.4</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">27.3</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">31.2</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">35.2</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">39.1</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">43.0</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">48.8</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">5&apos;2&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">21.9</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">25.6</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">29.3</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">32.9</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">36.6</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">40.3</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">45.7</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2 font-medium">5&apos;4&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">20.6</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">24.0</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">27.5</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">30.9</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">34.3</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">37.8</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">42.9</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">5&apos;6&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">19.4</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">22.6</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">25.8</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">29.1</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">32.3</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">35.5</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">40.4</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2 font-medium">5&apos;8&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">18.2</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">21.3</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">24.3</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">27.4</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">30.4</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">33.4</td><td className="border border-gray-300 px-3 py-2 text-center text-red-700">38.0</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">5&apos;10&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-blue-700">17.2</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">20.1</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">23.0</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">25.8</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">28.7</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">31.6</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">35.9</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2 font-medium">6&apos;0&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-blue-700">16.3</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">19.0</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">21.7</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">24.4</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">27.1</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">29.8</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">33.9</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">6&apos;2&quot;</td><td className="border border-gray-300 px-3 py-2 text-center text-blue-700">15.4</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">18.0</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">20.5</td><td className="border border-gray-300 px-3 py-2 text-center text-green-700">23.1</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">25.7</td><td className="border border-gray-300 px-3 py-2 text-center text-yellow-700">28.2</td><td className="border border-gray-300 px-3 py-2 text-center text-orange-700">32.1</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mb-4">
          Color coding makes it easy to spot the category at a glance: <span className="text-blue-700 font-medium">blue</span> means underweight, <span className="text-green-700 font-medium">green</span> is normal, <span className="text-yellow-700 font-medium">yellow</span> is overweight, <span className="text-orange-700 font-medium">orange</span> is obese class I, and <span className="text-red-700 font-medium">red</span> is obese class II or higher. Keep in mind these are approximations — for a precise result, use the calculator above.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Limitations of BMI</h2>
        <p className="text-gray-700 mb-4">
          BMI is a useful starting point, but it has real blind spots that are worth understanding. The biggest one is that BMI cannot tell the difference between muscle and fat. A 220-pound bodybuilder and a 220-pound sedentary person at the same height will get the exact same BMI, even though their health profiles are completely different. If you lift weights or play sports regularly, your BMI may overstate your actual health risk.
        </p>
        <p className="text-gray-700 mb-4">
          Age is another factor BMI doesn&apos;t account for well. Older adults naturally lose muscle mass and gain fat as they age, so an elderly person with a &quot;normal&quot; BMI might actually have a higher body fat percentage than the number suggests. On the flip side, children and teenagers are still growing, so their BMI needs to be interpreted using age- and sex-specific percentile charts rather than the standard adult categories.
        </p>
        <p className="text-gray-700 mb-4">
          Research has also shown that health risks at the same BMI can differ across ethnic groups. For example, studies indicate that people of South Asian descent may face higher cardiovascular risk at lower BMI values compared to people of European descent, while some Pacific Islander populations may carry less risk at higher BMI levels. This is one reason many health organizations are reconsidering universal BMI cutoffs.
        </p>
        <p className="text-gray-700 mb-4">
          Perhaps most importantly, BMI doesn&apos;t measure body fat directly. It&apos;s a proxy — a rough estimate based on height and weight alone. For a fuller picture of your health, consider tracking <strong>waist circumference</strong> (which captures dangerous visceral fat), <strong>body fat percentage</strong> (measured via calipers, DEXA scan, or bioelectrical impedance), or your <strong>waist-to-hip ratio</strong>. Our <Link href="/tools/body-fat-calculator" className="text-[#2563eb] underline hover:text-blue-800">body fat calculator</Link> can help you get a more nuanced assessment.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">BMI vs Body Fat Percentage</h2>
        <p className="text-gray-700 mb-4">
          BMI and body fat percentage both attempt to answer the same question — is your weight healthy? — but they go about it in very different ways. BMI uses only your height and weight, making it quick and free to calculate. Body fat percentage, on the other hand, measures how much of your total body weight comes from fat tissue versus lean mass (muscle, bone, water, organs). It&apos;s more accurate but requires specialized tools like skinfold calipers, a DEXA scan, or a bioelectrical impedance scale.
        </p>
        <p className="text-gray-700 mb-4">
          So when should you use which? BMI works well as a quick screening tool for the general population. If you&apos;re not particularly muscular and want a fast health check, BMI gives you a reasonable starting point. Body fat percentage is better for anyone who exercises regularly, carries above-average muscle, or wants a more precise understanding of their body composition. Athletes, in particular, should rely on body fat percentage rather than BMI.
        </p>
        <p className="text-gray-700 mb-4">
          Doctors still use BMI for a practical reason: it&apos;s simple, standardized, and backed by decades of population-level research linking it to disease risk. It doesn&apos;t require any equipment beyond a scale and a tape measure. That said, many physicians now use BMI as a starting point and follow up with additional measurements when needed. You can check your body composition using our <Link href="/tools/body-fat-calculator" className="text-[#2563eb] underline hover:text-blue-800">body fat calculator</Link> for a more complete picture.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How to Improve Your BMI</h2>
        <p className="text-gray-700 mb-4">
          If your BMI falls in the <strong>underweight</strong> range, the goal is to gain weight in a healthy way. Focus on eating a caloric surplus of 300 to 500 calories above your maintenance level each day, prioritizing nutrient-dense foods like lean proteins, whole grains, nuts, and healthy fats. Pair this with a strength training program to ensure you&apos;re building muscle rather than just adding fat. You can figure out your daily calorie needs using our <Link href="/tools/calorie-calculator" className="text-[#2563eb] underline hover:text-blue-800">calorie calculator</Link>.
        </p>
        <p className="text-gray-700 mb-4">
          If your BMI puts you in the <strong>overweight or obese</strong> categories, aim for a moderate caloric deficit of about 500 calories per day, which translates to roughly one pound of weight loss per week. Combine a balanced diet with both cardiovascular exercise (walking, cycling, swimming) and resistance training to preserve muscle mass while losing fat. Crash diets and extreme calorie restriction tend to backfire — slow and steady wins the race. Most health professionals recommend losing no more than 1 to 2 pounds per week for sustainable results.
        </p>
        <p className="text-gray-700 mb-4">
          No matter which direction you need to move, knowing your baseline metabolic rate helps you set realistic targets. Our <Link href="/tools/bmr-calculator" className="text-[#2563eb] underline hover:text-blue-800">BMR calculator</Link> shows you how many calories your body burns at rest, giving you a foundation to build your nutrition plan around. And remember — small, consistent changes beat dramatic overhauls every time.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">BMI for Different Age Groups</h2>
        <p className="text-gray-700 mb-4">
          <strong>Children and teenagers (ages 2 to 19):</strong> Standard BMI categories don&apos;t apply to kids. Instead, pediatricians use BMI-for-age percentile charts that compare a child&apos;s BMI against others of the same age and sex. A child at the 85th percentile or above is considered overweight, while the 95th percentile and above indicates obesity. These percentile charts account for the fact that body composition changes significantly during growth and puberty.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Adults (ages 20 to 65):</strong> The standard BMI categories listed above apply to this group. This is the age range where most of the research linking BMI to health outcomes has been conducted. That said, your individual risk depends on many other factors — fitness level, diet quality, family history, and where you carry your weight all matter.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Seniors (ages 65 and older):</strong> Interestingly, research suggests that a slightly higher BMI — around 25 to 27 — may actually be protective for older adults. This is sometimes called the &quot;obesity paradox.&quot; The extra weight can provide reserves during illness and may help protect against bone fractures from falls. For seniors, being slightly overweight by standard BMI definitions is generally less concerning than being underweight, which is linked to increased frailty and mortality risk.
        </p>
      </section>

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

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
