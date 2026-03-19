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
