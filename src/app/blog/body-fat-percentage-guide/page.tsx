import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Body Fat Percentage Guide | CalcCanvas",
  description:
    "Healthy body fat ranges by age and sex, measurement methods compared, and why body fat matters more than weight alone.",
};

export default function BodyFatPercentageGuide() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Body Fat Percentage: What&apos;s Healthy and How to Measure It
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          May 25, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Body fat percentage is one of the most meaningful indicators of overall
          health and fitness&mdash;often more useful than body weight or BMI
          alone. It tells you what proportion of your total body weight is fat
          versus lean tissue like muscle, bone, and organs. This guide covers
          healthy ranges, how to measure body fat, and why it matters.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Is Body Fat Percentage?
        </h2>
        <p>
          Body fat percentage is simply the total weight of your fat divided by
          your total body weight, expressed as a percentage. A 180-pound person
          with 36 pounds of fat has a body fat percentage of 20%.
        </p>
        <p>
          Everyone needs some body fat. Essential fat supports hormone
          production, insulation, organ protection, and vitamin absorption. The
          question is how much is optimal for health and your personal goals.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Healthy Body Fat Ranges
        </h2>
        <p>
          Recommended ranges vary by sex and age. Here are general guidelines
          from the American Council on Exercise:
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          For Men
        </h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Essential fat:</strong> 2&ndash;5%
          </li>
          <li>
            <strong>Athletes:</strong> 6&ndash;13%
          </li>
          <li>
            <strong>Fitness:</strong> 14&ndash;17%
          </li>
          <li>
            <strong>Average:</strong> 18&ndash;24%
          </li>
          <li>
            <strong>Obese:</strong> 25% and above
          </li>
        </ul>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          For Women
        </h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Essential fat:</strong> 10&ndash;13%
          </li>
          <li>
            <strong>Athletes:</strong> 14&ndash;20%
          </li>
          <li>
            <strong>Fitness:</strong> 21&ndash;24%
          </li>
          <li>
            <strong>Average:</strong> 25&ndash;31%
          </li>
          <li>
            <strong>Obese:</strong> 32% and above
          </li>
        </ul>
        <p>
          Women naturally carry more essential fat due to biological factors
          related to reproductive health. Body fat also tends to increase
          naturally with age.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How to Measure Body Fat Percentage
        </h2>
        <p>
          There are several methods, ranging from free estimates to clinical
          precision:
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Online Calculators
        </h3>
        <p>
          Estimation formulas use measurements like waist circumference, neck
          circumference, height, and weight to approximate body fat. These are
          not as accurate as lab methods, but they are free, instant, and good
          enough for tracking trends over time. Our{" "}
          <Link
            href="/tools/body-fat-calculator"
            className="font-medium text-primary hover:underline"
          >
            body fat calculator
          </Link>{" "}
          uses the U.S. Navy method, which is one of the most reliable
          estimation formulas available.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Skinfold Calipers
        </h3>
        <p>
          A trained technician measures the thickness of skin folds at specific
          body sites. Accuracy depends heavily on the skill of the person taking
          the measurements. Typically accurate to within 3&ndash;4%.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Bioelectrical Impedance (BIA)
        </h3>
        <p>
          Smart scales and handheld devices send a small electrical current
          through your body. Fat resists the current more than lean tissue.
          Results can vary significantly based on hydration, recent meals, and
          time of day. Best used for tracking trends rather than absolute values.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          DEXA Scan
        </h3>
        <p>
          Dual-energy X-ray absorptiometry is considered the gold standard. It
          provides precise measurements of fat, muscle, and bone density
          throughout your body. Typically costs $50&ndash;$150 per scan and is
          available at many clinics and universities.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Body Fat vs. BMI: Which Is Better?
        </h2>
        <p>
          BMI is a useful screening tool, but it cannot distinguish between fat
          and muscle. Two people with the same BMI can have very different body
          fat percentages and health profiles. A muscular person may be
          classified as &quot;overweight&quot; by BMI while having a perfectly
          healthy body fat percentage.
        </p>
        <p>
          For the most complete picture, use both. Check your{" "}
          <Link
            href="/tools/bmi-calculator"
            className="font-medium text-primary hover:underline"
          >
            BMI
          </Link>{" "}
          for a quick screening, then estimate your{" "}
          <Link
            href="/tools/body-fat-calculator"
            className="font-medium text-primary hover:underline"
          >
            body fat percentage
          </Link>{" "}
          for more nuance. Knowing your{" "}
          <Link
            href="/tools/ideal-weight-calculator"
            className="font-medium text-primary hover:underline"
          >
            ideal weight
          </Link>{" "}
          can also provide helpful context.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How to Reduce Body Fat
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Create a moderate calorie deficit.</strong> Aim for 250
            &ndash;500 calories below your TDEE. Use our{" "}
            <Link
              href="/tools/calorie-calculator"
              className="font-medium text-primary hover:underline"
            >
              calorie calculator
            </Link>{" "}
            to find your target.
          </li>
          <li>
            <strong>Prioritize protein.</strong> Higher protein intake preserves
            muscle mass during a deficit and supports recovery from exercise.
          </li>
          <li>
            <strong>Strength train consistently.</strong> Resistance training
            builds and maintains muscle, which keeps your metabolic rate higher.
          </li>
          <li>
            <strong>Get enough sleep.</strong> Poor sleep disrupts hormones that
            regulate hunger and fat storage.
          </li>
          <li>
            <strong>Be patient.</strong> Sustainable fat loss happens at
            0.5&ndash;1% of body weight per week.
          </li>
        </ul>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Estimate Your Body Fat Percentage
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Use the U.S. Navy method to get a quick, reliable estimate of your
            body fat.
          </p>
          <Link
            href="/tools/body-fat-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our Body Fat Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          Body fat percentage gives you a much more accurate picture of your
          health than weight or BMI alone. Healthy ranges differ by sex, with men
          generally aiming for 14&ndash;24% and women for 21&ndash;31%. Multiple
          measurement methods exist at various price points. The most important
          thing is to track your progress consistently using the same method over
          time rather than obsessing over a single measurement.
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
