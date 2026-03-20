import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Mortgage Interest Works | CalcCanvas",
  description:
    "Understand fixed vs adjustable rates, amortization, APR vs interest rate, and how to save thousands on your mortgage.",
};

export default function HowMortgageInterestWorks() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          How Mortgage Interest Works: A Complete Guide for Homebuyers
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          June 15, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          Buying a home is likely the biggest financial commitment you will ever
          make, and understanding how mortgage interest works is the key to
          making a smart decision. Whether you are a first-time buyer or
          refinancing an existing loan, this guide breaks down everything you
          need to know about mortgage interest&mdash;from how it is calculated to
          practical strategies for paying less over the life of your loan.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Is Mortgage Interest?
        </h2>
        <p>
          Mortgage interest is the cost a lender charges you for borrowing money
          to purchase a home. It is expressed as a percentage of your outstanding
          loan balance and is typically your largest expense after the principal
          itself. On a standard 30-year mortgage, you can end up paying more in
          interest than the original purchase price of the home.
        </p>
        <p>
          Lenders calculate interest on a monthly basis. Each month, the
          interest charge is determined by multiplying your outstanding balance
          by one-twelfth of your annual interest rate. Early in the loan, the
          vast majority of your monthly payment goes toward interest rather than
          reducing the principal.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Fixed-Rate vs. Adjustable-Rate Mortgages
        </h2>
        <p>
          A <strong>fixed-rate mortgage</strong> locks in the same interest rate
          for the entire term of the loan&mdash;typically 15 or 30 years. Your
          monthly payment never changes, which makes budgeting predictable. This
          is the most popular option for homebuyers who plan to stay in their
          home long term.
        </p>
        <p>
          An <strong>adjustable-rate mortgage (ARM)</strong> starts with a lower
          introductory rate that resets periodically&mdash;often after 5 or 7
          years&mdash;based on a benchmark index. ARMs can be attractive if you
          plan to sell or refinance before the rate adjusts, but they carry the
          risk of significantly higher payments if rates rise.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          How Amortization Works
        </h2>
        <p>
          Amortization is the process of spreading your loan payments over the
          full term so that each payment covers both interest and principal. In
          the early years, most of your payment is interest. As the balance
          shrinks, more of each payment goes toward principal.
        </p>
        <p>
          For example, on a $300,000 loan at 6.5% over 30 years, your monthly
          payment is roughly $1,896. In the first month, about $1,625 goes to
          interest and only $271 reduces the balance. By year 15, the split is
          closer to 50/50. You can visualize this yourself with our{" "}
          <Link
            href="/tools/mortgage-calculator"
            className="font-medium text-primary hover:underline"
          >
            mortgage calculator
          </Link>
          .
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          APR vs. Interest Rate: What Is the Difference?
        </h2>
        <p>
          The <strong>interest rate</strong> is the base cost of borrowing. The{" "}
          <strong>Annual Percentage Rate (APR)</strong> includes the interest
          rate plus additional costs like origination fees, mortgage insurance,
          and discount points. The APR gives you a more complete picture of what
          the loan truly costs and is the best number to use when comparing
          offers from different lenders.
        </p>
        <p>
          Always compare APRs side by side rather than just interest rates. A
          loan with a slightly higher interest rate but lower fees can sometimes
          be cheaper overall. Use a{" "}
          <Link
            href="/tools/loan-payoff-calculator"
            className="font-medium text-primary hover:underline"
          >
            loan payoff calculator
          </Link>{" "}
          to model different scenarios.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Five Ways to Save on Mortgage Interest
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Choose a shorter term.</strong> A 15-year mortgage has
            higher monthly payments but dramatically lower total interest.
          </li>
          <li>
            <strong>Make extra principal payments.</strong> Even one additional
            payment per year can shave years off your loan and save tens of
            thousands in interest.
          </li>
          <li>
            <strong>Improve your credit score.</strong> A score above 740
            typically qualifies you for the best rates, which saves money over
            the entire term.
          </li>
          <li>
            <strong>Put down at least 20%.</strong> A larger down payment reduces
            your balance and eliminates private mortgage insurance (PMI).
          </li>
          <li>
            <strong>Refinance when rates drop.</strong> If rates fall
            significantly below your current rate, refinancing can lower your
            payment and total interest.
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Understanding Your Monthly Payment Breakdown
        </h2>
        <p>
          Your monthly mortgage payment is often referred to as PITI: Principal,
          Interest, Taxes, and Insurance. The principal and interest portions are
          fixed by your loan terms, while property taxes and homeowner&apos;s
          insurance can change from year to year.
        </p>
        <p>
          Knowing exactly how much of each payment goes toward building equity
          versus covering interest helps you make informed decisions about extra
          payments or refinancing. Our{" "}
          <Link
            href="/tools/compound-interest-calculator"
            className="font-medium text-primary hover:underline"
          >
            compound interest calculator
          </Link>{" "}
          can also help you model how extra payments grow your equity faster.
        </p>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Run the Numbers on Your Mortgage
          </p>
          <p className="mt-1 text-sm text-slate-600">
            See your monthly payment, total interest, and amortization schedule
            instantly.
          </p>
          <Link
            href="/tools/mortgage-calculator"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our Mortgage Calculator &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          Mortgage interest is how lenders earn money on home loans, and it
          compounds in ways that can cost you hundreds of thousands of dollars if
          you are not careful. Understanding the difference between fixed and
          adjustable rates, knowing what APR really means, and using strategies
          like extra payments or shorter terms can save you significant money.
          The best first step is to plug your numbers into a calculator and see
          the results for yourself.
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
