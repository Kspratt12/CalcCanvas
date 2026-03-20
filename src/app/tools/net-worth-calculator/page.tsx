'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Net Worth Calculator',
  url: 'https://calcanvas.com/tools/net-worth-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate your net worth by listing all your assets and liabilities. Add or remove items dynamically to get an accurate picture of your finances.',
};

type Row = { id: number; label: string; value: string };

const defaultAssets: Row[] = [
  { id: 1, label: 'Cash & Savings', value: '' },
  { id: 2, label: 'Investments', value: '' },
  { id: 3, label: 'Property', value: '' },
  { id: 4, label: 'Vehicles', value: '' },
  { id: 5, label: 'Other Assets', value: '' },
];

const defaultLiabilities: Row[] = [
  { id: 1, label: 'Mortgage', value: '' },
  { id: 2, label: 'Student Loans', value: '' },
  { id: 3, label: 'Auto Loans', value: '' },
  { id: 4, label: 'Credit Cards', value: '' },
  { id: 5, label: 'Other Liabilities', value: '' },
];

let nextId = 100;

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<Row[]>(() =>
    defaultAssets.map((a) => ({ ...a }))
  );
  const [liabilities, setLiabilities] = useState<Row[]>(() =>
    defaultLiabilities.map((l) => ({ ...l }))
  );
  const [results, setResults] = useState<{
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  } | null>(null);

  function updateRow(
    list: Row[],
    setList: React.Dispatch<React.SetStateAction<Row[]>>,
    id: number,
    field: 'label' | 'value',
    val: string
  ) {
    setList(list.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  }

  function addRow(setList: React.Dispatch<React.SetStateAction<Row[]>>) {
    setList((prev) => [...prev, { id: nextId++, label: '', value: '' }]);
  }

  function removeRow(
    list: Row[],
    setList: React.Dispatch<React.SetStateAction<Row[]>>,
    id: number
  ) {
    if (list.length <= 1) return;
    setList(list.filter((r) => r.id !== id));
  }

  function calculate() {
    const totalAssets = assets.reduce(
      (sum, r) => sum + (parseFloat(r.value) || 0),
      0
    );
    const totalLiabilities = liabilities.reduce(
      (sum, r) => sum + (parseFloat(r.value) || 0),
      0
    );
    setResults({
      totalAssets,
      totalLiabilities,
      netWorth: totalAssets - totalLiabilities,
    });
  }

  function reset() {
    setAssets(defaultAssets.map((a) => ({ ...a })));
    setLiabilities(defaultLiabilities.map((l) => ({ ...l })));
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  function renderSection(
    title: string,
    rows: Row[],
    setRows: React.Dispatch<React.SetStateAction<Row[]>>
  ) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.id} className="flex gap-2 items-center">
              <input
                type="text"
                value={row.label}
                onChange={(e) =>
                  updateRow(rows, setRows, row.id, 'label', e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="Label"
              />
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={row.value}
                  onChange={(e) =>
                    updateRow(rows, setRows, row.id, 'value', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>
              <button
                onClick={() => removeRow(rows, setRows, row.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition"
                title="Remove row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addRow(setRows)}
          className="mt-2 text-sm text-[#2563eb] hover:underline font-medium"
        >
          + Add row
        </button>
      </div>
    );
  }

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
                "name": "What counts as an asset?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Assets include anything you own that has monetary value: bank accounts, retirement accounts (401k, IRA), investment portfolios, real estate, vehicles, and valuable personal property. Use current market values, not what you originally paid."
                }
              },
              {
                "@type": "Question",
                "name": "What counts as a liability?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Liabilities are all your outstanding debts: mortgage balance, student loans, auto loans, credit card balances, personal loans, medical debt, and any other money you owe. Use the current outstanding balance."
                }
              },
              {
                "@type": "Question",
                "name": "Is a negative net worth bad?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A negative net worth is common for people early in their careers, especially those with student loans or a new mortgage. What matters is the trend. If your net worth is increasing over time, you're moving in the right direction."
                }
              },
              {
                "@type": "Question",
                "name": "How often should I calculate my net worth?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most financial planners suggest calculating net worth quarterly or at least twice a year. This gives you enough time to see meaningful changes without obsessing over daily market fluctuations."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Net Worth Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Get a clear snapshot of your financial health by listing your assets and
        liabilities. Add or remove items to match your situation.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-8">
        {renderSection('Assets', assets, setAssets)}
        {renderSection('Liabilities', liabilities, setLiabilities)}

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate Net Worth
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total Assets</p>
              <p className="text-2xl font-bold text-green-600">
                {fmt(results.totalAssets)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-600">
                {fmt(results.totalLiabilities)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Net Worth</p>
              <p
                className={`text-2xl font-bold ${
                  results.netWorth >= 0 ? 'text-[#2563eb]' : 'text-red-600'
                }`}
              >
                {fmt(results.netWorth)}
              </p>
            </div>
          </div>
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
          <li>List all your assets with their current estimated values.</li>
          <li>List all your liabilities (debts) with their outstanding balances.</li>
          <li>Use the + Add row button to include additional items.</li>
          <li>Click Calculate Net Worth to see your total assets, liabilities, and net worth.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          Net worth is simply: Total Assets - Total Liabilities. Assets include
          everything you own that has value (savings, investments, property,
          vehicles). Liabilities are everything you owe (mortgages, loans, credit
          card balances). Tracking your net worth over time is one of the best
          ways to measure financial progress.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Net Worth Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A net worth calculator gives you a single number that represents your overall financial health. It works by adding up everything you own (assets) and subtracting everything you owe (liabilities). The result is your net worth &mdash; positive if your assets exceed your debts, or negative if the reverse is true.
        </p>
        <p className="text-gray-600 mb-3">
          Unlike income, which only tells you how much money flows in, net worth captures the bigger picture. Someone earning $200,000 per year but carrying $500,000 in debt may have a lower net worth than someone earning $60,000 with no debt and a paid-off home. This tool helps you see where you actually stand.
        </p>
        <p className="text-gray-600">
          Financial advisors recommend calculating your net worth at least once or twice a year. Tracking it over time is one of the most effective ways to measure whether you&apos;re making real financial progress, regardless of what your income looks like on paper.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What counts as an asset?
        </h3>
        <p className="text-gray-600 mb-4">
          Assets include anything you own that has monetary value: bank accounts, retirement accounts (401k, IRA), investment portfolios, real estate, vehicles, and valuable personal property. Use current market values, not what you originally paid. For your home, a recent appraisal or online estimate works well.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What counts as a liability?
        </h3>
        <p className="text-gray-600 mb-4">
          Liabilities are all your outstanding debts: mortgage balance, student loans, auto loans, credit card balances, personal loans, medical debt, and any other money you owe. Use the current outstanding balance, not the original loan amount.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Is a negative net worth bad?
        </h3>
        <p className="text-gray-600 mb-4">
          A negative net worth is common for people early in their careers, especially those with student loans or a new mortgage. It&apos;s not a cause for panic &mdash; what matters is the trend. If your net worth is increasing over time, you&apos;re moving in the right direction. Focus on paying down high-interest debt and building savings.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I include my car as an asset?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes, include your car at its current market value (check Kelley Blue Book or a similar tool). If you still owe money on the car, list that balance as a liability. The difference between the two is the equity you have in the vehicle.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How often should I calculate my net worth?
        </h3>
        <p className="text-gray-600">
          Most financial planners suggest calculating net worth quarterly or at least twice a year. This gives you enough time to see meaningful changes without obsessing over daily market fluctuations. Pick consistent dates &mdash; like January 1 and July 1 &mdash; and make it a habit.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Here&apos;s a sample net worth calculation for a 35-year-old homeowner:
        </p>
        <p className="text-gray-600 font-medium mb-1">Assets:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Cash and savings: $15,000</li>
          <li>Retirement accounts: $85,000</li>
          <li>Home value: $320,000</li>
          <li>Car value: $18,000</li>
          <li>Other investments: $12,000</li>
        </ul>
        <p className="text-gray-600 font-medium mb-1">Liabilities:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Mortgage balance: $245,000</li>
          <li>Student loans: $22,000</li>
          <li>Auto loan: $10,000</li>
          <li>Credit cards: $3,000</li>
        </ul>
        <p className="text-gray-600">
          Total assets: $450,000. Total liabilities: $280,000. Net worth: $170,000. This person is in solid financial shape. If they recalculate in six months and the number has grown, they know their savings and debt payoff strategy is working.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">Retirement Calculator</Link></li>
          <li><Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">Compound Interest Calculator</Link></li>
          <li><Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">Salary to Hourly Converter</Link></li>
          <li><Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">Mortgage Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
