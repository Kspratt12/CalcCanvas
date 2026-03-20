import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Daily Calorie Needs | CalcCanvas",
  description:
    "Learn how to calculate TDEE and BMR, use activity multipliers, and set calorie targets for weight loss or muscle gain.",
};

export default function HowToCalculateCalories() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          How to Calculate Your Daily Calorie Needs for Weight Loss or Gain
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          June 8, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Calories are the fuel your body runs on. Whether you want to lose
          weight, gain muscle, or simply maintain your current physique,
          understanding how many calories you need each day is the foundation of
          any effective nutrition plan. This guide explains the science behind
          calorie calculation and gives you the tools to set your own targets.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Is BMR (Basal Metabolic Rate)?
        </h2>
        <p>
          Your Basal Metabolic Rate is the number of calories your body burns at
          rest just to keep you alive&mdash;breathing, circulating blood,
          maintaining body temperature, and running your organs. BMR typically
          accounts for 60&ndash;75% of your total daily calorie expenditure.
        </p>
        <p>
          The most commonly used formula is the Mifflin-St Jeor equation:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Men:</strong> BMR = (10 &times; weight in kg) + (6.25
            &times; height in cm) &minus; (5 &times; age) + 5
          </li>
          <li>
            <strong>Women:</strong> BMR = (10 &times; weight in kg) + (6.25
            &times; height in cm) &minus; (5 &times; age) &minus; 161
          </li>
        </ul>
        <p>
          Our{" "}
          <Link
            href="/tools/bmr-calculator"
            className="font-medium text-primary hover:underline"
          >
            BMR calculator
          </Link>{" "}
          uses this formula and gives you an instant result.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Is TDEE (Total Daily Energy Expenditure)?
        </h2>
        <p>
          TDEE is your BMR multiplied by an activity factor that accounts for
          exercise, walking, and general movement throughout the day. This is the
          total number of calories you actually burn in a 24-hour period.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Sedentary</strong> (desk job, little exercise): BMR &times;
            1.2
          </li>
          <li>
            <strong>Lightly active</strong> (light exercise 1&ndash;3
            days/week): BMR &times; 1.375
          </li>
          <li>
            <strong>Moderately active</strong> (exercise 3&ndash;5 days/week):
            BMR &times; 1.55
          </li>
          <li>
            <strong>Very active</strong> (hard exercise 6&ndash;7 days/week):
            BMR &times; 1.725
          </li>
          <li>
            <strong>Extremely active</strong> (physical job + heavy training):
            BMR &times; 1.9
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Setting a Calorie Deficit for Weight Loss
        </h2>
        <p>
          To lose weight, you need to consume fewer calories than your TDEE. A
          deficit of 500 calories per day results in roughly one pound of weight
          loss per week. A deficit of 250 calories per day produces a more
          gradual half-pound per week, which many health professionals recommend
          for sustainability.
        </p>
        <p>
          Extreme deficits (more than 1,000 calories below TDEE) are generally
          not recommended because they can lead to muscle loss, nutrient
          deficiencies, and metabolic slowdown. The goal is to find a moderate
          deficit you can maintain long term.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Setting a Calorie Surplus for Muscle Gain
        </h2>
        <p>
          To build muscle, you need a calorie surplus&mdash;typically 200 to 500
          calories above your TDEE&mdash;combined with resistance training and
          adequate protein intake (around 0.7&ndash;1 gram per pound of body
          weight). A small surplus minimizes fat gain while providing the energy
          your body needs to build new muscle tissue.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Practical Tips for Tracking Calories
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Use a food scale.</strong> Eyeballing portions is
            notoriously inaccurate. Weighing food for even a few weeks builds
            much better portion awareness.
          </li>
          <li>
            <strong>Read nutrition labels.</strong> Pay attention to serving
            sizes, which are often smaller than what most people actually eat.
          </li>
          <li>
            <strong>Track consistently.</strong> Even imperfect tracking is
            better than no tracking. Log meals as close to eating time as
            possible.
          </li>
          <li>
            <strong>Adjust every 2&ndash;4 weeks.</strong> As your weight
            changes, your TDEE changes. Recalculate periodically using our{" "}
            <Link
              href="/tools/calorie-calculator"
              className="font-medium text-primary hover:underline"
            >
              calorie calculator
            </Link>
            .
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Beyond Calories: Quality Matters
        </h2>
        <p>
          While calorie balance determines weight change, the quality of those
          calories affects your energy, performance, and long-term health. A diet
          rich in whole foods&mdash;lean proteins, vegetables, fruits, whole
          grains, and healthy fats&mdash;will keep you feeling fuller and
          performing better than the same number of calories from processed food.
        </p>
        <p>
          Knowing your{" "}
          <Link
            href="/tools/bmi-calculator"
            className="font-medium text-primary hover:underline"
          >
            BMI
          </Link>{" "}
          and{" "}
          <Link
            href="/tools/body-fat-calculator"
            className="font-medium text-primary hover:underline"
          >
            body fat percentage
          </Link>{" "}
          alongside your calorie targets helps you set realistic, evidence-based
          goals.
        </p>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Find Your Daily Calorie Target
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Calculate your BMR, TDEE, and recommended intake for your goal.
          </p>
          <Link
            href="/tools/calorie-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our Calorie Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          Calculating your calorie needs starts with your BMR, which you then
          adjust for activity level to get your TDEE. From there, you create a
          deficit for weight loss or a surplus for muscle gain. Track your intake,
          recalculate as your body changes, and focus on nutrient-dense foods for
          the best results.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:underline"
        >
          &larr; Back to Blog
        </Link>
      </div>
    </article>
  );
}
