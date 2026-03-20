import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Percentages | CalcCanvas",
  description:
    "Master percentage calculations with clear examples: percentage of a number, percentage change, discounts, tips, and more.",
};

export default function PercentageCalculationGuide() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          How to Calculate Percentages: The Complete Guide with Examples
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          June 5, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Percentages show up everywhere&mdash;discounts at the store, interest
          rates on loans, test scores, tax rates, tips at restaurants, and
          investment returns. Despite being one of the most practical math skills,
          many people feel unsure about how to calculate them. This guide covers
          every common percentage calculation with clear, step-by-step examples.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Is a Percentage?
        </h2>
        <p>
          A percentage is simply a number expressed as a fraction of 100. The
          word itself comes from the Latin <em>per centum</em>, meaning
          &quot;by the hundred.&quot; When you see 25%, it means 25 out of 100,
          or 0.25 as a decimal.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How to Find the Percentage of a Number
        </h2>
        <p>
          <strong>Question:</strong> What is 15% of 200?
        </p>
        <p>
          <strong>Method:</strong> Convert the percentage to a decimal (15% =
          0.15), then multiply: 0.15 &times; 200 = 30. So 15% of 200 is 30.
        </p>
        <p>
          This calculation is useful for figuring out tips, sales tax, and
          discounts. Our{" "}
          <Link
            href="/tools/percentage-calculator"
            className="font-medium text-primary hover:underline"
          >
            percentage calculator
          </Link>{" "}
          handles all of these scenarios instantly.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How to Find What Percentage One Number Is of Another
        </h2>
        <p>
          <strong>Question:</strong> 45 is what percent of 180?
        </p>
        <p>
          <strong>Method:</strong> Divide the part by the whole, then multiply by
          100: (45 &divide; 180) &times; 100 = 25%. So 45 is 25% of 180.
        </p>
        <p>
          This comes up when you want to know what fraction of a budget you have
          spent, what proportion of questions you answered correctly on a test, or
          how much of a goal you have reached.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How to Calculate Percentage Change
        </h2>
        <p>
          <strong>Question:</strong> A product&apos;s price went from $80 to
          $100. What is the percentage increase?
        </p>
        <p>
          <strong>Method:</strong> Subtract the old value from the new value, divide by
          the old value, and multiply by 100: ((100 &minus; 80) &divide; 80)
          &times; 100 = 25% increase.
        </p>
        <p>
          For a decrease, the formula is the same&mdash;you just get a negative
          result. A drop from $100 to $80 is a 20% decrease: ((80 &minus; 100)
          &divide; 100) &times; 100 = &minus;20%.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Practical Examples
        </h2>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Calculating a Tip
        </h3>
        <p>
          Your restaurant bill is $68 and you want to leave a 20% tip. Multiply
          $68 &times; 0.20 = $13.60. Your total comes to $81.60. Our{" "}
          <Link
            href="/tools/tip-calculator"
            className="font-medium text-primary hover:underline"
          >
            tip calculator
          </Link>{" "}
          makes this even easier, especially when splitting the bill.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Figuring Out a Discount
        </h3>
        <p>
          A $120 jacket is 30% off. The discount is $120 &times; 0.30 = $36.
          The sale price is $120 &minus; $36 = $84.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Understanding Interest Rates
        </h3>
        <p>
          If your savings account earns 4.5% annually on a $10,000 balance, you
          earn $10,000 &times; 0.045 = $450 in the first year (before
          compounding). To see how compounding affects this over multiple years,
          try the{" "}
          <Link
            href="/tools/compound-interest-calculator"
            className="font-medium text-primary hover:underline"
          >
            compound interest calculator
          </Link>
          .
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Common Percentage Mistakes
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Confusing percentage points with percentages.</strong> A rate
            going from 5% to 7% is a 2 percentage point increase, but a 40%
            relative increase.
          </li>
          <li>
            <strong>Applying percentages in the wrong order.</strong> A 50%
            increase followed by a 50% decrease does not get you back to the
            original number&mdash;you end up 25% lower.
          </li>
          <li>
            <strong>Forgetting the base.</strong> 20% of $50 is very different
            from 20% of $500. Always double-check which number you are
            calculating the percentage of.
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Quick Mental Math Tricks
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>10% shortcut:</strong> Move the decimal one place left. 10%
            of $75 is $7.50.
          </li>
          <li>
            <strong>5% shortcut:</strong> Find 10%, then halve it. 5% of $75 is
            $3.75.
          </li>
          <li>
            <strong>15% shortcut:</strong> Add 10% and 5% together. 15% of $75
            is $7.50 + $3.75 = $11.25.
          </li>
          <li>
            <strong>Swap trick:</strong> 8% of 50 equals 50% of 8, which is 4.
            Find whichever direction is easier to calculate.
          </li>
        </ul>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Calculate Any Percentage Instantly
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Find percentages, percentage change, and more with zero effort.
          </p>
          <Link
            href="/tools/percentage-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our Percentage Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          Percentages are one of the most practical math concepts you will use in
          daily life. Master the three core calculations&mdash;finding a
          percentage of a number, finding what percentage one number is of
          another, and calculating percentage change&mdash;and you will be
          equipped to handle discounts, tips, taxes, interest rates, and much
          more.
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
