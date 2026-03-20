"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
  { name: "TDEE Calculator", href: "/tools/tdee-calculator" },
  { name: "Macro Calculator", href: "/tools/macro-calculator" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "Ideal Weight Calculator", href: "/tools/ideal-weight-calculator" },
];

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Lightly active (1-3 days/week)", value: 1.375 },
  { label: "Moderately active (3-5 days/week)", value: 1.55 },
  { label: "Very active (6-7 days/week)", value: 1.725 },
  { label: "Extra active (very hard exercise or physical job)", value: 1.9 },
];

const LOSS_RATES = [
  { label: "0.5 lbs per week (slow & steady)", value: 0.5 },
  { label: "1 lb per week (recommended)", value: 1 },
  { label: "1.5 lbs per week (aggressive)", value: 1.5 },
  { label: "2 lbs per week (maximum safe rate)", value: 2 },
];

type Units = "imperial" | "metric";

interface Result {
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
  dailyDeficit: number;
  weeklyLossRate: number;
  weeksToGoal: number;
  weightToLose: number;
}

export default function CalorieDeficitCalculatorPage() {
  const [units, setUnits] = useState<Units>("imperial");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weightLbs, setWeightLbs] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [activity, setActivity] = useState(1.55);
  const [targetWeightLbs, setTargetWeightLbs] = useState("");
  const [targetWeightKg, setTargetWeightKg] = useState("");
  const [lossRate, setLossRate] = useState(1);
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const ageVal = parseFloat(age);
    let weightKgVal: number;
    let heightCmVal: number;
    let targetWeightKgVal: number;
    let currentWeightLbs: number;
    let targetLbs: number;

    if (units === "imperial") {
      currentWeightLbs = parseFloat(weightLbs);
      targetLbs = parseFloat(targetWeightLbs);
      weightKgVal = currentWeightLbs * 0.453592;
      targetWeightKgVal = targetLbs * 0.453592;
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
      heightCmVal = totalInches * 2.54;
    } else {
      weightKgVal = parseFloat(weightKg);
      targetWeightKgVal = parseFloat(targetWeightKg);
      currentWeightLbs = weightKgVal / 0.453592;
      targetLbs = targetWeightKgVal / 0.453592;
      heightCmVal = parseFloat(heightCm);
    }

    if (!ageVal || !weightKgVal || !heightCmVal || !targetWeightKgVal) return;
    if (weightKgVal <= 0 || heightCmVal <= 0 || targetWeightKgVal <= 0 || ageVal <= 0) return;
    if (targetLbs >= currentWeightLbs) return;

    // Mifflin-St Jeor equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageVal - 161;
    }

    const tdee = Math.round(bmr * activity);

    // 1 lb of fat = 3,500 calories
    const weeklyDeficit = lossRate * 3500;
    const dailyDeficit = Math.round(weeklyDeficit / 7);
    const dailyCalorieTarget = Math.max(tdee - dailyDeficit, gender === "male" ? 1500 : 1200);
    const actualDailyDeficit = tdee - dailyCalorieTarget;

    const weightToLose = Math.round((currentWeightLbs - targetLbs) * 10) / 10;
    const actualWeeklyLoss = (actualDailyDeficit * 7) / 3500;
    const weeksToGoal = actualWeeklyLoss > 0 ? Math.ceil(weightToLose / actualWeeklyLoss) : 0;

    setResult({
      bmr: Math.round(bmr),
      tdee,
      dailyCalorieTarget,
      dailyDeficit: actualDailyDeficit,
      weeklyLossRate: Math.round(actualWeeklyLoss * 10) / 10,
      weeksToGoal,
      weightToLose,
    });
  };

  const reset = () => {
    setAge("");
    setGender("male");
    setWeightLbs("");
    setWeightKg("");
    setHeightFt("");
    setHeightIn("");
    setHeightCm("");
    setActivity(1.55);
    setTargetWeightLbs("");
    setTargetWeightKg("");
    setLossRate(1);
    setResult(null);
  };

  const formatWeeks = (weeks: number) => {
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""}`;
    const months = Math.round(weeks / 4.33);
    if (months < 12) return `~${months} month${months !== 1 ? "s" : ""} (${weeks} weeks)`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `~${years} year${years !== 1 ? "s" : ""} (${weeks} weeks)`;
    return `~${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""} (${weeks} weeks)`;
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
                "name": "Calorie Deficit Calculator",
                "url": "https://calccanvas.com/tools/calorie-deficit-calculator",
                "applicationCategory": "HealthApplication",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Free calorie deficit calculator that uses the Mifflin-St Jeor equation to determine your daily calorie target for weight loss, TDEE, and estimated time to reach your goal weight."
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a calorie deficit?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A calorie deficit occurs when you consume fewer calories than your body burns in a day. This forces your body to use stored energy (primarily body fat) to make up the difference, leading to weight loss over time. A deficit of 500 calories per day results in roughly one pound of fat loss per week."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How big of a calorie deficit should I aim for?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most nutrition experts recommend a deficit of 500 to 1,000 calories per day, which translates to 1 to 2 pounds of weight loss per week. A moderate deficit of 500 calories per day is generally the most sustainable approach for most people."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is it safe to eat 1,200 calories per day?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For most women, 1,200 calories per day is generally considered the minimum safe intake without medical supervision. For most men, the minimum is around 1,500 calories. Eating below these thresholds can lead to nutrient deficiencies, muscle loss, and metabolic slowdown."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is my weight loss slower than expected?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Weight loss is rarely perfectly linear. Water retention, hormonal fluctuations, muscle gain from exercise, and metabolic adaptation can all cause plateaus or slower-than-expected progress. As you lose weight, your body requires fewer calories, so your deficit naturally shrinks unless you recalculate."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Should I recalculate my calorie deficit as I lose weight?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. As you lose weight, your BMR and TDEE decrease because your body has less mass to maintain. Recalculating every 10 to 15 pounds of weight loss ensures your calorie target stays accurate and you continue making progress."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Calorie Deficit Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your exact daily calorie target for weight loss. Enter your stats, goal weight, and preferred rate of loss to get a personalized plan with your TDEE, daily deficit, and estimated timeline.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              placeholder="e.g. 30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <div className="flex gap-2">
              <button onClick={() => setGender("male")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "male" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Male</button>
              <button onClick={() => setGender("female")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${gender === "female" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Female</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {units === "imperial" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="e.g. 200"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="e.g. 90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder="e.g. 178"
                />
              </div>
            </>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Weight ({units === "imperial" ? "lbs" : "kg"})
            </label>
            {units === "imperial" ? (
              <input
                type="number"
                value={targetWeightLbs}
                onChange={(e) => setTargetWeightLbs(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                placeholder="e.g. 160"
              />
            ) : (
              <input
                type="number"
                value={targetWeightKg}
                onChange={(e) => setTargetWeightKg(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                placeholder="e.g. 72"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Weight Loss Rate</label>
            <select
              value={lossRate}
              onChange={(e) => setLossRate(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            >
              {LOSS_RATES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Calculate Deficit
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-center mb-4">Your Calorie Deficit Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
              <div className="text-3xl font-bold text-[#2563eb]">{result.tdee.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Maintenance Calories (TDEE)</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600">{result.dailyCalorieTarget.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Daily Calorie Target</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-orange-200">
              <div className="text-3xl font-bold text-orange-600">-{result.dailyDeficit.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Daily Deficit</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-800">{result.weeklyLossRate} lbs/wk</div>
              <div className="text-sm text-gray-600 mt-1">Weekly Weight Loss</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-800">{result.weightToLose} lbs</div>
              <div className="text-sm text-gray-600 mt-1">Total Weight to Lose</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-800">{formatWeeks(result.weeksToGoal)}</div>
              <div className="text-sm text-gray-600 mt-1">Estimated Time to Goal</div>
            </div>
          </div>
          {result.dailyCalorieTarget <= (gender === "male" ? 1500 : 1200) && (
            <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 text-sm">
              <strong>Note:</strong> Your calorie target has been adjusted to the minimum safe intake ({gender === "male" ? "1,500" : "1,200"} cal/day). The actual deficit is smaller than requested, which means it will take longer to reach your goal. Consider increasing your activity level or choosing a slower weight loss rate.
            </p>
          )}
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select your preferred unit system (Imperial or Metric).</li>
          <li>Enter your age, sex, current weight, and height.</li>
          <li>Choose your typical activity level from the dropdown.</li>
          <li>Enter your target weight and your desired rate of weight loss.</li>
          <li>Click &quot;Calculate Deficit&quot; to see your personalized calorie deficit plan.</li>
          <li>Use the &quot;Reset&quot; button to clear all fields and start over.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700 mb-4">
          This calorie deficit calculator uses the <strong>Mifflin-St Jeor equation</strong>, widely regarded as the most accurate formula for estimating Basal Metabolic Rate (BMR). For men: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) - 5 &times; age + 5. For women: BMR = 10 &times; weight(kg) + 6.25 &times; height(cm) - 5 &times; age - 161. Your BMR is then multiplied by an activity factor to determine your Total Daily Energy Expenditure (TDEE) — the total number of calories you burn each day.
        </p>
        <p className="text-gray-700">
          To lose weight, you need to eat fewer calories than you burn. Since one pound of body fat stores approximately 3,500 calories, a daily deficit of 500 calories leads to roughly one pound of weight loss per week. The calculator subtracts the appropriate amount from your TDEE based on your chosen rate, while enforcing a minimum safe intake of 1,500 calories for men and 1,200 calories for women.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Calorie Deficit?</h2>
        <p className="text-gray-700 mb-4">
          A calorie deficit is the difference between the number of calories your body uses each day and the number of calories you actually eat. When you consistently eat fewer calories than you burn, your body taps into its stored energy reserves — primarily body fat — to make up the gap. Over time, this energy imbalance leads to weight loss.
        </p>
        <p className="text-gray-700 mb-4">
          Think of it like a bank account. Your TDEE is your daily spending, and the food you eat is your income. If you spend more than you earn, you dip into your savings (stored fat). A calorie deficit calculator helps you figure out exactly how much less you need to eat to reach your goal weight at a pace that is both safe and sustainable.
        </p>
        <p className="text-gray-700 mb-4">
          The size of your deficit determines how fast you lose weight. A small deficit of 250 calories per day produces slow, steady weight loss of about half a pound per week. A moderate deficit of 500 calories per day — the most commonly recommended approach — leads to about one pound per week. Larger deficits of 750 to 1,000 calories per day can produce faster results of 1.5 to 2 pounds per week, but they are harder to sustain and carry a higher risk of muscle loss, nutrient deficiencies, and metabolic adaptation.
        </p>
        <p className="text-gray-700 mb-4">
          The key to a successful calorie deficit is finding the sweet spot where you lose fat at a reasonable pace while still having enough energy to exercise, think clearly, and go about your daily life without feeling miserable. Most dietitians and sports nutritionists recommend aiming for a deficit that produces 0.5 to 1 percent of your body weight in weekly loss, with 1 pound per week being a solid target for most people.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How to Create a Calorie Deficit</h2>
        <p className="text-gray-700 mb-4">
          There are three fundamental ways to create a calorie deficit, and the most effective approach usually combines all three.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>1. Eat fewer calories.</strong> This is the most direct method. Reducing your daily intake by 300 to 500 calories is usually achievable without dramatic changes. Simple swaps — choosing water over soda, grilled chicken over fried, or a side salad instead of fries — can add up quickly. Tracking your food intake for a few weeks using a food diary or app helps you identify where extra calories are sneaking in.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>2. Increase physical activity.</strong> Exercise burns additional calories, widening your deficit without requiring you to eat less. A 30-minute brisk walk burns roughly 150 to 200 calories, while a 45-minute weight training session can burn 200 to 400 calories depending on intensity. The added benefit of exercise is that it preserves lean muscle mass, which keeps your metabolism healthy as you lose weight.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>3. Increase your NEAT.</strong> Non-Exercise Activity Thermogenesis (NEAT) refers to all the calories you burn through daily movement that is not formal exercise — walking to the store, fidgeting, taking the stairs, doing household chores, and standing instead of sitting. Research shows that NEAT can vary by up to 2,000 calories per day between individuals and is one of the most underestimated factors in weight management.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Calorie Deficit and Weight Loss: What the Science Says</h2>
        <p className="text-gray-700 mb-4">
          The principle behind calorie deficits is rooted in the first law of thermodynamics: energy cannot be created or destroyed, only transferred. When your body receives less energy from food than it needs to function, it draws on stored energy — glycogen first, then body fat, and to a lesser extent, muscle protein. This is the mechanism behind every successful weight loss diet, regardless of whether it emphasizes low carb, low fat, intermittent fasting, or any other approach.
        </p>
        <p className="text-gray-700 mb-4">
          A landmark study published in the <em>New England Journal of Medicine</em> compared four diets with varying proportions of fat, protein, and carbohydrates. The researchers found that the total calorie deficit — not the macronutrient ratio — was the primary driver of weight loss. All groups lost similar amounts of weight as long as they maintained similar calorie deficits, reinforcing the idea that the best diet is one you can actually stick to.
        </p>
        <p className="text-gray-700 mb-4">
          That said, not all calories are equal when it comes to satiety, muscle preservation, and overall health. Higher protein intakes (0.7 to 1 gram per pound of body weight) have been shown to reduce hunger, preserve lean mass during a deficit, and increase the thermic effect of food — the calories your body burns just digesting protein. Fiber-rich foods like vegetables, whole grains, and legumes also help you feel full on fewer calories. Building your deficit around these foods makes the process significantly more manageable.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is a calorie deficit?</h3>
        <p className="text-gray-700 mb-4">
          A calorie deficit occurs when you consume fewer calories than your body burns in a day. This forces your body to use stored energy (primarily body fat) to make up the difference, leading to weight loss over time. A deficit of 500 calories per day results in roughly one pound of fat loss per week, since one pound of fat stores about 3,500 calories.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How big of a calorie deficit should I aim for?</h3>
        <p className="text-gray-700 mb-4">
          Most nutrition experts recommend a deficit of 500 to 1,000 calories per day, which translates to 1 to 2 pounds of weight loss per week. A moderate deficit of 500 calories per day is generally the most sustainable approach for most people. Going too aggressive with your deficit increases the risk of muscle loss, fatigue, nutrient deficiencies, and binge eating. If you have a lot of weight to lose, a larger deficit may be safe initially, but you should transition to a moderate deficit as you get closer to your goal.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is it safe to eat 1,200 calories per day?</h3>
        <p className="text-gray-700 mb-4">
          For most women, 1,200 calories per day is generally considered the minimum safe intake without medical supervision. For most men, the minimum is around 1,500 calories per day. Eating below these thresholds can lead to nutrient deficiencies, muscle loss, hair thinning, hormonal disruptions, and metabolic slowdown. If this calculator suggests a target near these minimums, consider a slower rate of weight loss or increasing your activity level to create a larger deficit without eating less.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why is my weight loss slower than expected?</h3>
        <p className="text-gray-700 mb-4">
          Weight loss is rarely perfectly linear. Water retention from sodium intake, hormonal fluctuations (especially around menstrual cycles), muscle gain from resistance training, and metabolic adaptation can all cause the scale to stall or fluctuate. Additionally, as you lose weight your body requires fewer calories to maintain itself, so your deficit naturally shrinks unless you recalculate. Focus on the overall trend over weeks and months rather than day-to-day changes.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Should I recalculate my calorie deficit as I lose weight?</h3>
        <p className="text-gray-700 mb-4">
          Yes, absolutely. As you lose weight, your BMR and TDEE both decrease because your body has less mass to maintain. Recalculating every 10 to 15 pounds of weight loss ensures your calorie target stays accurate and you continue making progress. Come back to this calculator periodically with your updated weight to get a refreshed plan.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-4">
          Consider a 35-year-old female who weighs 180 lbs (81.6 kg), stands 5&apos;5&quot; (165.1 cm), exercises 3 to 5 days per week (moderately active), and wants to reach a target weight of 145 lbs at a rate of 1 lb per week.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 1 — Calculate BMR:</strong> Using the Mifflin-St Jeor equation for women: BMR = 10 &times; 81.6 + 6.25 &times; 165.1 - 5 &times; 35 - 161 = 816 + 1,032 - 175 - 161 = <strong>1,512 calories/day</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 2 — Calculate TDEE:</strong> Multiply BMR by the moderate activity factor: 1,512 &times; 1.55 = <strong>2,344 calories/day</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 3 — Apply deficit:</strong> To lose 1 lb per week, subtract 500 calories: 2,344 - 500 = <strong>1,844 calories/day</strong>.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Step 4 — Estimate timeline:</strong> She needs to lose 35 lbs total. At 1 lb per week, that is approximately <strong>35 weeks (about 8 months)</strong> to reach her goal weight of 145 lbs.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Calorie Deficit Tips for Success</h2>
        <p className="text-gray-700 mb-4">
          <strong>Prioritize protein.</strong> Eating enough protein (0.7 to 1 gram per pound of body weight) helps you feel full, preserves muscle mass during a deficit, and boosts your metabolism through the thermic effect of food. Lean meats, fish, eggs, Greek yogurt, and legumes are all excellent sources.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Eat plenty of fiber.</strong> High-fiber foods like vegetables, fruits, whole grains, and beans add volume to your meals without adding many calories. Fiber slows digestion and helps stabilize blood sugar, reducing cravings and keeping you satisfied between meals.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Don&apos;t drink your calories.</strong> Liquid calories from soda, juice, fancy coffee drinks, and alcohol add up fast and do very little to keep you full. Switching to water, black coffee, and unsweetened tea can easily save 200 to 500 calories per day for many people.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Lift weights.</strong> Resistance training is arguably the most important type of exercise during a calorie deficit. It sends a signal to your body to hold onto muscle, ensuring that most of the weight you lose comes from fat rather than lean tissue. Aim for at least 2 to 3 strength training sessions per week.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Sleep 7 to 9 hours.</strong> Poor sleep increases hunger hormones (ghrelin), decreases satiety hormones (leptin), and impairs decision-making — a triple threat for anyone trying to maintain a calorie deficit. Prioritizing sleep is one of the most underrated weight loss strategies.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Calorie Deficit Mistakes</h2>
        <p className="text-gray-700 mb-4">
          <strong>Going too aggressive too fast.</strong> Cutting calories dramatically might produce quick results on the scale, but much of that initial weight is water and glycogen, not fat. Extreme deficits also trigger stronger hunger signals, increase cortisol, and can lead to binge-restrict cycles. A moderate, sustainable deficit always wins in the long run.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Not tracking accurately.</strong> Studies consistently show that people underestimate their calorie intake by 30 to 50 percent. Eyeballing portions, forgetting cooking oils, and not counting drinks or snacks are common culprits. Using a food scale and logging everything — at least for a few weeks — gives you the awareness needed to stay on track.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Ignoring metabolic adaptation.</strong> Your body responds to prolonged dieting by reducing energy expenditure through decreased NEAT, lower thyroid hormone output, and improved metabolic efficiency. This is why weight loss plateaus are so common. Periodic diet breaks (eating at maintenance for 1 to 2 weeks) can help offset some of this adaptation and make long-term dieting more sustainable.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Focusing only on the scale.</strong> Body weight fluctuates by 2 to 5 pounds daily due to water, food volume, and glycogen stores. If you are strength training, you may be gaining muscle while losing fat, which can mask progress on the scale. Track progress using measurements, progress photos, how your clothes fit, and your strength levels in the gym — not just body weight.
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
