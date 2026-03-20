'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TDEE Calculator',
  url: 'https://calcanvas.com/tools/tdee-calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  description:
    'Calculate your Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor equation. Get your BMR, maintenance calories, and targets for weight loss or gain.',
};

const activityLevels = [
  { label: 'Sedentary (office job, little exercise)', value: 1.2 },
  { label: 'Lightly Active (light exercise 1-3 days/week)', value: 1.375 },
  { label: 'Moderately Active (moderate exercise 3-5 days/week)', value: 1.55 },
  { label: 'Very Active (hard exercise 6-7 days/week)', value: 1.725 },
  { label: 'Extremely Active (athlete or physical job + training)', value: 1.9 },
];

export default function TDEECalculator() {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    extremeLoss: number;
    loss: number;
    mildLoss: number;
    maintenance: number;
    mildGain: number;
    gain: number;
  } | null>(null);

  function calculate() {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);

    if (!ageNum || !weightNum) return;
    if (ageNum < 1 || ageNum > 120) return;

    // Convert weight to kg
    const weightKg = weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;

    // Convert height to cm
    let heightCmVal: number;
    if (heightUnit === 'imperial') {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      if (ft === 0 && inches === 0) return;
      heightCmVal = (ft * 12 + inches) * 2.54;
    } else {
      heightCmVal = parseFloat(heightCm) || 0;
      if (heightCmVal === 0) return;
    }

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (sex === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCmVal - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCmVal - 5 * ageNum - 161;
    }

    const tdee = bmr * activityLevel;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      extremeLoss: Math.round(tdee - 1000),
      loss: Math.round(tdee - 500),
      mildLoss: Math.round(tdee - 250),
      maintenance: Math.round(tdee),
      mildGain: Math.round(tdee + 250),
      gain: Math.round(tdee + 500),
    });
  }

  function reset() {
    setAge('');
    setSex('male');
    setWeightUnit('lbs');
    setWeight('');
    setHeightUnit('imperial');
    setHeightFt('');
    setHeightIn('');
    setHeightCm('');
    setActivityLevel(1.55);
    setResults(null);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is TDEE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TDEE stands for Total Daily Energy Expenditure. It is the total number of calories your body burns in a day, including your basal metabolic rate (BMR), the thermic effect of food, and all physical activity. Knowing your TDEE helps you set calorie targets for weight loss, maintenance, or muscle gain."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is the Mifflin-St Jeor equation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Mifflin-St Jeor equation is considered the most accurate predictive formula for estimating BMR in healthy adults. Studies show it falls within 10% of measured values for most people. However, individual factors like muscle mass, genetics, and metabolic adaptation can cause your actual TDEE to differ."
                }
              },
              {
                "@type": "Question",
                "name": "How many calories should I eat to lose weight?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A safe and sustainable rate of weight loss is about 1 pound per week, which requires a daily calorie deficit of roughly 500 calories below your TDEE. A more aggressive deficit of 1,000 calories per day can lead to about 2 pounds per week, but this can be harder to maintain and may cause muscle loss."
                }
              },
              {
                "@type": "Question",
                "name": "Should I eat back the calories I burn during exercise?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Your TDEE already factors in your exercise through the activity multiplier, so you generally do not need to add extra calories for workouts. If you use a fitness tracker that logs calories burned, be cautious about eating all of those back, as trackers often overestimate calorie burn by 20-30%."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between BMR and TDEE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMR (Basal Metabolic Rate) is the number of calories your body needs just to keep you alive at complete rest — breathing, circulating blood, and maintaining organs. TDEE includes your BMR plus all additional calories burned through daily movement, exercise, and digesting food. TDEE is always higher than BMR."
                }
              }
            ]
          })
        }}
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        TDEE Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Calculate your Total Daily Energy Expenditure to find out how many
        calories you burn per day. Get personalized targets for weight loss,
        maintenance, and muscle gain.
      </p>


      <div className="mt-8 space-y-4">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="25"
            min="1"
            max="120"
          />
        </div>

        {/* Sex */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sex
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setSex('male')}
              className={`flex-1 py-2 rounded-lg font-medium border transition ${
                sex === 'male'
                  ? 'bg-[#2563eb] text-white border-[#2563eb]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setSex('female')}
              className={`flex-1 py-2 rounded-lg font-medium border transition ${
                sex === 'female'
                  ? 'bg-[#2563eb] text-white border-[#2563eb]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder={weightUnit === 'lbs' ? '170' : '77'}
            />
            <button
              onClick={() => setWeightUnit(weightUnit === 'lbs' ? 'kg' : 'lbs')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition min-w-[56px]"
            >
              {weightUnit}
            </button>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <div className="flex gap-2">
            {heightUnit === 'imperial' ? (
              <>
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="5"
                  min="0"
                />
                <span className="self-center text-gray-500 text-sm">ft</span>
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="10"
                  min="0"
                  max="11"
                />
                <span className="self-center text-gray-500 text-sm">in</span>
              </>
            ) : (
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="178"
                min="0"
              />
            )}
            <button
              onClick={() => setHeightUnit(heightUnit === 'imperial' ? 'metric' : 'imperial')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition min-w-[56px]"
            >
              {heightUnit === 'imperial' ? 'ft/in' : 'cm'}
            </button>
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activity Level
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Basal Metabolic Rate (BMR)</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.bmr.toLocaleString()} cal/day
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Maintenance Calories (TDEE)</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {results.tdee.toLocaleString()} cal/day
              </p>
            </div>
          </div>

          <div className="border-t border-blue-200 pt-4 mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Daily Calorie Targets
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-red-50">
                <span className="text-sm text-gray-700">Extreme Weight Loss (-2 lb/week)</span>
                <span className="font-bold text-red-600">{results.extremeLoss.toLocaleString()} cal</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-orange-50">
                <span className="text-sm text-gray-700">Weight Loss (-1 lb/week)</span>
                <span className="font-bold text-orange-600">{results.loss.toLocaleString()} cal</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-yellow-50">
                <span className="text-sm text-gray-700">Mild Weight Loss (-0.5 lb/week)</span>
                <span className="font-bold text-yellow-600">{results.mildLoss.toLocaleString()} cal</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-blue-50 border border-blue-200">
                <span className="text-sm font-medium text-gray-700">Maintenance</span>
                <span className="font-bold text-[#2563eb]">{results.maintenance.toLocaleString()} cal</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-green-50">
                <span className="text-sm text-gray-700">Mild Weight Gain (+0.5 lb/week)</span>
                <span className="font-bold text-green-600">{results.mildGain.toLocaleString()} cal</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-emerald-50">
                <span className="text-sm text-gray-700">Weight Gain (+1 lb/week)</span>
                <span className="font-bold text-emerald-600">{results.gain.toLocaleString()} cal</span>
              </div>
            </div>
          </div>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your age in years.</li>
          <li>Select your biological sex (male or female).</li>
          <li>Enter your weight and toggle between pounds and kilograms.</li>
          <li>Enter your height in feet and inches, or toggle to centimeters.</li>
          <li>Choose the activity level that best matches your typical week.</li>
          <li>Click Calculate to see your BMR, TDEE, and calorie targets.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600 mb-3">
          This calculator uses the Mifflin-St Jeor equation, which is widely
          regarded as the most accurate formula for estimating Basal Metabolic
          Rate (BMR) in healthy adults. The equations are:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li><strong>Men:</strong> BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5</li>
          <li><strong>Women:</strong> BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) - 161</li>
        </ul>
        <p className="text-gray-600">
          Your BMR is then multiplied by an activity factor (ranging from 1.2 for
          sedentary to 1.9 for extremely active) to estimate your TDEE. Calorie
          targets are based on a 3,500-calorie-per-pound rule: a 500-calorie
          daily deficit leads to roughly 1 pound of weight loss per week.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is TDEE and Why Does It Matter?
        </h2>
        <p className="text-gray-600 mb-3">
          Total Daily Energy Expenditure (TDEE) is the total number of calories
          your body burns in a 24-hour period. It accounts for everything from
          the energy your organs need to function at rest (your BMR) to the
          calories burned during exercise, walking, and even digesting food.
          Understanding your TDEE is the foundation of any evidence-based
          approach to weight management.
        </p>
        <p className="text-gray-600 mb-3">
          If you eat more calories than your TDEE, you will gain weight over
          time. If you eat fewer, you will lose weight. This is the principle of
          energy balance, and it holds true regardless of what foods you eat.
          While food quality matters for health, satiety, and performance, the
          calorie equation determines whether the number on the scale goes up or
          down.
        </p>
        <p className="text-gray-600 mb-3">
          The Mifflin-St Jeor equation was published in 1990 and has been
          validated in numerous studies since then. A 2005 review by the American
          Dietetic Association found it to be the most reliable predictive
          equation for estimating BMR in both normal-weight and overweight
          individuals. It replaced the older Harris-Benedict equation (1919) as
          the preferred formula in clinical nutrition.
        </p>
        <p className="text-gray-600">
          Keep in mind that all TDEE calculators provide estimates. Your actual
          energy expenditure depends on factors like muscle mass, genetics,
          hormonal status, and metabolic adaptation. Use this number as a
          starting point, then adjust based on real-world results over 2-4 weeks.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Understanding Activity Levels
        </h2>
        <p className="text-gray-600 mb-3">
          Choosing the right activity level is the single biggest factor in
          TDEE accuracy. Most people overestimate their activity. Here is a
          breakdown of each level:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-3">
          <li><strong>Sedentary (1.2):</strong> Desk job with little to no exercise. Driving to work, sitting most of the day, and light household tasks in the evening.</li>
          <li><strong>Lightly Active (1.375):</strong> Light exercise or walking 1-3 days per week. A desk job combined with a few 30-minute walks or light gym sessions.</li>
          <li><strong>Moderately Active (1.55):</strong> Moderate exercise 3-5 days per week. Regular gym sessions, jogging, cycling, or active hobbies like hiking on weekends.</li>
          <li><strong>Very Active (1.725):</strong> Hard exercise 6-7 days per week. Intense training sessions most days, sports practice, or a physically demanding job combined with regular workouts.</li>
          <li><strong>Extremely Active (1.9):</strong> Professional or competitive athletes, or people with very physical jobs (construction, farming) who also train regularly.</li>
        </ul>
        <p className="text-gray-600">
          When in doubt, choose one level lower than you think. It is easier to
          add calories later than to undo the effects of overeating.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is TDEE?
        </h3>
        <p className="text-gray-600 mb-4">
          TDEE stands for Total Daily Energy Expenditure. It is the total number
          of calories your body burns in a day, including your basal metabolic
          rate (BMR), the thermic effect of food, and all physical activity.
          Knowing your TDEE helps you set calorie targets for weight loss,
          maintenance, or muscle gain.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How accurate is the Mifflin-St Jeor equation?
        </h3>
        <p className="text-gray-600 mb-4">
          The Mifflin-St Jeor equation is considered the most accurate
          predictive formula for estimating BMR in healthy adults. Studies show it
          falls within 10% of measured values for most people. However,
          individual factors like muscle mass, genetics, and metabolic adaptation
          can cause your actual TDEE to differ. Use the result as a starting
          point and adjust based on real-world progress.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How many calories should I eat to lose weight?
        </h3>
        <p className="text-gray-600 mb-4">
          A safe and sustainable rate of weight loss is about 1 pound per week,
          which requires a daily calorie deficit of roughly 500 calories below
          your TDEE. A more aggressive deficit of 1,000 calories per day can lead
          to about 2 pounds per week, but this is harder to maintain and may
          increase the risk of muscle loss. Most nutrition experts recommend a
          moderate deficit of 500 calories as a good balance between progress
          and sustainability.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I eat back the calories I burn during exercise?
        </h3>
        <p className="text-gray-600 mb-4">
          Your TDEE already factors in your exercise through the activity
          multiplier, so you generally do not need to add extra calories for
          workouts. If you use a fitness tracker that logs calories burned, be
          cautious about eating all of those back, as trackers often overestimate
          calorie burn by 20-30%.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between BMR and TDEE?
        </h3>
        <p className="text-gray-600">
          BMR (Basal Metabolic Rate) is the number of calories your body needs
          just to keep you alive at complete rest &mdash; breathing, circulating
          blood, and maintaining organs. TDEE includes your BMR plus all
          additional calories burned through daily movement, exercise, and
          digesting food. TDEE is always higher than BMR, typically 1.2 to 1.9
          times higher depending on your activity level.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Consider a 30-year-old male who weighs 180 lbs (81.6 kg) and is
          5&apos;10&quot; (177.8 cm) tall with a moderately active lifestyle:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li><strong>BMR:</strong> (10 x 81.6) + (6.25 x 177.8) - (5 x 30) + 5 = 1,778 calories/day</li>
          <li><strong>TDEE:</strong> 1,778 x 1.55 = 2,756 calories/day</li>
          <li><strong>Weight loss (-1 lb/week):</strong> 2,756 - 500 = 2,256 calories/day</li>
          <li><strong>Weight gain (+1 lb/week):</strong> 2,756 + 500 = 3,256 calories/day</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Now consider a 25-year-old female who weighs 140 lbs (63.5 kg) and
          is 5&apos;5&quot; (165.1 cm) tall with a lightly active lifestyle:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li><strong>BMR:</strong> (10 x 63.5) + (6.25 x 165.1) - (5 x 25) - 161 = 1,341 calories/day</li>
          <li><strong>TDEE:</strong> 1,341 x 1.375 = 1,844 calories/day</li>
          <li><strong>Weight loss (-1 lb/week):</strong> 1,844 - 500 = 1,344 calories/day</li>
          <li><strong>Weight gain (+1 lb/week):</strong> 1,844 + 500 = 2,344 calories/day</li>
        </ul>
        <p className="text-gray-600">
          These examples show why personalized calculations matter. A one-size-fits-all
          &quot;2,000 calories per day&quot; recommendation could cause the male
          to lose weight unexpectedly or the female to gain it.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/bmr-calculator" className="text-[#2563eb] hover:underline">BMR Calculator</Link></li>
          <li><Link href="/tools/bmi-calculator" className="text-[#2563eb] hover:underline">BMI Calculator</Link></li>
          <li><Link href="/tools/calorie-calculator" className="text-[#2563eb] hover:underline">Calorie Calculator</Link></li>
          <li><Link href="/tools/body-fat-calculator" className="text-[#2563eb] hover:underline">Body Fat Calculator</Link></li>
          <li><Link href="/tools/ideal-weight-calculator" className="text-[#2563eb] hover:underline">Ideal Weight Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
