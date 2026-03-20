"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
  { name: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
];

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Lightly active (1-3 days/week)", value: 1.375 },
  { label: "Moderately active (3-5 days/week)", value: 1.55 },
  { label: "Very active (6-7 days/week)", value: 1.725 },
  { label: "Extra active (very hard exercise)", value: 1.9 },
];

const GOALS = [
  { label: "Lose Weight", value: "lose" },
  { label: "Maintain Weight", value: "maintain" },
  { label: "Gain Muscle", value: "gain" },
];

const UNIT_SYSTEMS = [
  { label: "Imperial (lbs, ft/in)", value: "imperial" },
  { label: "Metric (kg, cm)", value: "metric" },
];

interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  tdee: number;
  bmr: number;
}

export default function MacroCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [units, setUnits] = useState("imperial");
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState("lose");
  const [result, setResult] = useState<MacroResult | null>(null);

  const calculate = () => {
    const ageVal = parseFloat(age);
    let weightKg: number;
    let heightCmVal: number;

    if (units === "imperial") {
      weightKg = parseFloat(weight) * 0.453592;
      heightCmVal = (parseFloat(heightFt) * 12 + parseFloat(heightIn || "0")) * 2.54;
    } else {
      weightKg = parseFloat(weight);
      heightCmVal = parseFloat(heightCm);
    }

    if (!ageVal || !weightKg || !heightCmVal) return;

    // Mifflin-St Jeor equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCmVal - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCmVal - 5 * ageVal - 161;
    }

    const tdee = Math.round(bmr * activity);

    // Apply calorie adjustment based on goal
    let calories: number;
    let proteinPct: number;
    let carbsPct: number;
    let fatPct: number;

    if (goal === "lose") {
      calories = tdee - 500;
      proteinPct = 40;
      carbsPct = 30;
      fatPct = 30;
    } else if (goal === "gain") {
      calories = tdee + 500;
      proteinPct = 30;
      carbsPct = 40;
      fatPct = 30;
    } else {
      calories = tdee;
      proteinPct = 30;
      carbsPct = 40;
      fatPct = 30;
    }

    // Calculate grams: protein = 4 cal/g, carbs = 4 cal/g, fat = 9 cal/g
    const protein = Math.round((calories * (proteinPct / 100)) / 4);
    const carbs = Math.round((calories * (carbsPct / 100)) / 4);
    const fat = Math.round((calories * (fatPct / 100)) / 9);

    setResult({
      calories: Math.round(calories),
      protein,
      carbs,
      fat,
      proteinPct,
      carbsPct,
      fatPct,
      tdee,
      bmr: Math.round(bmr),
    });
  };

  const reset = () => {
    setAge("");
    setGender("male");
    setWeight("");
    setHeightFt("");
    setHeightIn("");
    setHeightCm("");
    setUnits("imperial");
    setActivity(1.55);
    setGoal("lose");
    setResult(null);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Macro Calculator",
                "url": "https://calccanvas.com/tools/macro-calculator",
                "applicationCategory": "HealthApplication",
                "operatingSystem": "All",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Free macro calculator that estimates your daily protein, carbs, and fat intake based on your body stats, activity level, and fitness goal."
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are macros and why do they matter?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Macros, short for macronutrients, are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each plays a unique role in energy production, muscle repair, hormone function, and overall health. Tracking macros helps you control body composition more precisely than counting calories alone."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is this macro calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating calorie needs in most healthy adults. The macro split is based on widely accepted sports nutrition guidelines. Use the results as a starting point and adjust based on your progress over 2 to 4 weeks."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the best macro ratio for weight loss?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A common and effective macro ratio for weight loss is 40% protein, 30% carbs, and 30% fat. The higher protein intake helps preserve muscle mass during a calorie deficit, keeps you feeling full, and supports a higher thermic effect of food."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Should I track macros or just calories?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Tracking macros gives you more control over your body composition than tracking calories alone. Two people eating the same number of calories can get very different results depending on how those calories are split between protein, carbs, and fat. If your goal is to build muscle or get lean, tracking macros is worth the extra effort."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much protein do I need per day?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most research suggests 0.7 to 1.0 grams of protein per pound of body weight for active individuals. If you are in a calorie deficit, aiming for the higher end helps preserve muscle. This calculator factors protein needs into your total calorie target based on your goal."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Macro Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your optimal daily macronutrient intake for protein, carbs, and fat based on your body stats, activity level, and fitness goal. Powered by the Mifflin-St Jeor equation.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Unit System */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit System</label>
          <div className="flex gap-2">
            {UNIT_SYSTEMS.map((u) => (
              <button key={u.value} onClick={() => setUnits(u.value)} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${units === u.value ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {u.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <div className="flex gap-2">
              <button onClick={() => setGender("male")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "male" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Male</button>
              <button onClick={() => setGender("female")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "female" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Female</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight ({units === "imperial" ? "lbs" : "kg"})</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder={units === "imperial" ? "e.g. 170" : "e.g. 77"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            {units === "imperial" ? (
              <div className="flex gap-2">
                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="ft" />
                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="in" />
              </div>
            ) : (
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 175" />
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
          <div className="flex gap-2">
            {GOALS.map((g) => (
              <button key={g.value} onClick={() => setGoal(g.value)} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${goal === g.value ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={calculate} className="flex-1 bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Calculate Macros
          </button>
          <button onClick={reset} className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
            Reset
          </button>
        </div>
      </div>

      {result && (
        <>
          {/* Calorie Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Your Daily Target</div>
            <div className="text-4xl font-bold text-[#2563eb]">{result.calories.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">calories per day</div>
            <div className="text-xs text-gray-400 mt-2">BMR: {result.bmr.toLocaleString()} cal &middot; TDEE: {result.tdee.toLocaleString()} cal</div>
          </div>

          {/* Macro Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center">
              <div className="text-3xl font-bold text-red-600">{result.protein}g</div>
              <div className="text-sm text-gray-600 mt-1">Protein</div>
              <div className="text-xs text-gray-400">{result.proteinPct}% &middot; {result.protein * 4} cal</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 text-center">
              <div className="text-3xl font-bold text-yellow-600">{result.carbs}g</div>
              <div className="text-sm text-gray-600 mt-1">Carbs</div>
              <div className="text-xs text-gray-400">{result.carbsPct}% &middot; {result.carbs * 4} cal</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
              <div className="text-3xl font-bold text-green-600">{result.fat}g</div>
              <div className="text-sm text-gray-600 mt-1">Fat</div>
              <div className="text-xs text-gray-400">{result.fatPct}% &middot; {result.fat * 9} cal</div>
            </div>
          </div>

          {/* Visual Percentage Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Macro Split</div>
            <div className="flex rounded-full overflow-hidden h-6">
              <div className="bg-red-400 flex items-center justify-center text-white text-xs font-medium" style={{ width: `${result.proteinPct}%` }}>
                {result.proteinPct}%
              </div>
              <div className="bg-yellow-400 flex items-center justify-center text-white text-xs font-medium" style={{ width: `${result.carbsPct}%` }}>
                {result.carbsPct}%
              </div>
              <div className="bg-green-400 flex items-center justify-center text-white text-xs font-medium" style={{ width: `${result.fatPct}%` }}>
                {result.fatPct}%
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> Protein</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span> Carbs</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Fat</span>
            </div>
          </div>
        </>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select your preferred unit system (Imperial or Metric).</li>
          <li>Enter your age, sex, weight, and height.</li>
          <li>Choose your typical activity level from the dropdown.</li>
          <li>Select your goal: lose weight, maintain weight, or gain muscle.</li>
          <li>Click &quot;Calculate Macros&quot; to see your daily calorie and macronutrient targets.</li>
          <li>Use the protein, carb, and fat gram targets to plan your meals.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700 mb-4">
          This macro calculator uses a two-step process. First, it estimates your <strong>Basal Metabolic Rate (BMR)</strong> using the Mifflin-St Jeor equation, which is widely regarded as the most accurate formula for healthy adults.
          For men: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) &minus; 5 &times; age + 5.
          For women: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) &minus; 5 &times; age &minus; 161.
        </p>
        <p className="text-gray-700 mb-4">
          Next, the BMR is multiplied by an activity factor to calculate your <strong>Total Daily Energy Expenditure (TDEE)</strong>. Based on your selected goal, calories are adjusted by +/&minus; 500 per day (roughly 1 lb per week). Finally, those calories are split into protein, carbs, and fat using goal-specific macro ratios and converted to grams using standard caloric values: 4 calories per gram of protein, 4 calories per gram of carbs, and 9 calories per gram of fat.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Macro Calculator?</h2>
        <p className="text-gray-700 mb-4">
          A macro calculator is a nutrition tool that breaks your daily calorie target into specific grams of protein, carbohydrates, and fat. While a calorie calculator tells you <em>how much</em> to eat, a macro calculator tells you <em>what</em> to eat. This distinction matters because body composition — how much muscle versus fat you carry — depends heavily on the quality and ratio of the food you consume, not just the total calories.
        </p>
        <p className="text-gray-700 mb-4">
          Macronutrients are the three categories of nutrients your body needs in large quantities. <strong>Protein</strong> is essential for muscle repair, immune function, and satiety. Each gram provides 4 calories. <strong>Carbohydrates</strong> are your body&apos;s primary energy source, fueling both high-intensity exercise and brain function at 4 calories per gram. <strong>Fat</strong> supports hormone production, vitamin absorption, and cell membrane integrity at 9 calories per gram.
        </p>
        <p className="text-gray-700 mb-4">
          The concept behind tracking macros, sometimes called &quot;flexible dieting&quot; or &quot;IIFYM&quot; (If It Fits Your Macros), is that you can eat a variety of foods as long as you hit your daily protein, carb, and fat targets. This approach gives you more dietary freedom than rigid meal plans while still driving results. Studies consistently show that people who track macros achieve better body composition outcomes than those who rely on calorie counting alone, largely because adequate protein intake preserves lean muscle mass during weight loss and supports muscle growth during a surplus.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Macro Ratios Explained</h2>
        <p className="text-gray-700 mb-4">
          The macro split you use depends on your primary goal. There is no single &quot;best&quot; ratio, but research and sports nutrition practice have established reliable starting points.
        </p>
        <h3 className="text-lg font-medium mt-4 mb-2">Weight Loss (40/30/30 — Protein/Carbs/Fat)</h3>
        <p className="text-gray-700 mb-4">
          A higher protein ratio during a calorie deficit helps preserve muscle mass, increases the thermic effect of food (your body burns more calories digesting protein), and keeps you feeling full longer. The moderate carb and fat portions ensure you still have energy for workouts and support essential body functions.
        </p>
        <h3 className="text-lg font-medium mt-4 mb-2">Maintenance &amp; Muscle Gain (30/40/30 — Protein/Carbs/Fat)</h3>
        <p className="text-gray-700 mb-4">
          When you are eating at maintenance or in a calorie surplus for muscle gain, a higher carb ratio fuels intense training and replenishes glycogen stores. Protein remains high enough to support muscle protein synthesis, and fat provides the calories and hormonal support needed for recovery and growth.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What are macros and why do they matter?</h3>
        <p className="text-gray-700 mb-4">
          Macros, short for macronutrients, are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each plays a unique role in energy production, muscle repair, hormone function, and overall health. Tracking macros helps you control body composition more precisely than counting calories alone because two diets with identical calorie counts can produce very different results depending on the macro breakdown.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How accurate is this macro calculator?</h3>
        <p className="text-gray-700 mb-4">
          This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating calorie needs in most healthy adults. The macro split is based on widely accepted sports nutrition guidelines. However, individual factors like genetics, muscle mass, metabolic health, and stress levels can influence your actual needs. Use the results as a starting point and adjust based on your progress over 2 to 4 weeks.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the best macro ratio for weight loss?</h3>
        <p className="text-gray-700 mb-4">
          A common and effective macro ratio for weight loss is 40% protein, 30% carbs, and 30% fat. The higher protein intake helps preserve muscle mass during a calorie deficit, keeps you feeling full, and supports a higher thermic effect of food. That said, the most important factor for weight loss is maintaining a calorie deficit consistently. The macro ratio optimizes your results within that deficit.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Should I track macros or just calories?</h3>
        <p className="text-gray-700 mb-4">
          Tracking macros gives you more control over your body composition than tracking calories alone. Two people eating the same number of calories can get very different results depending on how those calories are split between protein, carbs, and fat. If your goal is to build muscle, get lean, or improve athletic performance, tracking macros is worth the extra effort. If you just want general weight management, calorie tracking may be sufficient.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How much protein do I need per day?</h3>
        <p className="text-gray-700 mb-4">
          Most research suggests 0.7 to 1.0 grams of protein per pound of body weight for active individuals. If you are in a calorie deficit, aiming for the higher end helps preserve muscle. For sedentary adults, the minimum recommendation is about 0.36 grams per pound, but most nutrition experts agree this is too low for anyone with fitness goals. This calculator factors protein needs into your total calorie target based on your selected goal.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-4">
          Consider a 28-year-old female who weighs 150 lbs (68 kg), stands 5&apos;6&quot; (167.6 cm), exercises 3 to 5 days per week (moderately active), and wants to lose weight.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 1 — BMR:</strong> Using the Mifflin-St Jeor equation for women: 10 &times; 68 + 6.25 &times; 167.6 &minus; 5 &times; 28 &minus; 161 = 680 + 1,048 &minus; 140 &minus; 161 = <strong>1,427 calories/day</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 2 — TDEE:</strong> Multiply BMR by the moderate activity factor: 1,427 &times; 1.55 = <strong>2,212 calories/day</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 3 — Calorie Target:</strong> Subtract 500 calories for weight loss: 2,212 &minus; 500 = <strong>1,712 calories/day</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 4 — Macros (40/30/30):</strong> Protein = 1,712 &times; 0.40 &divide; 4 = <strong>171g</strong>. Carbs = 1,712 &times; 0.30 &divide; 4 = <strong>128g</strong>. Fat = 1,712 &times; 0.30 &divide; 9 = <strong>57g</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          She would aim for roughly 1,712 calories per day, split into 171g of protein, 128g of carbs, and 57g of fat. These targets give her a solid foundation for losing about one pound per week while preserving lean muscle mass.
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
