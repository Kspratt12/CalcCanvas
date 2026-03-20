import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compound Interest Explained | CalcCanvas",
  description:
    "Learn how compound interest works, the Rule of 72, compounding frequency, and see real examples of how your money grows over time.",
};

export default function CompoundInterestExplained() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Compound Interest Explained: How Your Money Grows Over Time
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          June 12, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Albert Einstein reportedly called compound interest &quot;the eighth
          wonder of the world.&quot; Whether or not he actually said it, the
          concept deserves the hype. Compound interest is the single most
          powerful force in personal finance, and understanding how it works can
          change the way you save, invest, and plan for the future.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Simple Interest vs. Compound Interest
        </h2>
        <p>
          <strong>Simple interest</strong> is calculated only on your original
          principal. If you invest $1,000 at 5% simple interest, you earn $50
          every year, no matter how long you leave it. After 10 years you would
          have $1,500.
        </p>
        <p>
          <strong>Compound interest</strong> is calculated on your principal plus
          any interest already earned. That same $1,000 at 5% compounded
          annually would grow to approximately $1,629 after 10 years&mdash;$129
          more than simple interest. The longer the time horizon, the bigger the
          gap becomes.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          The Compound Interest Formula
        </h2>
        <p>
          The standard compound interest formula is: <strong>A = P(1 + r/n)^(nt)</strong>,
          where <em>A</em> is the future value, <em>P</em> is the principal,{" "}
          <em>r</em> is the annual interest rate, <em>n</em> is the number of
          times interest compounds per year, and <em>t</em> is the number of
          years.
        </p>
        <p>
          You do not need to memorize this formula. Our{" "}
          <Link
            href="/tools/compound-interest-calculator"
            className="font-medium text-primary hover:underline"
          >
            compound interest calculator
          </Link>{" "}
          does the math instantly and shows you a breakdown year by year.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          The Rule of 72
        </h2>
        <p>
          Want a quick way to estimate how long it takes to double your money?
          Divide 72 by your annual interest rate. At 6%, your money doubles in
          roughly 12 years (72 &divide; 6 = 12). At 8%, it doubles in about 9
          years. This shortcut is surprisingly accurate for rates between 2% and
          15%.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How Compounding Frequency Matters
        </h2>
        <p>
          Interest can compound annually, semi-annually, quarterly, monthly, or
          even daily. The more frequently it compounds, the faster your balance
          grows&mdash;though the difference narrows as frequency increases.
        </p>
        <p>
          For example, $10,000 at 6% for 20 years:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Annually:</strong> $32,071
          </li>
          <li>
            <strong>Monthly:</strong> $33,102
          </li>
          <li>
            <strong>Daily:</strong> $33,199
          </li>
        </ul>
        <p>
          The jump from annual to monthly compounding is meaningful. From monthly
          to daily, it is marginal. Most savings accounts and bonds compound
          daily or monthly, which works in your favor.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Real-World Examples
        </h2>
        <p>
          Consider two friends, Alex and Jordan. Alex starts investing $200 per
          month at age 25 and stops at 35&mdash;contributing $24,000 over 10
          years. Jordan starts at 35 and invests $200 per month until 65&mdash;a
          total of $72,000. Assuming 7% annual returns, Alex ends up with more
          money at 65 than Jordan despite investing three times less. That is the
          power of starting early and letting compounding do the heavy lifting.
        </p>
        <p>
          This principle applies to retirement accounts, education savings, and
          even paying off debt. The{" "}
          <Link
            href="/tools/retirement-calculator"
            className="font-medium text-primary hover:underline"
          >
            retirement calculator
          </Link>{" "}
          can show you how monthly contributions grow over decades.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Compound Interest and Debt
        </h2>
        <p>
          Compound interest is a double-edged sword. When you carry a credit
          card balance or take out a loan, interest compounds against you. A
          $5,000 credit card balance at 20% APR will cost you over $1,000 in
          interest in the first year alone if you only make minimum payments. Use
          our{" "}
          <Link
            href="/tools/loan-payoff-calculator"
            className="font-medium text-primary hover:underline"
          >
            loan payoff calculator
          </Link>{" "}
          to create a payoff plan and see how extra payments reduce total
          interest.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Tips to Maximize Compound Growth
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Start as early as possible.</strong> Time is the most
            important variable in compound growth.
          </li>
          <li>
            <strong>Reinvest earnings.</strong> Let dividends and interest
            compound rather than withdrawing them.
          </li>
          <li>
            <strong>Be consistent.</strong> Regular monthly contributions
            amplify compounding significantly.
          </li>
          <li>
            <strong>Minimize fees.</strong> High fees eat into your returns and
            reduce the amount available to compound.
          </li>
        </ul>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            See Compound Interest in Action
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Enter your principal, rate, and time horizon to see exactly how your
            money grows.
          </p>
          <Link
            href="/tools/compound-interest-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our Compound Interest Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          Compound interest rewards patience and punishes procrastination. The
          earlier you start saving and the longer you leave your money invested,
          the more dramatic the results. Use the Rule of 72 for quick estimates,
          understand how compounding frequency affects your returns, and always
          be aware that compound interest works just as powerfully against you
          when you carry debt.
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
