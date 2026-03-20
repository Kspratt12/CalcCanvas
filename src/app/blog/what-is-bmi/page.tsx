import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is BMI and How Is It Calculated? | CalcCanvas",
  description:
    "Learn the BMI formula, weight categories, limitations of BMI, and better alternatives for assessing your health.",
};

export default function WhatIsBMI() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          What Is BMI and How Is It Calculated? Everything You Need to Know
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          June 10, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Body Mass Index, or BMI, is one of the most widely used screening
          tools for assessing whether someone falls within a healthy weight
          range. Doctors, insurers, and public health researchers rely on it
          because it is quick, free, and requires only two measurements. But BMI
          has real limitations that everyone should understand before drawing
          conclusions about their health.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          The BMI Formula
        </h2>
        <p>
          BMI is calculated by dividing your weight in kilograms by your height
          in meters squared: <strong>BMI = weight (kg) / height (m)&sup2;</strong>.
          If you use pounds and inches, the formula becomes:{" "}
          <strong>BMI = (weight in lbs &times; 703) / (height in inches)&sup2;</strong>.
        </p>
        <p>
          You do not need to calculate it by hand. Our{" "}
          <Link
            href="/tools/bmi-calculator"
            className="font-medium text-primary hover:underline"
          >
            BMI calculator
          </Link>{" "}
          handles both metric and imperial units and gives you an instant result
          with your weight category.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          BMI Weight Categories
        </h2>
        <p>
          The World Health Organization defines the following categories for
          adults:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Underweight:</strong> BMI below 18.5
          </li>
          <li>
            <strong>Normal weight:</strong> BMI 18.5 to 24.9
          </li>
          <li>
            <strong>Overweight:</strong> BMI 25.0 to 29.9
          </li>
          <li>
            <strong>Obese (Class I):</strong> BMI 30.0 to 34.9
          </li>
          <li>
            <strong>Obese (Class II):</strong> BMI 35.0 to 39.9
          </li>
          <li>
            <strong>Obese (Class III):</strong> BMI 40.0 or higher
          </li>
        </ul>
        <p>
          These ranges are based on population-level data linking BMI to health
          outcomes such as heart disease, diabetes, and certain cancers. However,
          individual results vary significantly.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Limitations of BMI
        </h2>
        <p>
          BMI is a useful starting point, but it has significant blind spots:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>It does not measure body composition.</strong> A muscular
            athlete and a sedentary person of the same height and weight will
            have the same BMI, even though their health profiles are vastly
            different.
          </li>
          <li>
            <strong>It ignores fat distribution.</strong> Visceral fat around the
            organs is more dangerous than subcutaneous fat, and BMI cannot
            distinguish between them.
          </li>
          <li>
            <strong>It varies by ethnicity.</strong> Research shows that health
            risks associated with the same BMI can differ across ethnic groups.
          </li>
          <li>
            <strong>It is not designed for children.</strong> Pediatric BMI uses
            age- and sex-specific percentiles, which is a different system.
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Better Alternatives and Complementary Metrics
        </h2>
        <p>
          For a more complete picture, consider pairing BMI with other
          measurements:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Body fat percentage</strong> directly measures how much of
            your weight is fat versus lean tissue. Try our{" "}
            <Link
              href="/tools/body-fat-calculator"
              className="font-medium text-primary hover:underline"
            >
              body fat calculator
            </Link>{" "}
            for a quick estimate.
          </li>
          <li>
            <strong>Waist-to-hip ratio</strong> captures fat distribution and is
            a strong predictor of cardiovascular risk.
          </li>
          <li>
            <strong>Ideal weight formulas</strong> use height and frame size to
            suggest a target range. Check your range with our{" "}
            <Link
              href="/tools/ideal-weight-calculator"
              className="font-medium text-primary hover:underline"
            >
              ideal weight calculator
            </Link>
            .
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          When BMI Is Still Useful
        </h2>
        <p>
          Despite its limitations, BMI remains valuable as a quick screening
          tool&mdash;especially at the population level. If your BMI is
          significantly outside the normal range, it is worth investigating
          further with your healthcare provider. Combined with other metrics like
          body fat percentage, waist circumference, and blood work, BMI helps
          paint a more complete health picture.
        </p>
        <p>
          Understanding your{" "}
          <Link
            href="/tools/bmr-calculator"
            className="font-medium text-primary hover:underline"
          >
            basal metabolic rate
          </Link>{" "}
          and daily calorie needs also adds context to BMI results, helping you
          set realistic health and fitness goals.
        </p>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Check Your BMI in Seconds
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Enter your height and weight to see your BMI category and what it
            means.
          </p>
          <Link
            href="/tools/bmi-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our BMI Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          BMI is a simple, widely recognized tool that gives you a rough idea of
          where your weight falls relative to your height. It is useful for
          spotting potential health concerns but should never be the sole measure
          of your health. Pair it with body fat percentage, waist measurements,
          and professional medical advice for a complete assessment.
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
