'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Investment Calculator',
  url: 'https://calcanvas.com/tools/investment-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate the future value of your investments with regular monthly contributions. Compare total invested versus total returns over any time period.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a good annual return rate for investments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The S&P 500 has averaged roughly 10% annually before inflation, or about 7% after inflation. Conservative bond portfolios return 3-5%, while balanced portfolios typically return 6-8%. The right rate depends on your asset allocation and risk tolerance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do monthly contributions affect investment growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly contributions have a powerful effect due to dollar-cost averaging and compound growth. Even small regular contributions can grow to substantial amounts over time because each deposit earns returns for the remaining investment period.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this calculator account for fees and taxes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, this calculator shows gross returns before fees and taxes. To get a more realistic estimate, subtract your expected annual fund fees (typically 0.03% to 1%) from the return rate. Tax impact depends on whether you use tax-advantaged accounts like 401(k)s or IRAs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between this and a compound interest calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An investment calculator focuses on total portfolio growth including regular contributions and shows invested versus earned breakdowns. A compound interest calculator emphasizes the compounding frequency and interest mechanics. Both use similar math but frame the results differently for different planning needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much should I invest per month?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A common guideline is to invest 15-20% of your gross income for retirement. However, any amount helps. Starting with even $100 per month and increasing contributions over time as your income grows is a practical approach for most people.',
      },
    },
  ],
};

type YearRow = {
  year: number;
  balance: number;
  totalInvested: number;
  totalReturns: number;
};

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [results, setResults] = useState<{
    futureValue: number;
    totalInvested: number;
    totalReturns: number;
    breakdown: YearRow[];
  } | null>(null);

  function calculate() {
    const PV = parseFloat(initialInvestment) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(annualReturn) / 100;
    const n = parseInt(timePeriod);
    if (!r || !n) return;

    const monthlyRate = r / 12;
    const breakdown: YearRow[] = [];
    let balance = PV;
    let totalInvested = PV;

    for (let y = 1; y <= n; y++) {
      for (let m = 0; m < 12; m++) {
        balance += PMT;
        totalInvested += PMT;
        balance *= 1 + monthlyRate;
      }

      breakdown.push({
        year: y,
        balance,
        totalInvested,
        totalReturns: balance - totalInvested,
      });
    }

    setResults({
      futureValue: balance,
      totalInvested,
      totalReturns: balance - totalInvested,
      breakdown,
    });
  }

  function reset() {
    setInitialInvestment('');
    setMonthlyContribution('');
    setAnnualReturn('');
    setTimePeriod('');
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Investment Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Calculate the future value of your investments with regular contributions
        and see how your money grows over time.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
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
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Return Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="7"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period (years)
          </label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="20"
          />
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
              <p className="text-sm text-gray-500">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalInvested)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Returns</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalReturns)}
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
                      <th className="px-3 py-2 text-right">Invested</th>
                      <th className="px-3 py-2 text-right">Returns</th>
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
                          {fmt(row.totalInvested)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.totalReturns)}
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
          What Is an Investment Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          An investment calculator helps you project how your money will grow over time by combining your initial deposit, regular contributions, and expected returns. Unlike a simple savings calculator, it factors in the compounding effect of reinvested returns, giving you a realistic picture of long-term wealth accumulation.
        </p>
        <p className="text-gray-600 mb-3">
          This tool uses the future value formula with periodic payments: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r], where PV is your starting amount, PMT is your monthly contribution, r is the periodic return rate, and n is the number of periods. It assumes contributions are made at the beginning of each month and returns compound monthly.
        </p>
        <p className="text-gray-600">
          Whether you&apos;re planning for retirement, saving for a home, or building a college fund, this calculator shows you exactly how consistent investing pays off. The year-by-year breakdown lets you see the tipping point where your returns start outpacing your contributions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a good annual return rate for investments?
        </h3>
        <p className="text-gray-600 mb-4">
          The S&amp;P 500 has averaged roughly 10% annually before inflation, or about 7% after inflation, over the past several decades. Conservative bond portfolios typically return 3-5%, while balanced portfolios fall in the 6-8% range. The right rate to use depends on your asset allocation, risk tolerance, and investment timeline. For long-term planning, 7% after inflation is a commonly used benchmark.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do monthly contributions affect investment growth?
        </h3>
        <p className="text-gray-600 mb-4">
          Monthly contributions have a powerful effect on your portfolio&apos;s growth due to dollar-cost averaging and compound returns. Each deposit immediately starts earning returns for the remainder of your investment period. Even modest monthly contributions of $200-$500 can grow to hundreds of thousands of dollars over 20-30 years, making consistency more important than the size of any single deposit.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this calculator account for fees and taxes?
        </h3>
        <p className="text-gray-600 mb-4">
          No, this calculator shows gross returns before fees and taxes. To get a more realistic estimate, subtract your expected annual expense ratio (typically 0.03% for index funds up to 1% for actively managed funds) from your return rate. Tax impact varies depending on whether you invest through tax-advantaged accounts like 401(k)s and IRAs or taxable brokerage accounts.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between this and a compound interest calculator?
        </h3>
        <p className="text-gray-600 mb-4">
          Both tools use similar underlying math. An investment calculator focuses on total portfolio growth, emphasizing the split between money you put in versus money earned through returns. A compound interest calculator highlights compounding frequency and interest mechanics. This tool is better suited for planning actual investment strategies with regular contributions.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much should I invest per month?
        </h3>
        <p className="text-gray-600">
          A widely cited guideline is to invest 15-20% of your gross income toward retirement. However, any amount is better than nothing. Starting with $100 per month and increasing contributions as your income grows is a practical approach. The most important factor is starting early &mdash; time in the market matters more than the size of individual contributions because of how compounding accelerates over longer periods.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s say you start with $10,000 and invest $500 per month at a 7% annual return for 25 years. Here&apos;s what happens:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Total invested: $160,000 ($10,000 initial + $150,000 in monthly contributions)</li>
          <li>Total returns earned: approximately $245,000</li>
          <li>Final portfolio value: approximately $405,000</li>
        </ul>
        <p className="text-gray-600">
          Your investment returns actually exceed your total contributions by a wide margin. By year 15, the annual returns start surpassing your annual contributions of $6,000 &mdash; meaning your money is working harder than you are. If you started five years earlier or added just $200 more per month, the final number would be dramatically higher, demonstrating the outsized impact of time and consistency.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li>
            <Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">
              Compound Interest Calculator
            </Link>
          </li>
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
            <Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">
              Net Worth Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
