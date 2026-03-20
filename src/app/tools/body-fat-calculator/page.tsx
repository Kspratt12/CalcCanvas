"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "Ideal Weight Calculator", href: "/tools/ideal-weight-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
];

function getCategory(bf: number, gender: "male" | "female") {
  if (gender === "male") {
    if (bf < 6) return "Essential Fat";
    if (bf < 14) return "Athletes";
    if (bf < 18) return "Fitness";
    if (bf < 25) return "Average";
    return "Obese";
  } else {
    if (bf < 14) return "Essential Fat";
    if (bf < 21) return "Athletes";
    if (bf < 25) return "Fitness";
    if (bf < 32) return "Average";
    return "Obese";
  }
}

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [height, setHeight] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<{
    bodyFat: number;
    fatMass: number;
    leanMass: number;
    category: string;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const waistIn = parseFloat(waist);
    const neckIn = parseFloat(neck);
    const heightIn = parseFloat(height);
    const hipIn = parseFloat(hip);

    if (!w || !waistIn || !neckIn || !heightIn) return;
    if (gender === "female" && !hipIn) return;

    let bodyFat: number;

    if (gender === "male") {
      bodyFat =
        86.01 * Math.log10(waistIn - neckIn) -
        70.041 * Math.log10(heightIn) +
        36.76;
    } else {
      bodyFat =
        163.205 * Math.log10(waistIn + hipIn - neckIn) -
        97.684 * Math.log10(heightIn) -
        78.387;
    }

    bodyFat = Math.round(bodyFat * 10) / 10;
    const fatMass = Math.round((w * bodyFat) / 100 * 10) / 10;
    const leanMass = Math.round((w - fatMass) * 10) / 10;
    const category = getCategory(bodyFat, gender);

    setResult({ bodyFat, fatMass, leanMass, category });
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
                "name": "How accurate is the US Navy body fat method?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The US Navy method is generally accurate within 1 to 3 percent of more advanced methods like DEXA scans for most people. It tends to be slightly less precise for very lean or very overweight individuals."
                }
              },
              {
                "@type": "Question",
                "name": "Where exactly should I measure my waist?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For the US Navy formula, measure your waist at the level of your navel (belly button), keeping the tape snug but not compressing the skin. Take the measurement at the end of a normal exhale."
                }
              },
              {
                "@type": "Question",
                "name": "What is a healthy body fat percentage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For men, 14 to 24 percent is generally considered healthy, while for women, 21 to 31 percent falls within the healthy range. Athletes and very active individuals often have lower percentages."
                }
              },
              {
                "@type": "Question",
                "name": "Is body fat percentage better than BMI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Body fat percentage gives you more useful information because it accounts for the difference between fat and muscle. Someone with a \"normal\" BMI could still carry excess visceral fat, while a muscular person might have a high BMI but low body fat."
                }
              },
              {
                "@type": "Question",
                "name": "How can I lower my body fat percentage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most effective approach combines a moderate calorie deficit with strength training to preserve muscle mass. Aim to lose 0.5 to 1 percent of body fat per month for sustainable results."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Body Fat Calculator</h1>
      <p className="text-gray-600 mb-6">
        Estimate your body fat percentage using the US Navy method based on simple body measurements.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 180" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (inches)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 70" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waist (inches)</label>
            <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="at navel" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Neck (inches)</label>
            <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="below larynx" />
          </div>
          {gender === "female" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hip (inches)</label>
              <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="at widest point" />
            </div>
          )}
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate Body Fat
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#2563eb]">{result.bodyFat}%</div>
              <div className="text-sm text-gray-600 mt-1">Body Fat</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2563eb]">{result.category}</div>
              <div className="text-sm text-gray-600 mt-1">Category</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2563eb]">{result.fatMass} lbs</div>
              <div className="text-sm text-gray-600 mt-1">Fat Mass</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2563eb]">{result.leanMass} lbs</div>
              <div className="text-sm text-gray-600 mt-1">Lean Mass</div>
            </div>
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select your gender and enter your weight and height.</li>
          <li>Measure your waist at the navel and neck just below the larynx.</li>
          <li>Women should also measure their hips at the widest point.</li>
          <li>Click &quot;Calculate Body Fat&quot; to see your results.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          This calculator uses the <strong>US Navy body fat formula</strong>. For men: %BF = 86.010 &times; log10(waist - neck) - 70.041 &times; log10(height) + 36.76. For women: %BF = 163.205 &times; log10(waist + hip - neck) - 97.684 &times; log10(height) - 78.387. All measurements are in inches. This method provides a reasonable estimate without specialized equipment.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is Body Fat Percentage?</h2>
        <p className="text-gray-700 mb-4">
          Body fat percentage is the proportion of your total body weight that is made up of fat tissue. Unlike BMI, which only considers weight and height, body fat percentage gives you a much clearer picture of your body composition by separating fat mass from lean mass (muscles, bones, organs, and water). Two people can weigh the same but have very different body fat levels, which is why this metric is so valuable.
        </p>
        <p className="text-gray-700 mb-4">
          For men, essential body fat (the minimum needed for basic health) is around 2 to 5 percent, while for women it&apos;s 10 to 13 percent due to reproductive and hormonal needs. Athletes typically carry 6 to 13 percent (men) or 14 to 20 percent (women). A &quot;fitness&quot; level ranges from 14 to 17 percent for men and 21 to 24 percent for women. Knowing your body fat percentage helps you set realistic fitness goals and track progress more meaningfully than stepping on a scale alone. The US Navy method used here provides a solid estimate using just a tape measure, making it accessible to anyone at home.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How accurate is the US Navy body fat method?</h3>
        <p className="text-gray-700 mb-4">
          The US Navy method is generally accurate within 1 to 3 percent of more advanced methods like DEXA scans for most people. It tends to be slightly less precise for very lean or very overweight individuals. For consistent tracking over time, it works well as long as you measure at the same spots each time.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Where exactly should I measure my waist?</h3>
        <p className="text-gray-700 mb-4">
          For the US Navy formula, measure your waist at the level of your navel (belly button), keeping the tape snug but not compressing the skin. Take the measurement at the end of a normal exhale. For the most consistent results, measure first thing in the morning before eating or drinking.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is a healthy body fat percentage?</h3>
        <p className="text-gray-700 mb-4">
          For men, 14 to 24 percent is generally considered healthy, while for women, 21 to 31 percent falls within the healthy range. Athletes and very active individuals often have lower percentages. Going below essential fat levels (under 5% for men, under 13% for women) can cause serious health problems.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is body fat percentage better than BMI?</h3>
        <p className="text-gray-700 mb-4">
          Body fat percentage gives you more useful information because it accounts for the difference between fat and muscle. Someone with a &quot;normal&quot; BMI could still carry excess visceral fat, while a muscular person might have a high BMI but low body fat. Ideally, use both measurements together for a fuller health picture.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How can I lower my body fat percentage?</h3>
        <p className="text-gray-700 mb-4">
          The most effective approach combines a moderate calorie deficit with strength training to preserve muscle mass. Aim to lose 0.5 to 1 percent of body fat per month for sustainable results. Crash diets tend to cause muscle loss along with fat loss, which actually raises your body fat percentage relative to your total weight.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-4">
          Take a 180 lb male who is 70 inches tall with a 34-inch waist and a 15.5-inch neck. Using the US Navy formula: %BF = 86.010 &times; log10(34 - 15.5) - 70.041 &times; log10(70) + 36.76 = 86.010 &times; log10(18.5) - 70.041 &times; log10(70) + 36.76 = 86.010 &times; 1.267 - 70.041 &times; 1.845 + 36.76 = 108.97 - 129.23 + 36.76 = <strong>16.5%</strong> body fat. That puts him in the &quot;Fitness&quot; category. His fat mass would be about 29.7 lbs and lean mass about 150.3 lbs.
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
