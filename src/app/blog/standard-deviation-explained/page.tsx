import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Standard Deviation Explained Simply | CalcCanvas",
  description:
    "What standard deviation measures, how to calculate it step by step, population vs sample, and real-world interpretation.",
};

export default function StandardDeviationExplained() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Standard Deviation Explained Simply: What It Means and How to
          Calculate It
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          May 28, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Standard deviation is one of the most important concepts in
          statistics, but it is often taught in a way that makes it seem more
          complicated than it is. At its core, standard deviation answers a
          simple question: how spread out are the values in a data set? This
          guide explains what it measures, how to calculate it, and how to
          interpret it in real-world situations.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Does Standard Deviation Measure?
        </h2>
        <p>
          Standard deviation measures the amount of variation or dispersion in a
          set of values. A low standard deviation means the values are clustered
          close to the mean (average). A high standard deviation means the
          values are spread out over a wider range.
        </p>
        <p>
          Think of it this way: if two classes both have an average test score of
          75, but Class A&apos;s scores range from 70 to 80 while Class B&apos;s
          range from 40 to 100, Class B has a much higher standard deviation.
          The average alone does not tell you how consistent the data is.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How to Calculate Standard Deviation Step by Step
        </h2>
        <p>Here is the process, using a simple data set: 4, 8, 6, 5, 3.</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Find the mean:</strong> (4 + 8 + 6 + 5 + 3) &divide; 5 =
            5.2
          </li>
          <li>
            <strong>Subtract the mean from each value:</strong> &minus;1.2, 2.8,
            0.8, &minus;0.2, &minus;2.2
          </li>
          <li>
            <strong>Square each difference:</strong> 1.44, 7.84, 0.64, 0.04,
            4.84
          </li>
          <li>
            <strong>Find the mean of the squared differences (variance):</strong>{" "}
            (1.44 + 7.84 + 0.64 + 0.04 + 4.84) &divide; 5 = 2.96
          </li>
          <li>
            <strong>Take the square root of the variance:</strong>{" "}
            &radic;2.96 &approx; 1.72
          </li>
        </ol>
        <p>
          The standard deviation of this data set is approximately 1.72. Our{" "}
          <Link
            href="/tools/standard-deviation-calculator"
            className="font-medium text-primary hover:underline"
          >
            standard deviation calculator
          </Link>{" "}
          does all of this automatically&mdash;just enter your numbers and get
          the result instantly.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Population vs. Sample Standard Deviation
        </h2>
        <p>
          There are two versions of the formula, and knowing which to use
          matters:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Population standard deviation (&sigma;)</strong> divides the
            sum of squared differences by N (the total number of values). Use
            this when your data set includes every member of the group you are
            studying.
          </li>
          <li>
            <strong>Sample standard deviation (s)</strong> divides by N &minus; 1
            instead. Use this when your data is a subset of a larger population.
            The N &minus; 1 adjustment (called Bessel&apos;s correction) avoids
            underestimating the true variability.
          </li>
        </ul>
        <p>
          In most practical scenarios&mdash;school assignments, business
          analysis, scientific research&mdash;you are working with a sample and
          should use N &minus; 1.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          The 68-95-99.7 Rule
        </h2>
        <p>
          For data that follows a normal distribution (bell curve), standard
          deviation has a convenient interpretation:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>68%</strong> of values fall within 1 standard deviation of
            the mean
          </li>
          <li>
            <strong>95%</strong> fall within 2 standard deviations
          </li>
          <li>
            <strong>99.7%</strong> fall within 3 standard deviations
          </li>
        </ul>
        <p>
          If the average height of adult men is 70 inches with a standard
          deviation of 3 inches, then about 68% of men are between 67 and 73
          inches tall, and 95% are between 64 and 76 inches.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Real-World Applications
        </h2>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Finance and Investing
        </h3>
        <p>
          In investing, standard deviation measures the volatility of returns. A
          stock with a 20% annual standard deviation has much larger price
          swings than a bond with a 3% standard deviation. Investors use this to
          assess risk and build diversified portfolios.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Quality Control
        </h3>
        <p>
          Manufacturers use standard deviation to ensure consistency. If a
          factory produces bolts that should be 10mm in diameter and the standard
          deviation is 0.01mm, the process is very precise. A standard deviation
          of 0.5mm would indicate a serious quality problem.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          Education and Testing
        </h3>
        <p>
          Standardized tests use standard deviation to determine percentile
          rankings. If the average SAT score is 1050 with a standard deviation
          of 200, a score of 1250 is one standard deviation above the mean,
          placing you around the 84th percentile.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Related Concepts
        </h2>
        <p>
          Standard deviation is closely related to <strong>variance</strong>{" "}
          (which is simply the standard deviation squared) and the{" "}
          <strong>mean</strong>. If you need to calculate averages for your data,
          our{" "}
          <Link
            href="/tools/average-calculator"
            className="font-medium text-primary hover:underline"
          >
            average calculator
          </Link>{" "}
          can help. For percentage-based comparisons of data, the{" "}
          <Link
            href="/tools/percentage-calculator"
            className="font-medium text-primary hover:underline"
          >
            percentage calculator
          </Link>{" "}
          is also useful.
        </p>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Calculate Standard Deviation Instantly
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Enter your data set and get the mean, variance, and standard
            deviation in one click.
          </p>
          <Link
            href="/tools/standard-deviation-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our Standard Deviation Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          Standard deviation tells you how spread out your data is around the
          mean. A small value means data points are tightly clustered; a large
          value means they are widely dispersed. Use the population formula when
          you have complete data and the sample formula when working with a
          subset. The 68-95-99.7 rule makes interpretation intuitive for
          normally distributed data. Whether you are analyzing test scores,
          investment returns, or manufacturing quality, standard deviation is the
          go-to measure of variability.
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
