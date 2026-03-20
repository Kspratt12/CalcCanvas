'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Savings Calculator',
  url: 'https://calcanvas.com/tools/savings-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate how your savings grow over time with regular monthly deposits and compound interest. See total savings, contributions, interest earned, and a detailed year-by-year breakdown.',
};

type YearRow = { year: number; balance: number; contributions: number; interest: number };

export default function SavingsCalculator() {
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [frequency, setFrequency] = useState('12');
  const [results, setResults] = useState<{
    totalSavings: number;
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
    if (!t || (r === 0 && P === 0 && PMT === 0)) return;

    const breakdown: YearRow[] = [];
    let balance = P;
    let totalContrib = P;

    for (let y = 1; y <= t; y++) {
      const periodsPerYear = n;
      const ratePerPeriod = r / n;
      const monthsPerPeriod = 12 / n;

      for (let p = 0; p < periodsPerYear; p++) {
        // add monthly contributions for this compounding period
        balance += PMT * monthsPerPeriod;
        totalContrib += PMT * monthsPerPeriod;
        // apply interest for this period
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
      totalSavings: balance,
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
                "name": "How much should I have in savings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Financial advisors generally recommend keeping three to six months of living expenses in an emergency fund. Beyond that, your savings goals depend on what you're saving for — a house down payment, retirement, or a general financial cushion. Use this savings calculator to set a target and see how long it will take to reach it."
                }
              },
              {
                "@type": "Question",
                "name": "What is the best compounding frequency for savings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Daily compounding will earn you slightly more than monthly or quarterly compounding, but the difference is small for typical savings account balances. What matters most is the annual interest rate (APY) and how consistently you contribute. Focus on finding the highest APY rather than worrying about compounding frequency."
                }
              },
              {
                "@type": "Question",
                "name": "What is a good interest rate for a savings account?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As of 2025, high-yield savings accounts offer between 4% and 5% APY. Traditional brick-and-mortar banks often pay well under 1%. Online banks and credit unions tend to offer the most competitive rates. Always compare APY rather than the nominal rate."
                }
              },
              {
                "@type": "Question",
                "name": "How is savings growth calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Savings growth uses the compound interest formula: A = P(1 + r/n)^(nt), where P is your principal, r is the annual interest rate, n is the compounding frequency, and t is the number of years. When you add regular contributions, each deposit compounds for the remaining time period, accelerating your total growth."
                }
              },
              {
                "@type": "Question",
                "name": "Should I save or invest my money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on your timeline and risk tolerance. Money you need within the next 1-3 years (emergency fund, upcoming expenses) should stay in a high-yield savings account where it's safe and accessible. Money you won't need for 5+ years can be invested in index funds or other assets for potentially higher returns, though with more risk."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Savings Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate how your savings will grow over time with regular deposits and
        compound interest. Plan for an emergency fund, a down payment, or any
        savings goal.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Deposit ($)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5000"
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
            placeholder="300"
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
            placeholder="4.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="10"
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
              <p className="text-sm text-gray-500">Total Savings</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.totalSavings)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Contributions</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalContributions)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest Earned</p>
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
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this savings calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your starting balance or initial deposit amount.</li>
          <li>Add the amount you plan to save each month.</li>
          <li>Set the annual interest rate your savings account offers.</li>
          <li>Choose how many years you plan to save.</li>
          <li>Select the compounding frequency, then hit Calculate.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This savings calculator uses the compound interest formula
          A&nbsp;=&nbsp;P(1&nbsp;+&nbsp;r/n)^(nt) to project growth on your
          initial deposit, while factoring in your recurring monthly
          contributions. Each deposit earns compound interest from the moment
          it&apos;s added, so even small regular contributions add up
          significantly over time.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Why a Savings Calculator Matters
        </h2>
        <p className="text-gray-600 mb-3">
          Building savings is one of the most important steps toward financial security. Whether you&apos;re setting aside money for an emergency fund, saving for a down payment on a house, or building a college fund, knowing how your money will grow helps you set realistic goals and stay motivated.
        </p>
        <p className="text-gray-600 mb-3">
          The biggest advantage of a savings calculator is visibility. When you can see that saving $300 per month at 4.5% APY will grow to over $45,000 in 10 years, it becomes much easier to commit to the habit. The year-by-year breakdown shows exactly when your interest earnings start to accelerate, giving you tangible milestones to track.
        </p>
        <p className="text-gray-600">
          Many people underestimate the power of consistent saving. Even modest monthly deposits, when combined with compound interest over several years, produce results that feel almost surprising. This calculator removes the guesswork and shows you exactly where you&apos;ll stand at any point in your savings journey.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Tips to Maximize Your Savings Growth
        </h2>
        <p className="text-gray-600 mb-3">
          The three levers that control your savings growth are your contribution amount, your interest rate, and your time horizon. Increasing any one of them will boost your final balance, but time is the most powerful factor because it gives compound interest more room to work.
        </p>
        <p className="text-gray-600 mb-3">
          Start by automating your savings. Set up an automatic transfer from your checking account to a high-yield savings account on payday. When saving is automatic, you remove the temptation to spend first and save what&apos;s left. Even $50 or $100 per month adds up when you stay consistent.
        </p>
        <p className="text-gray-600">
          Shop for the best APY. Online banks and credit unions routinely offer 4-5% on savings accounts, while traditional banks may pay less than 0.5%. Moving your savings to a higher-yield account is one of the easiest ways to earn more without changing your contribution habits. Use this calculator to compare how different rates affect your outcome.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much should I have in savings?
        </h3>
        <p className="text-gray-600 mb-4">
          Financial advisors generally recommend keeping three to six months of living expenses in an emergency fund. Beyond that, your savings goals depend on what you&apos;re saving for &mdash; a house down payment, a new car, retirement, or a general financial cushion. Use this savings calculator to set a target and see how long it will take to reach it.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the best compounding frequency for savings?
        </h3>
        <p className="text-gray-600 mb-4">
          Daily compounding will earn you slightly more than monthly or quarterly compounding, but the difference is small for typical savings account balances. What matters most is the annual interest rate (APY) and how consistently you contribute. Focus on finding the highest APY rather than worrying about compounding frequency.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a good interest rate for a savings account?
        </h3>
        <p className="text-gray-600 mb-4">
          As of 2025, high-yield savings accounts offer between 4% and 5% APY. Traditional brick-and-mortar banks often pay well under 1%. Online banks and credit unions tend to offer the most competitive rates. Always compare APY (annual percentage yield) rather than the nominal rate to get an accurate picture.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How is savings growth calculated?
        </h3>
        <p className="text-gray-600 mb-4">
          Savings growth uses the compound interest formula: A&nbsp;=&nbsp;P(1&nbsp;+&nbsp;r/n)^(nt), where P is your principal, r is the annual interest rate, n is the compounding frequency, and t is the number of years. When you add regular contributions, each deposit compounds for the remaining time period, accelerating your total growth.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I save or invest my money?
        </h3>
        <p className="text-gray-600">
          It depends on your timeline and risk tolerance. Money you need within the next one to three years &mdash; like an emergency fund or an upcoming large purchase &mdash; should stay in a high-yield savings account where it&apos;s safe and accessible. Money you won&apos;t need for five or more years can be invested in index funds or other assets for potentially higher returns, though with more short-term risk.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s say you open a high-yield savings account with $5,000 and contribute $300 per month at 4.5% APY, compounded monthly, for 10 years. Here&apos;s what happens:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Total contributions: $41,000 ($5,000 initial + $36,000 in monthly deposits)</li>
          <li>Interest earned: approximately $10,400</li>
          <li>Final balance: approximately $51,400</li>
        </ul>
        <p className="text-gray-600">
          Even at a relatively modest savings account rate, compound interest added over $10,000 to your balance. If you extended the time period to 20 years with the same contributions, the interest earned would more than triple due to the compounding effect accelerating in later years.
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
            <Link href="/tools/investment-calculator" className="text-[#2563eb] hover:underline">
              Investment Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">
              Retirement Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/cd-calculator" className="text-[#2563eb] hover:underline">
              CD Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/inflation-calculator" className="text-[#2563eb] hover:underline">
              Inflation Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
