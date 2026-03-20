'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Compound Interest Calculator',
  url: 'https://calcanvas.com/tools/compound-interest-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate compound interest on your investments with monthly contributions. See future value, total contributions, and interest earned over time.',
};

type YearRow = { year: number; balance: number; contributions: number; interest: number };

export default function CompoundInterestCalculator() {
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [frequency, setFrequency] = useState('12');
  const [results, setResults] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
    breakdown: YearRow[];
  } | null>(null);

  function calculate() {
    const P = parseFloat(initial) || 0;
    const PMT = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100;
    const t = parseInt(years);
    const n = parseInt(frequency);
    if (!r || !t) return;

    const breakdown: YearRow[] = [];
    let balance = P;
    let totalContrib = P;

    for (let y = 1; y <= t; y++) {
      const periodsPerYear = n;
      const ratePerPeriod = r / n;
      const monthsPerPeriod = 12 / n;

      for (let p = 0; p < periodsPerYear; p++) {
        // add monthly contributions for this period
        balance += PMT * monthsPerPeriod;
        totalContrib += PMT * monthsPerPeriod;
        // apply interest
        balance *= 1 + ratePerPeriod;
      }

      breakdown.push({
        year: y,
        balance,
        contributions: totalContrib,
        interest: balance - totalContrib,
      });
    }

    setResults({
      futureValue: balance,
      totalContributions: totalContrib,
      totalInterest: balance - totalContrib,
      breakdown,
    });
  }

  function reset() {
    setInitial('');
    setMonthly('');
    setRate('');
    setYears('');
    setFrequency('12');
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

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
                "name": "What is the difference between simple and compound interest?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal plus any interest that has already been added. Over time, compound interest produces significantly higher returns because you're effectively earning interest on your interest."
                }
              },
              {
                "@type": "Question",
                "name": "How often should interest compound?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "More frequent compounding produces slightly higher returns. Daily compounding will grow your money a bit faster than monthly, which beats quarterly, which beats annually. However, the differences are relatively small for most savings accounts."
                }
              },
              {
                "@type": "Question",
                "name": "What is a realistic rate of return to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For a diversified stock portfolio, the historical average is roughly 7% per year after inflation. High-yield savings accounts currently offer 4-5%. Bond funds typically return 3-5%. Use a rate that matches the type of investment you plan to hold."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator account for taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The results show pre-tax growth. If your money is in a taxable brokerage account, you'll owe taxes on dividends and capital gains each year. Tax-advantaged accounts like 401(k)s and IRAs let your money compound without annual tax drag."
                }
              },
              {
                "@type": "Question",
                "name": "Why do small changes in interest rate matter so much?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Because compounding is exponential, even a 1% difference in annual return can result in tens of thousands of dollars over a 20- or 30-year period. That's why keeping investment fees low is so important."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Compound Interest Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        See how your investments grow over time with compound interest and
        regular monthly contributions.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="10000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="7"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Years
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compounding Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

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
          <h2 className="text-lg font-semibold text-gray-900">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Future Value</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.futureValue)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Contributions</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalContributions)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalInterest)}
              </p>
            </div>
          </div>

          {results.breakdown.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Year-by-Year Breakdown
              </h3>
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left">Year</th>
                      <th className="px-3 py-2 text-right">Balance</th>
                      <th className="px-3 py-2 text-right">Contributions</th>
                      <th className="px-3 py-2 text-right">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.breakdown.map((row) => (
                      <tr key={row.year} className="border-t border-gray-100">
                        <td className="px-3 py-2">{row.year}</td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.balance)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.contributions)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.interest)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <AdPlacement format="rectangle" />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your starting investment amount.</li>
          <li>Add any recurring monthly contribution you plan to make.</li>
          <li>Set the expected annual interest rate and number of years.</li>
          <li>Choose how often interest compounds, then hit Calculate.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          Compound interest is calculated by applying the periodic interest rate
          to your growing balance each compounding period. The formula
          A&nbsp;=&nbsp;P(1&nbsp;+&nbsp;r/n)^(nt) calculates growth on the
          initial principal, while additional contributions are added before each
          compounding period. Over time, you earn interest on your interest,
          accelerating growth.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is Compound Interest?
        </h2>
        <p className="text-gray-600 mb-3">
          Compound interest is the process of earning interest on both your original investment and on the interest that has already accumulated. Unlike simple interest, which only applies to the principal, compound interest creates a snowball effect where your money grows faster over time.
        </p>
        <p className="text-gray-600 mb-3">
          Albert Einstein reportedly called compound interest the &quot;eighth wonder of the world,&quot; and the math backs up the hype. The longer your money stays invested, the more dramatic the compounding effect becomes. A modest monthly contribution of $500 at 7% annual returns can grow to well over $250,000 in 20 years &mdash; even though you only contributed $120,000 out of pocket.
        </p>
        <p className="text-gray-600">
          This calculator lets you see exactly how compounding works with your own numbers. Adjust the frequency between daily, monthly, quarterly, or annual compounding to see how each option affects your final balance.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between simple and compound interest?
        </h3>
        <p className="text-gray-600 mb-4">
          Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal plus any interest that has already been added. Over time, compound interest produces significantly higher returns because you&apos;re effectively earning interest on your interest.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How often should interest compound?
        </h3>
        <p className="text-gray-600 mb-4">
          More frequent compounding produces slightly higher returns. Daily compounding will grow your money a bit faster than monthly, which beats quarterly, which beats annually. However, the differences are relatively small for most savings accounts and investment balances. The interest rate and contribution amount matter far more.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a realistic rate of return to use?
        </h3>
        <p className="text-gray-600 mb-4">
          For a diversified stock portfolio, the historical average is roughly 7% per year after inflation. High-yield savings accounts currently offer 4-5%. Bond funds typically return 3-5%. Use a rate that matches the type of investment you plan to hold.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this calculator account for taxes?
        </h3>
        <p className="text-gray-600 mb-4">
          No. The results show pre-tax growth. If your money is in a taxable brokerage account, you&apos;ll owe taxes on dividends and capital gains each year. Tax-advantaged accounts like 401(k)s and IRAs let your money compound without annual tax drag, which makes a meaningful difference over decades.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Why do small changes in interest rate matter so much?
        </h3>
        <p className="text-gray-600">
          Because compounding is exponential, even a 1% difference in annual return can result in tens of thousands of dollars over a 20- or 30-year period. That&apos;s why keeping investment fees low is so important &mdash; a fund charging 1% in fees versus 0.1% can cost you a substantial portion of your potential gains.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s say you invest $10,000 upfront and contribute $500 per month at a 7% annual return, compounded monthly, for 20 years. Here&apos;s what happens:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Total contributions: $130,000 ($10,000 initial + $120,000 in monthly deposits)</li>
          <li>Interest earned: approximately $131,500</li>
          <li>Final balance: approximately $261,500</li>
        </ul>
        <p className="text-gray-600">
          Your money more than doubled thanks to compound interest. Notice that the interest earned actually exceeds your total contributions &mdash; that&apos;s the power of compounding over a long time horizon. Starting five years earlier or adding just $100 more per month would push the final number significantly higher.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li>
            <Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">
              Retirement Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">
              Mortgage Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/loan-payoff-calculator" className="text-[#2563eb] hover:underline">
              Loan Payoff Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">
              Net Worth Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
