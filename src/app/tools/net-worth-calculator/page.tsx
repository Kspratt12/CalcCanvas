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
